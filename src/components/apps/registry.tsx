import type { ComponentType } from "react";
import {
  AboutIcon,
  CommandPromptIcon,
  ComputerIcon,
  ContactIcon,
  DisplayIcon,
  MinesweeperIcon,
  NotepadIcon,
  PaintIcon,
  ProjectsIcon,
  RecycleBinIcon,
  ResumeIcon,
  SolitaireIcon,
} from "@/components/icons";
import { AboutMeApp } from "./AboutMe";
import { CommandPromptApp } from "./CommandPrompt";
import { ContactApp } from "./Contact";
import { DisplayPropertiesApp } from "./DisplayProperties";
import { MinesweeperApp } from "./Minesweeper";
import { MyComputerApp } from "./MyComputer";
import { NotepadApp } from "./Notepad";
import { PaintApp } from "./Paint";
import { ProjectsApp } from "./Projects";
import { RecycleBinApp } from "./RecycleBin";
import { ResumeApp } from "./Resume";
import { SolitaireApp } from "./Solitaire";

export type AppId =
  | "about"
  | "resume"
  | "projects"
  | "contact"
  | "minesweeper"
  | "solitaire"
  | "notepad"
  | "paint"
  | "my-computer"
  | "recycle-bin"
  | "command-prompt"
  | "display-properties";

export type AppDef = {
  id: AppId;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  content: ComponentType;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  resizable?: boolean;
};

export const APPS: Record<AppId, AppDef> = {
  about: {
    id: "about",
    title: "About Me",
    subtitle: "Who's behind this",
    icon: AboutIcon,
    content: AboutMeApp,
    width: 460,
    height: 400,
    minWidth: 320,
    minHeight: 280,
  },
  resume: {
    id: "resume",
    title: "My Resume",
    subtitle: "Education & skills",
    icon: ResumeIcon,
    content: ResumeApp,
    width: 520,
    height: 520,
    minWidth: 360,
    minHeight: 360,
  },
  projects: {
    id: "projects",
    title: "My Projects",
    subtitle: "View my work",
    icon: ProjectsIcon,
    content: ProjectsApp,
    width: 560,
    height: 480,
    minWidth: 340,
    minHeight: 360,
  },
  contact: {
    id: "contact",
    title: "Contact Me",
    subtitle: "Send me a message",
    icon: ContactIcon,
    content: ContactApp,
    width: 420,
    height: 380,
    minWidth: 320,
    minHeight: 300,
  },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
    subtitle: "Classic, 9x9",
    icon: MinesweeperIcon,
    content: MinesweeperApp,
    width: 260,
    height: 340,
    minWidth: 260,
    minHeight: 340,
  },
  solitaire: {
    id: "solitaire",
    title: "Solitaire",
    subtitle: "Klondike, real rules",
    icon: SolitaireIcon,
    content: SolitaireApp,
    width: 460,
    height: 480,
    minWidth: 380,
    minHeight: 380,
    resizable: true,
  },
  notepad: {
    id: "notepad",
    title: "Notepad",
    subtitle: "Plain text",
    icon: NotepadIcon,
    content: NotepadApp,
    width: 440,
    height: 380,
    minWidth: 260,
    minHeight: 200,
    resizable: true,
  },
  paint: {
    id: "paint",
    title: "Paint",
    subtitle: "Draw something",
    icon: PaintIcon,
    content: PaintApp,
    width: 480,
    height: 400,
    minWidth: 360,
    minHeight: 300,
    resizable: true,
  },
  "my-computer": {
    id: "my-computer",
    title: "My Computer",
    subtitle: "System info",
    icon: ComputerIcon,
    content: MyComputerApp,
    width: 420,
    height: 440,
    minWidth: 320,
    minHeight: 340,
  },
  "recycle-bin": {
    id: "recycle-bin",
    title: "Recycle Bin",
    subtitle: "Nothing hidden here",
    icon: RecycleBinIcon,
    content: RecycleBinApp,
    width: 360,
    height: 340,
    minWidth: 280,
    minHeight: 280,
  },
  "command-prompt": {
    id: "command-prompt",
    title: "Command Prompt",
    subtitle: "A real fake shell",
    icon: CommandPromptIcon,
    content: CommandPromptApp,
    width: 480,
    height: 340,
    minWidth: 320,
    minHeight: 220,
    resizable: true,
  },
  "display-properties": {
    id: "display-properties",
    title: "Display Properties",
    subtitle: "Appearance",
    icon: DisplayIcon,
    content: DisplayPropertiesApp,
    width: 420,
    height: 320,
    minWidth: 360,
    minHeight: 280,
  },
};

export const DESKTOP_ORDER: AppId[] = [
  "about",
  "resume",
  "projects",
  "contact",
  "my-computer",
  "minesweeper",
  "solitaire",
  "paint",
  "command-prompt",
  "recycle-bin",
];
export const START_MENU_ORDER: AppId[] = [
  "about",
  "resume",
  "projects",
  "contact",
  "my-computer",
  "minesweeper",
  "solitaire",
  "notepad",
  "paint",
  "command-prompt",
];
