"use client";

import { useEffect, useRef, useState } from "react";

const PALETTE = [
  "#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200",
  "#22b14c", "#00a2e8", "#3f48cc", "#a349a4", "#ffffff", "#c3c3c3",
  "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0",
];

type Tool = "pencil" | "eraser";

export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(3);
  const [tool, setTool] = useState<Tool>("pencil");

  // Size the canvas's internal pixel buffer to match its displayed box once
  // on mount -- a canvas whose width/height attrs don't match its CSS size
  // draws blurry and maps pointer coordinates wrong.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    last.current = pointFromEvent(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const point = pointFromEvent(e);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 4 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    last.current = point;
  };

  const endDraw = () => {
    drawing.current = false;
    last.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex h-full flex-col bg-[#ece9d8]">
      <div className="flex shrink-0 items-center gap-3 border-b border-neutral-400 px-2 py-1.5">
        <div className="flex gap-1">
          <button
            onClick={() => setTool("pencil")}
            className={`xp-button px-2 py-1 text-[11px] ${tool === "pencil" ? "brightness-90" : ""}`}
          >
            Pencil
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`xp-button px-2 py-1 text-[11px] ${tool === "eraser" ? "brightness-90" : ""}`}
          >
            Eraser
          </button>
        </div>

        <div className="flex items-center gap-1">
          {[2, 4, 8].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              aria-label={`Brush size ${s}`}
              className={`xp-button flex h-6 w-6 items-center justify-center ${size === s ? "brightness-90" : ""}`}
            >
              <span className="rounded-full bg-black" style={{ width: s, height: s }} />
            </button>
          ))}
        </div>

        <button onClick={clearCanvas} className="xp-button px-2 py-1 text-[11px]">
          Clear
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="grid shrink-0 grid-cols-4 gap-0.5 p-1.5" style={{ width: 92 }}>
          {PALETTE.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              aria-label={c}
              className={`h-5 w-5 border ${color === c ? "border-2 border-black" : "border-neutral-500"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div ref={wrapRef} className="min-h-0 flex-1 p-1">
          <canvas
            ref={canvasRef}
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            className="h-full w-full touch-none border border-neutral-500 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
