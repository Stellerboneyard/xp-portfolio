"use client";

import { useState } from "react";
import { useWindowManager, type AppId } from "@/lib/windowManager";
import { CommandPromptIcon } from "@/components/icons";
import { sound } from "@/lib/sound";

const KNOWN: Record<string, AppId> = {
  about: "about",
  resume: "resume",
  projects: "projects",
  contact: "contact",
  "my-computer": "my-computer",
  computer: "my-computer",
  minesweeper: "minesweeper",
  solitaire: "solitaire",
  notepad: "notepad",
  paint: "paint",
  "command-prompt": "command-prompt",
  cmd: "command-prompt",
  calculator: "calculator",
  calc: "calculator",
  "recycle-bin": "recycle-bin",
};

export function RunDialog({ onClose }: { onClose: () => void }) {
  const { openApp } = useWindowManager();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const run = () => {
    const key = value.trim().toLowerCase();
    const app = KNOWN[key];
    if (!app) {
      sound.error();
      setError(true);
      return;
    }
    sound.open();
    openApp(app);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="xp-panel flex w-[360px] flex-col gap-3 p-4"
        style={{ background: "#ece9d8" }}
      >
        <div className="flex items-center gap-3">
          <CommandPromptIcon size={32} />
          <p className="text-[13px] text-neutral-700">
            Type the name of an app and this will open it -- try &quot;calc&quot;, &quot;notepad&quot;, or
            &quot;projects&quot;.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] text-neutral-700">Open:</label>
          <input
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && run()}
            className={`xp-inset flex-1 px-2 py-1 text-[13px] outline-none ${error ? "ring-1 ring-red-500" : ""}`}
          />
        </div>
        {error && <p className="text-[11px] text-red-600">Can&apos;t find that. Try a name from the Start Menu.</p>}
        <div className="flex justify-end gap-2">
          <button onClick={run} className="xp-button px-4 py-1 text-[12px]">
            OK
          </button>
          <button onClick={onClose} className="xp-button px-4 py-1 text-[12px]">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
