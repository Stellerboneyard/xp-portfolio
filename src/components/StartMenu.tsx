"use client";

import { useEffect, useRef } from "react";
import { useWindowManager } from "@/lib/windowManager";
import { APPS, START_MENU_ORDER } from "@/components/apps/registry";
import { AnimatedAvatar } from "@/components/AnimatedAvatar";
import { GitHubGlyph, LinkedInGlyph, MailGlyph } from "@/components/icons";
import { profile, socials } from "@/lib/content";
import { sound } from "@/lib/sound";

const SOCIAL_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitHub: GitHubGlyph,
  LinkedIn: LinkedInGlyph,
  Email: MailGlyph,
};

export function StartMenu({
  onClose,
  onLogOff,
  onShutDown,
  onRun,
}: {
  onClose: () => void;
  onLogOff: () => void;
  onShutDown: () => void;
  onRun: () => void;
}) {
  const { openApp } = useWindowManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-11 left-1 z-[9999] flex w-[400px] max-w-[92vw] flex-col overflow-hidden rounded-t-lg border border-[#0a3d91] shadow-2xl"
    >
      <div
        className="flex items-center gap-2 px-3 py-2 text-white"
        style={{ background: "linear-gradient(180deg, var(--xp-titlebar-mid), var(--xp-titlebar-start))" }}
      >
        <AnimatedAvatar size={34} />
        <span className="text-sm font-bold">{profile.name}</span>
      </div>

      <div className="flex max-h-[65vh] overflow-y-auto bg-white">
        <div className="flex w-3/5 flex-col gap-0.5 border-r border-neutral-200 p-1.5">
          {START_MENU_ORDER.map((id) => {
            const app = APPS[id];
            return (
              <button
                key={id}
                onClick={() => {
                  openApp(id);
                  onClose();
                }}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-blue-600 hover:text-white"
              >
                <app.icon size={26} />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] leading-tight">{app.title}</span>
                  <span className="block truncate text-[10px] leading-tight opacity-70">{app.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex w-2/5 flex-col gap-0.5 bg-[#d3e2f5] p-1.5">
          <p className="px-2 pt-1 pb-0.5 text-[10px] font-bold text-blue-900 uppercase">Find me online</p>
          {socials.map((s) => {
            const Icon = SOCIAL_ICON[s.label];
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-[12px] hover:bg-blue-600 hover:text-white"
              >
                {Icon && <Icon size={16} />}
                {s.label}
              </a>
            );
          })}
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-2 px-2 py-1.5"
        style={{ background: "linear-gradient(180deg, var(--xp-titlebar-start), var(--xp-titlebar-end))" }}
      >
        <button
          onClick={() => {
            sound.click();
            onRun();
            onClose();
          }}
          className="rounded px-2 py-1 text-[12px] text-white hover:bg-white/20"
        >
          Run&hellip;
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.click();
              onLogOff();
              onClose();
            }}
            className="rounded px-2 py-1 text-[12px] text-white hover:bg-white/20"
          >
            Log Off
          </button>
          <button
            onClick={() => {
              sound.click();
              onShutDown();
              onClose();
            }}
            className="rounded px-2 py-1 text-[12px] text-white hover:bg-white/20"
          >
            Shut Down
          </button>
        </div>
      </div>
    </div>
  );
}
