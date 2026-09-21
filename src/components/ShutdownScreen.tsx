"use client";

import { useEffect, useState } from "react";

export function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  const [phase, setPhase] = useState<"shutting-down" | "off">("shutting-down");

  useEffect(() => {
    const id = window.setTimeout(() => setPhase("off"), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black text-center">
      {phase === "shutting-down" ? (
        <>
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <p className="text-sm text-neutral-300">Shutting down&hellip;</p>
        </>
      ) : (
        <>
          <p className="text-sm text-neutral-400">It&apos;s now safe to close this tab.</p>
          <button
            onClick={onRestart}
            className="mt-2 rounded border border-neutral-600 px-4 py-1.5 text-xs text-neutral-300 hover:bg-white/10"
          >
            Turn on
          </button>
        </>
      )}
    </div>
  );
}
