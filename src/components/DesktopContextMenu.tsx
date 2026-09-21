"use client";

import { useEffect, useRef } from "react";
import { useWindowManager } from "@/lib/windowManager";

export function DesktopContextMenu({
  x,
  y,
  onClose,
}: {
  x: number;
  y: number;
  onClose: () => void;
}) {
  const { openApp } = useWindowManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("contextmenu", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("contextmenu", onDown);
    };
  }, [onClose]);

  const item = (label: string, action: () => void, disabled = false) => (
    <button
      onClick={() => {
        if (disabled) return;
        action();
        onClose();
      }}
      className={`px-3 py-1 text-left text-[12px] ${
        disabled ? "text-neutral-400" : "hover:bg-blue-600 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      ref={ref}
      className="absolute z-[9999] flex w-52 flex-col gap-0.5 border border-neutral-400 bg-white py-1 shadow-xl"
      style={{ left: x, top: y }}
    >
      {item("Arrange Icons Automatically", () => {}, true)}
      {item("Refresh", () => {})}
      <div className="my-1 border-t border-neutral-300" />
      {item("New Text Document", () => openApp("notepad"))}
      <div className="my-1 border-t border-neutral-300" />
      {item("Properties", () => openApp("display-properties"))}
    </div>
  );
}
