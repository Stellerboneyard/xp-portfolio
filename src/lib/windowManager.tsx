"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { APPS, type AppId } from "@/components/apps/registry";

type WindowState = {
  appId: AppId;
  minimized: boolean;
  maximized: boolean;
  // top-left corner, in px, relative to the desktop -- ignored while maximized
  x: number;
  y: number;
  z: number;
};

type WindowManagerApi = {
  windows: WindowState[];
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  moveApp: (id: AppId, x: number, y: number) => void;
  isOpen: (id: AppId) => boolean;
  activeAppId: AppId | null;
};

const WindowManagerContext = createContext<WindowManagerApi | null>(null);

let zCounter = 1;
// Windows cascade open so a second/third app isn't hidden exactly behind the
// first -- purely cosmetic, resets per session.
let cascadeOffset = 0;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const isOpen = useCallback((id: AppId) => windows.some((w) => w.appId === id), [windows]);

  const focusApp = useCallback((id: AppId) => {
    zCounter += 1;
    const z = zCounter;
    setWindows((ws) => ws.map((w) => (w.appId === id ? { ...w, z, minimized: false } : w)));
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      if (isOpen(id)) {
        focusApp(id);
        return;
      }
      zCounter += 1;
      cascadeOffset = (cascadeOffset + 1) % 6;
      setWindows((ws) => [
        ...ws,
        {
          appId: id,
          minimized: false,
          maximized: false,
          x: 80 + cascadeOffset * 28,
          y: 60 + cascadeOffset * 24,
          z: zCounter,
        },
      ]);
    },
    [isOpen, focusApp],
  );

  const closeApp = useCallback((id: AppId) => {
    setWindows((ws) => ws.filter((w) => w.appId !== id));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((ws) => ws.map((w) => (w.appId === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximizeApp = useCallback((id: AppId) => {
    setWindows((ws) => ws.map((w) => (w.appId === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const moveApp = useCallback((id: AppId, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.appId === id ? { ...w, x, y } : w)));
  }, []);

  const activeAppId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (visible.length === 0) return null;
    return visible.reduce((top, w) => (w.z > top.z ? w : top), visible[0]).appId;
  }, [windows]);

  const value = useMemo<WindowManagerApi>(
    () => ({
      windows,
      openApp,
      closeApp,
      focusApp,
      minimizeApp,
      toggleMaximizeApp,
      moveApp,
      isOpen,
      activeAppId,
    }),
    [windows, openApp, closeApp, focusApp, minimizeApp, toggleMaximizeApp, moveApp, isOpen, activeAppId],
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager(): WindowManagerApi {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}

export type { WindowState };
export { APPS };
export type { AppId };
