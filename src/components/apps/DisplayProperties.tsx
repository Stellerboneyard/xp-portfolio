"use client";

import { useState } from "react";
import { THEMES, applyTheme, type ThemeId } from "@/lib/theme";
import { sound } from "@/lib/sound";

export function DisplayPropertiesApp() {
  const [active, setActive] = useState<ThemeId>("blue");

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4 text-[13px] text-neutral-800">
      <p className="font-bold text-blue-900">Appearance</p>
      <p className="text-neutral-600">Pick a color scheme -- these are the three Windows XP actually shipped with.</p>
      <div className="grid grid-cols-3 gap-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sound.click();
              applyTheme(t.id);
              setActive(t.id);
            }}
            className={`xp-panel flex flex-col items-center gap-2 p-3 ${active === t.id ? "ring-2 ring-blue-600" : ""}`}
          >
            <div className="h-10 w-16 rounded border border-neutral-400" style={{ background: t.swatch }} />
            <span className="text-[12px]">{t.name}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-neutral-400">
        Changes apply to every open and future window, right away -- try opening another window while you switch.
      </p>
    </div>
  );
}
