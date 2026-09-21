import { profile, projects, skills, socials } from "@/lib/content";
import type { AppId } from "@/components/apps/registry";

export type CommandResult = {
  output: string[];
  openApp?: AppId;
  clear?: boolean;
};

const HELP_LINES = [
  "Available commands:",
  "  help                 show this list",
  "  about                who this is",
  "  whoami               short identity line",
  "  skills               what I'm working with",
  "  projects             list real, deployed work",
  "  resume               open My Resume",
  "  contact              how to reach me",
  "  links                social links",
  "  open <app>           open a window (about, resume, projects, contact,",
  "                        my-computer, minesweeper, solitaire, notepad, paint)",
  "  cls / clear           clear the screen",
  "  ver                   version info",
  "  date                  current date and time",
];

export function runCommand(raw: string): CommandResult {
  const trimmed = raw.trim();
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ").toLowerCase();
  const lower = (cmd ?? "").toLowerCase();

  switch (lower) {
    case "":
      return { output: [] };
    case "help":
    case "?":
      return { output: HELP_LINES };
    case "about":
      return {
        output: [
          `${profile.name} -- ${profile.role}, ${profile.location}.`,
          "Second-year, building real things instead of watching tutorials.",
          "Type 'open about' for the full window.",
        ],
      };
    case "whoami":
      return { output: [`aryan-raj\\${profile.name.toLowerCase().replace(" ", "")}`] };
    case "skills":
      return { output: skills.map((s) => `  ${s.name.padEnd(24)} ${s.level}`) };
    case "projects":
      return {
        output: projects.map((p) => `  [${p.tag.toUpperCase()}] ${p.title.padEnd(16)} ${p.href}`),
      };
    case "resume":
      return { output: ["Opening My Resume..."], openApp: "resume" };
    case "contact":
      return {
        output: [`Email: ${profile.email}`, `GitHub: ${profile.github}`, "Type 'open contact' for the full window."],
      };
    case "links":
      return { output: socials.map((s) => `  ${s.label.padEnd(10)} ${s.href}`) };
    case "cls":
    case "clear":
      return { output: [], clear: true };
    case "ver":
      return { output: ["xp-portfolio [Version 2029.1]"] };
    case "date":
      return { output: [new Date().toString()] };
    case "open": {
      const validIds: AppId[] = [
        "about",
        "resume",
        "projects",
        "contact",
        "my-computer",
        "minesweeper",
        "solitaire",
        "notepad",
        "paint",
        "recycle-bin",
      ];
      const match = validIds.find((id) => id === arg);
      if (!match) {
        return { output: [`Don't know how to open '${arg || ""}'. Try: ${validIds.join(", ")}`] };
      }
      return { output: [`Opening ${match}...`], openApp: match };
    }
    case "sudo":
      return { output: ["This isn't that kind of terminal. Nice try though."] };
    default:
      return { output: [`'${cmd}' is not recognized. Type 'help' for a list of commands.`] };
  }
}
