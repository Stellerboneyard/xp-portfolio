"use client";

import { useEffect, useRef } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { APPS, START_MENU_ORDER } from "@/components/apps/registry";
import { UserIcon } from "@/components/icons";
import { profile } from "@/lib/content";

export function StartMenu({
  onClose,
  onLogOff,
  onShutDown,
}: {
  onClose: () => void;
  onLogOff: () => void;
  onShutDown: () => void;
}) {
  const { openApp } = useWindowManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-11 left-1 z-[9999] flex w-[280px] flex-col overflow-hidden rounded-t-lg border border-[#0a3d91] shadow-2xl"
    >
      <div
        className="flex items-center gap-2 px-3 py-2 text-white"
        style={{ background: "linear-gradient(180deg, var(--xp-titlebar-mid), var(--xp-titlebar-start))" }}
      >
        <UserIcon size={34} />
        <span className="text-sm font-bold">{profile.name}</span>
      </div>

      <div className="flex bg-white">
        <div className="flex w-full flex-col gap-0.5 p-1.5">
          {START_MENU_ORDER.map((id) => {
            const app = APPS[id];
            return (
              <button
                key={id}
                onClick={() => {
                  openApp(id);
                  onClose();
                }}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] hover:bg-blue-600 hover:text-white"
              >
                <app.icon size={22} />
                {app.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-2 px-2 py-1.5"
        style={{ background: "linear-gradient(180deg, #1e5fd6, #1349a8)" }}
      >
        <button
          onClick={() => {
            onLogOff();
            onClose();
          }}
          className="rounded px-2 py-1 text-[12px] text-white hover:bg-white/20"
        >
          Log Off
        </button>
        <button
          onClick={() => {
            onShutDown();
            onClose();
          }}
          className="rounded px-2 py-1 text-[12px] text-white hover:bg-white/20"
        >
          Shut Down
        </button>
      </div>
    </div>
  );
}
