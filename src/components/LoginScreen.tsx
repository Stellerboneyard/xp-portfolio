"use client";

import { useState } from "react";
import { UserIcon } from "@/components/icons";
import { profile } from "@/lib/content";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [loggingIn, setLoggingIn] = useState(false);

  const handleClick = () => {
    if (loggingIn) return;
    setLoggingIn(true);
    window.setTimeout(onLogin, 900);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "linear-gradient(180deg, #5a8fd6 0%, #2f5ca0 55%, #1a3d73 100%)" }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        <div className="text-center">
          <p className="text-3xl font-light text-white">aryan-raj</p>
          <p className="text-sm text-blue-100">welcome</p>
        </div>

        <button
          onClick={handleClick}
          className="flex flex-col items-center gap-3 rounded-lg p-3 transition hover:bg-white/10"
        >
          <div className="rounded-md border-2 border-white/70 p-1 shadow-xl">
            <UserIcon size={64} />
          </div>
          <span className="text-lg text-white">{profile.name}</span>
        </button>

        <div className="h-6">
          {loggingIn && (
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging in&hellip;
            </div>
          )}
          {!loggingIn && <p className="text-xs text-blue-100/80">Click your picture to log in</p>}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/20 px-6 py-3 text-xs text-blue-100">
        <span>{profile.role}, {profile.location}</span>
        <span>xp-portfolio</span>
      </div>
    </div>
  );
}
