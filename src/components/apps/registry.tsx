import type { ComponentType } from "react";
import { AboutIcon, ContactIcon, MinesweeperIcon, ProjectsIcon, RecycleBinIcon, ResumeIcon } from "@/components/icons";
import { AboutMeApp } from "./AboutMe";
import { ContactApp } from "./Contact";
import { MinesweeperApp } from "./Minesweeper";
import { ProjectsApp } from "./Projects";
import { RecycleBinApp } from "./RecycleBin";
import { ResumeApp } from "./Resume";

export type AppId = "about" | "resume" | "projects" | "contact" | "minesweeper" | "recycle-bin";

export type AppDef = {
  id: AppId;
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  content: ComponentType;
  width: number;
  height: number;
};

export const APPS: Record<AppId, AppDef> = {
  about: { id: "about", title: "About Me", icon: AboutIcon, content: AboutMeApp, width: 460, height: 400 },
  resume: { id: "resume", title: "My Resume", icon: ResumeIcon, content: ResumeApp, width: 520, height: 520 },
  projects: { id: "projects", title: "My Projects", icon: ProjectsIcon, content: ProjectsApp, width: 560, height: 420 },
  contact: { id: "contact", title: "Contact Me", icon: ContactIcon, content: ContactApp, width: 420, height: 380 },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
    icon: MinesweeperIcon,
    content: MinesweeperApp,
    width: 260,
    height: 340,
  },
  "recycle-bin": {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: RecycleBinIcon,
    content: RecycleBinApp,
    width: 360,
    height: 280,
  },
};

export const DESKTOP_ORDER: AppId[] = ["about", "resume", "projects", "contact", "minesweeper", "recycle-bin"];
export const START_MENU_ORDER: AppId[] = ["about", "resume", "projects", "contact", "minesweeper"];
