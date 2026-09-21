// The three color schemes real Windows XP actually shipped with (Luna:
// Blue, Olive Green, Silver) -- not invented palettes, just reproduced as
// CSS custom properties rather than any copied asset.
export type ThemeId = "blue" | "olive" | "silver";

type ThemeDef = {
  id: ThemeId;
  name: string;
  swatch: string;
  vars: Record<string, string>;
};

export const THEMES: ThemeDef[] = [
  {
    id: "blue",
    name: "Windows Blue",
    swatch: "#3f8cf3",
    vars: {
      "--xp-titlebar-start": "#1e5fd6",
      "--xp-titlebar-mid": "#3f8cf3",
      "--xp-titlebar-end": "#1349a8",
      "--xp-taskbar-start": "#2f8f3a",
      "--xp-taskbar-end": "#1a5b22",
    },
  },
  {
    id: "olive",
    name: "Olive Green",
    swatch: "#8a9a4e",
    vars: {
      "--xp-titlebar-start": "#7a8a3e",
      "--xp-titlebar-mid": "#9aab5e",
      "--xp-titlebar-end": "#5c6a2c",
      "--xp-taskbar-start": "#6b6b3a",
      "--xp-taskbar-end": "#42421f",
    },
  },
  {
    id: "silver",
    name: "Silver",
    swatch: "#9aa5b1",
    vars: {
      "--xp-titlebar-start": "#7c8794",
      "--xp-titlebar-mid": "#aab4c0",
      "--xp-titlebar-end": "#5a6572",
      "--xp-taskbar-start": "#6e7885",
      "--xp-taskbar-end": "#3f4a56",
    },
  },
];

const STORAGE_KEY = "xp-portfolio-theme";

export function applyTheme(id: ThemeId) {
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0];
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // localStorage can throw in private/blocked contexts -- theme just
    // won't persist across reloads, which is a fine fallback.
  }
}

export function loadSavedTheme(): ThemeId {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "blue" || saved === "olive" || saved === "silver") return saved;
  } catch {
    // ignore
  }
  return "blue";
}
