"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useWindowManager, type AppId } from "@/lib/windowManager";

// Shared "Windows Explorer" chrome -- menu bar, toolbar/address bar, status
// bar -- wrapped around the file-browser-flavored apps (My Computer, My
// Projects, Recycle Bin) so they read as real Explorer windows instead of
// a plain content pane with a title bar.
export function ExplorerChrome({
  appId,
  addressIcon,
  addressLabel,
  statusText,
  children,
}: {
  appId: AppId;
  addressIcon: ReactNode;
  addressLabel: string;
  statusText: string;
  children: ReactNode;
}) {
  const { closeApp } = useWindowManager();
  const [fileOpen, setFileOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative flex shrink-0 items-center gap-3 border-b border-neutral-300 bg-[#ece9d8] px-2 py-1 text-[12px] text-neutral-700">
        <button
          onClick={() => setFileOpen((v) => !v)}
          className={`rounded px-1 ${fileOpen ? "bg-blue-600 text-white" : ""}`}
        >
          File
        </button>
        <span className="opacity-60">Edit</span>
        <span className="opacity-60">View</span>
        <span className="opacity-60">Favorites</span>
        <span className="opacity-60">Tools</span>
        <span className="opacity-60">Help</span>
        {fileOpen && (
          <div
            onMouseLeave={() => setFileOpen(false)}
            className="absolute top-full left-0 z-10 w-36 border border-neutral-400 bg-white py-1 shadow-lg"
          >
            <button
              onClick={() => {
                closeApp(appId);
                setFileOpen(false);
              }}
              className="w-full px-3 py-1 text-left text-[12px] hover:bg-blue-600 hover:text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1 border-b border-neutral-300 bg-[#f5f3e9] px-2 py-1">
        <span className="xp-button flex h-6 w-6 items-center justify-center text-neutral-400">&#9664;</span>
        <span className="xp-button flex h-6 w-6 items-center justify-center text-neutral-400">&#9654;</span>
        <span className="xp-button flex h-6 w-6 items-center justify-center text-neutral-400">&#8679;</span>
        <div className="xp-inset ml-2 flex flex-1 items-center gap-1.5 px-2 py-0.5 text-[12px] text-neutral-700">
          {addressIcon}
          {addressLabel}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#ece9d8]">{children}</div>

      <div className="xp-well shrink-0 px-2 py-0.5 text-[11px] text-neutral-600">{statusText}</div>
    </div>
  );
}
