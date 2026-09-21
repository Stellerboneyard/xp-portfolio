"use client";

import { useEffect, useState } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { APPS, DESKTOP_ORDER } from "@/components/apps/registry";
import { Window } from "@/components/Window";
import { Taskbar } from "@/components/Taskbar";
import { DesktopContextMenu } from "@/components/DesktopContextMenu";
import { Wallpaper } from "@/components/Wallpaper";
import { applyTheme, loadSavedTheme } from "@/lib/theme";

export function Desktop({ onLogOff, onShutDown }: { onLogOff: () => void; onShutDown: () => void }) {
  const { windows, openApp } = useWindowManager();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    applyTheme(loadSavedTheme());
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onContextMenu={(e) => {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <Wallpaper />
      <div className="relative grid grid-flow-col grid-rows-[repeat(5,84px)] gap-1 p-3 sm:grid-rows-[repeat(6,88px)]">
        {DESKTOP_ORDER.map((id) => {
          const app = APPS[id];
          return (
            <button
              key={id}
              onClick={() => openApp(id)}
              className="flex w-20 flex-col items-center gap-1 rounded p-1.5 text-center hover:bg-white/15 focus:bg-blue-500/30 active:bg-blue-500/40"
            >
              <app.icon size={38} />
              <span
                className="text-[11px] leading-tight text-white"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.85)" }}
              >
                {app.title}
              </span>
            </button>
          );
        })}
      </div>

      {windows.map((w) => (
        <Window key={w.appId} win={w} />
      ))}

      {menu && <DesktopContextMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />}

      <Taskbar onLogOff={onLogOff} onShutDown={onShutDown} />
    </div>
  );
}
