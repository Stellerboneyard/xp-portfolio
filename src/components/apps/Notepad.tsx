"use client";

import { useState } from "react";

const DEFAULT_TEXT = `This desktop is a real portfolio, not just a theme.

Every window here does something -- Minesweeper actually plays,
Paint actually draws, Solitaire actually deals and checks the rules,
and this Notepad actually holds whatever you type (until you reload,
same as the real thing without a filesystem behind it).

- Aryan`;

export function NotepadApp() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [wrap, setWrap] = useState(true);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex shrink-0 gap-3 border-b border-neutral-300 bg-[#ece9d8] px-2 py-1 text-[12px] text-neutral-700">
        <span>File</span>
        <span>Edit</span>
        <button onClick={() => setWrap((w) => !w)} className="hover:underline">
          Format {wrap ? "(wrap: on)" : "(wrap: off)"}
        </button>
        <span>View</span>
        <span>Help</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        wrap={wrap ? "soft" : "off"}
        className={`h-full min-h-0 flex-1 resize-none p-2 font-mono text-[13px] text-neutral-900 outline-none ${
          wrap ? "" : "whitespace-pre overflow-x-auto"
        }`}
      />
    </div>
  );
}
