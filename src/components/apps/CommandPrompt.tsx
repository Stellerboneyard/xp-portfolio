"use client";

import { useEffect, useRef, useState } from "react";
import { runCommand } from "@/lib/commands";
import { useWindowManager } from "@/lib/windowManager";

const PROMPT = "C:\\Documents and Settings\\aryan-raj>";

type Line = { text: string; isCommand: boolean };

const BANNER: Line[] = [
  { text: "Microsoft(R) Windows XP-ish [Version 5.29.2600] -- not actually Microsoft", isCommand: false },
  { text: "(C) 2029  aryan-raj. Type 'help' for a list of commands.", isCommand: false },
  { text: "", isCommand: false },
];

export function CommandPromptApp() {
  const { openApp } = useWindowManager();
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const raw = input;
    const result = runCommand(raw);
    setInput("");
    if (raw.trim()) {
      setHistory((h) => [...h, raw]);
    }
    setHistoryIndex(null);

    if (result.clear) {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { text: `${PROMPT} ${raw}`, isCommand: true },
      ...result.output.map((text) => ({ text, isCommand: false })),
    ]);
    if (result.openApp) openApp(result.openApp);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full overflow-y-auto bg-black p-2 font-mono text-[13px] text-neutral-200"
      ref={scrollRef}
    >
      {lines.map((line, i) => (
        <pre key={i} className={`whitespace-pre-wrap ${line.isCommand ? "text-white" : "text-neutral-300"}`}>
          {line.text}
        </pre>
      ))}
      <div className="flex">
        <span className="shrink-0">{PROMPT}&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-white outline-none"
        />
      </div>
    </div>
  );
}
