"use client";

import { useEffect, useState } from "react";

const LINES = [
  "xp-portfolio BIOS v2.6, 2029",
  "CPU: React 19 @ static-export",
  "Memory Test: 65536KB OK",
  "Detecting IDE drives ... ide-portfolio.exe  OK",
  "Detecting IDE drives ... portfolio.exe  OK",
  "Loading personality profile ... aryan-raj",
  "Press nothing to continue.",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const id = window.setTimeout(onDone, 500);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setShown((n) => n + 1), 220);
    return () => window.clearTimeout(id);
  }, [shown, onDone]);

  return (
    <div className="absolute inset-0 flex flex-col justify-start bg-black p-4 font-mono text-[13px] text-neutral-300">
      {LINES.slice(0, shown).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      {shown < LINES.length && <span className="xp-cursor-blink">_</span>}
    </div>
  );
}
