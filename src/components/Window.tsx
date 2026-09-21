"use client";

import { useEffect, useRef, useState } from "react";
import { APPS, useWindowManager, type AppId, type WindowState } from "@/lib/windowManager";

// Below this width a floating/draggable window doesn't make sense -- there's
// no room to drag it anywhere, so it just goes full-bleed instead, same
// pattern as the sidebar-overlay approach used on the other portfolio sites.
const MOBILE_BREAKPOINT = 640;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function Window({ win }: { win: WindowState }) {
  const def = APPS[win.appId];
  const { closeApp, focusApp, minimizeApp, toggleMaximizeApp, moveApp, resizeApp, activeAppId } = useWindowManager();
  const isMobile = useIsMobile();
  const isActive = activeAppId === win.appId;
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const resizeRef = useRef<{ startX: number; startY: number; originW: number; originH: number } | null>(null);
  const [resizing, setResizing] = useState(false);

  if (win.minimized) return null;

  const fullScreen = isMobile || win.maximized;

  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (fullScreen) {
      focusApp(win.appId);
      return;
    }
    focusApp(win.appId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, originX: win.x, originY: win.y };
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onTitlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const nextX = Math.max(0, dragRef.current.originX + dx);
    const nextY = Math.max(0, dragRef.current.originY + dy);
    moveApp(win.appId, nextX, nextY);
  };

  const endDrag = () => {
    setDragging(false);
    dragRef.current = null;
  };

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    focusApp(win.appId);
    resizeRef.current = { startX: e.clientX, startY: e.clientY, originW: win.width, originH: win.height };
    setResizing(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onResizePointerMove = (e: React.PointerEvent) => {
    if (!resizing || !resizeRef.current) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    const nextW = Math.max(def.minWidth, resizeRef.current.originW + dx);
    const nextH = Math.max(def.minHeight, resizeRef.current.originH + dy);
    resizeApp(win.appId, nextW, nextH);
  };

  const endResize = () => {
    setResizing(false);
    resizeRef.current = null;
  };

  const Content = def.content;

  return (
    <div
      onPointerDown={() => focusApp(win.appId)}
      className={`absolute flex flex-col overflow-hidden rounded-t-md shadow-[3px_3px_10px_rgba(0,0,0,0.45)] ${
        fullScreen ? "inset-0 rounded-none" : ""
      }`}
      style={
        fullScreen
          ? { zIndex: win.z }
          : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z }
      }
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => !isMobile && toggleMaximizeApp(win.appId)}
        className="flex shrink-0 items-center justify-between gap-2 px-1.5 py-1 text-white"
        style={{
          background: isActive
            ? "linear-gradient(180deg, var(--xp-titlebar-mid), var(--xp-titlebar-start) 50%, var(--xp-titlebar-end))"
            : "linear-gradient(180deg, #8fa4bc, #5f7691 50%, #465a72)",
          touchAction: "none",
          cursor: fullScreen ? "default" : "grab",
        }}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <def.icon size={16} />
          <span className="truncate text-[13px] font-bold">{def.title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {!isMobile && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => minimizeApp(win.appId)}
              aria-label="Minimize"
              className="xp-button flex h-5 w-5 items-center justify-center text-[10px] font-bold text-black"
            >
              &#95;
            </button>
          )}
          {!isMobile && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => toggleMaximizeApp(win.appId)}
              aria-label="Maximize"
              className="xp-button flex h-5 w-5 items-center justify-center text-[10px] font-bold text-black"
            >
              &#9633;
            </button>
          )}
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeApp(win.appId)}
            aria-label="Close"
            className="xp-button flex h-5 w-5 items-center justify-center bg-red-500 text-[11px] font-bold text-white"
          >
            &#10005;
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 bg-[#ece9d8]">
        <Content />
      </div>
      {def.resizable && !fullScreen && (
        <div
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
          className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize"
          style={{ touchAction: "none" }}
        >
          <svg viewBox="0 0 16 16" className="h-full w-full opacity-60">
            <path d="M14 14 L14 9 M14 14 L9 14 M14 6 L6 14" stroke="#5f7691" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
}

export type { AppId };
