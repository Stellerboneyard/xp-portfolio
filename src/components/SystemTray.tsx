"use client";

import { useEffect, useRef, useState } from "react";
import { sound } from "@/lib/sound";

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M1 6h3l4-3v10l-4-3H1z" fill="#333" />
      {!muted && (
        <path d="M10.5 5c1.3 1 1.3 5 0 6" stroke="#333" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      )}
      {muted && (
        <path d="M10.5 6l3 3M13.5 6l-3 3" stroke="#c0392b" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="1" y="9" width="3" height="5" fill="#333" />
      <rect x="5" y="6" width="3" height="8" fill="#333" />
      <rect x="9" y="3" width="3" height="11" fill="#333" />
      <rect x="13" y="9" width="2" height="5" fill="#8fbf3f" />
    </svg>
  );
}

export function SystemTray() {
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setVolumeOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="xp-well relative flex shrink-0 items-center gap-2 px-2 py-1">
      <button
        onClick={() => {
          sound.click();
          setVolumeOpen((v) => !v);
        }}
        aria-label="Volume"
      >
        <VolumeIcon muted={muted} />
      </button>
      <span title="Local Area Connection: Connected">
        <NetworkIcon />
      </span>

      {volumeOpen && (
        <div className="absolute bottom-9 left-0 flex w-24 flex-col items-center gap-2 border border-neutral-400 bg-[#ece9d8] p-2 shadow-xl">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-24 w-4 [writing-mode:vertical-lr]"
            style={{ direction: "rtl" }}
          />
          <label className="flex items-center gap-1 text-[10px] text-neutral-700">
            <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} />
            Mute
          </label>
        </div>
      )}
    </div>
  );
}
