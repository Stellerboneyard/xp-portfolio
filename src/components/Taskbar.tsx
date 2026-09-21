"use client";

import { useEffect, useState } from "react";
import { APPS, useWindowManager } from "@/lib/windowManager";
import { StartOrb } from "@/components/icons";
import { StartMenu } from "@/components/StartMenu";

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

export function Taskbar({ onLogOff, onShutDown }: { onLogOff: () => void; onShutDown: () => void }) {
  const { windows, focusApp, minimizeApp, activeAppId } = useWindowManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const now = useClock();

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
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-bold text-white italic shadow-inner"
          style={{
            background: menuOpen
              ? "linear-gradient(180deg, #1a6b24, #2f8f3a)"
              : "linear-gradient(180deg, #6fd67f, #2f8f3a)",
          }}
        >
          <StartOrb size={22} />
          start
        </button>

        <div className="h-7 w-px bg-white/30" />

        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {windows.map((w) => {
            const app = APPS[w.appId];
            const isActive = activeAppId === w.appId && !w.minimized;
            return (
              <button
                key={w.appId}
                onClick={() => (isActive ? minimizeApp(w.appId) : focusApp(w.appId))}
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

        <div className="xp-well ml-auto shrink-0 rounded px-2 py-1 text-[12px] text-black">
          {now
            ? now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
            : "  :  "}
        </div>
      </div>
    </>
  );
}
