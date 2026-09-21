"use client";

import { useEffect, useState } from "react";
import { APPS, useWindowManager } from "@/lib/windowManager";
import type { AppId } from "@/lib/windowManager";
import { StartOrb } from "@/components/icons";
import { StartMenu } from "@/components/StartMenu";
import { SystemTray } from "@/components/SystemTray";
import { sound } from "@/lib/sound";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // Starts null and fills in only on the client: this is a static export,
    // so the build-time clock would otherwise get baked into the prerendered
    // HTML and mismatch the client's real clock on hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Built by hand rather than via toLocaleTimeString: AM/PM casing from that
// API is locale-dependent (some locales lowercase it), and the classic
// taskbar clock is always "H:MM AM/PM".
function formatClock(now: Date): string {
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
}

function ShowDesktopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <rect x="1" y="1" width="16" height="12" rx="1" fill="#dce6f2" stroke="#5c7291" strokeWidth="1" />
      <rect x="2.5" y="2.5" width="6" height="4.5" fill="#7fbf5b" />
      <rect x="9.5" y="2.5" width="6" height="4.5" fill="#4f8cff" />
      <rect x="2.5" y="8" width="13" height="3.5" fill="#f0d089" />
    </svg>
  );
}

export function Taskbar({ onLogOff, onShutDown }: { onLogOff: () => void; onShutDown: () => void }) {
  const { windows, focusApp, minimizeApp, restoreApp, activeAppId } = useWindowManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hiddenByShowDesktop, setHiddenByShowDesktop] = useState<AppId[]>([]);
  const now = useClock();

  const toggleShowDesktop = () => {
    sound.click();
    if (hiddenByShowDesktop.length > 0) {
      hiddenByShowDesktop.forEach((id) => restoreApp(id));
      setHiddenByShowDesktop([]);
      return;
    }
    const visible = windows.filter((w) => !w.minimized).map((w) => w.appId);
    if (visible.length === 0) return;
    visible.forEach((id) => minimizeApp(id));
    setHiddenByShowDesktop(visible);
  };

  return (
    <>
      {menuOpen && (
        <StartMenu onClose={() => setMenuOpen(false)} onLogOff={onLogOff} onShutDown={onShutDown} />
      )}
      <div
        className="absolute inset-x-0 bottom-0 z-[9998] flex h-11 items-center gap-1.5 border-t border-[#0a3d91] px-1"
        style={{ background: "linear-gradient(180deg, var(--xp-taskbar-start), var(--xp-taskbar-end))" }}
      >
        <button
          onClick={() => {
            sound.click();
            setMenuOpen((v) => !v);
          }}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-bold text-white italic shadow-inner"
          style={{
            background: "linear-gradient(180deg, var(--xp-taskbar-start), var(--xp-taskbar-end))",
            filter: menuOpen ? "brightness(0.8)" : undefined,
          }}
        >
          <StartOrb size={22} />
          start
        </button>

        <div className="xp-well flex shrink-0 items-center px-1 py-1">
          <button onClick={toggleShowDesktop} aria-label="Show Desktop" className="rounded p-0.5 hover:bg-white/40">
            <ShowDesktopIcon />
          </button>
        </div>

        <div className="h-7 w-px bg-white/30" />

        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {windows.map((w) => {
            const app = APPS[w.appId];
            const isActive = activeAppId === w.appId && !w.minimized;
            return (
              <button
                key={w.appId}
                onClick={() => {
                  if (isActive) {
                    minimizeApp(w.appId);
                  } else {
                    sound.click();
                    focusApp(w.appId);
                  }
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded px-2 py-1 text-[12px] text-white ${
                  isActive ? "bg-[#1349a8] shadow-inner" : "bg-[#3f7dc9]/70 hover:bg-[#3f7dc9]"
                }`}
              >
                <app.icon size={16} />
                <span className="max-w-[100px] truncate">{app.title}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <SystemTray />
          <div className="xp-well rounded px-2 py-1 text-[12px] text-black">
            {now ? formatClock(now) : "  :  "}
          </div>
        </div>
      </div>
    </>
  );
}
