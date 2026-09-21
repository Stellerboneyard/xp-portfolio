import type { ComponentType } from "react";
import {
  AboutIcon,
  ComputerIcon,
  ContactIcon,
  MinesweeperIcon,
  NotepadIcon,
  PaintIcon,
  ProjectsIcon,
  RecycleBinIcon,
  ResumeIcon,
  SolitaireIcon,
} from "@/components/icons";
import { AboutMeApp } from "./AboutMe";
import { ContactApp } from "./Contact";
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
  | "recycle-bin";

export type AppDef = {
  id: AppId;
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  content: ComponentType;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  resizable?: boolean;
};

export const APPS: Record<AppId, AppDef> = {
  about: { id: "about", title: "About Me", icon: AboutIcon, content: AboutMeApp, width: 460, height: 400, minWidth: 320, minHeight: 280 },
  resume: { id: "resume", title: "My Resume", icon: ResumeIcon, content: ResumeApp, width: 520, height: 520, minWidth: 360, minHeight: 360 },
  projects: { id: "projects", title: "My Projects", icon: ProjectsIcon, content: ProjectsApp, width: 560, height: 420, minWidth: 340, minHeight: 300 },
  contact: { id: "contact", title: "Contact Me", icon: ContactIcon, content: ContactApp, width: 420, height: 380, minWidth: 320, minHeight: 300 },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
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
    icon: ComputerIcon,
    content: MyComputerApp,
    width: 420,
    height: 380,
    minWidth: 320,
    minHeight: 300,
  },
  "recycle-bin": {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: RecycleBinIcon,
    content: RecycleBinApp,
    width: 360,
    height: 280,
    minWidth: 280,
    minHeight: 220,
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
];
