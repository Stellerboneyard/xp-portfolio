"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 9;
const ROWS = 9;
const MINES = 10;

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

type GameStatus = "ready" | "playing" | "won" | "lost";

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 })),
  );
}

function neighborsOf(r: number, c: number): [number, number][] {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
    }
  }
  return out;
}

// Mines are placed only after the first click, avoiding that cell and its
// immediate neighbors, so the opening move is never an instant loss.
function plantMines(safeR: number, safeC: number): Cell[][] {
  const board = emptyBoard();
  const forbidden = new Set([`${safeR},${safeC}`, ...neighborsOf(safeR, safeC).map(([r, c]) => `${r},${c}`)]);
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (forbidden.has(`${r},${c}`) || board[r][c].mine) continue;
    board[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      board[r][c].adjacent = neighborsOf(r, c).filter(([nr, nc]) => board[nr][nc].mine).length;
    }
  }
  return board;
}

function floodReveal(board: Cell[][], r: number, c: number) {
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = board[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (const [nr, nc] of neighborsOf(cr, cc)) {
        if (!board[nr][nc].revealed && !board[nr][nc].mine) stack.push([nr, nc]);
      }
    }
  }
}

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-700",
  2: "text-green-700",
  3: "text-red-600",
  4: "text-blue-900",
  5: "text-red-900",
  6: "text-teal-700",
  7: "text-black",
  8: "text-neutral-500",
};

export function MinesweeperApp() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [seconds, setSeconds] = useState(0);
  const [flags, setFlags] = useState(0);
  const longPress = useRef<{ timer: ReturnType<typeof setTimeout> | null; fired: boolean }>({
    timer: null,
    fired: false,
  });

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSeconds((s) => Math.min(s + 1, 999)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setStatus("ready");
    setSeconds(0);
    setFlags(0);
  }, []);

  const revealAllMines = (b: Cell[][]) => {
    for (const row of b) for (const cell of row) if (cell.mine) cell.revealed = true;
  };

  const checkWin = (b: Cell[][]) => {
    for (const row of b) for (const cell of row) if (!cell.mine && !cell.revealed) return false;
    return true;
  };

  const reveal = (r: number, c: number) => {
    if (status === "won" || status === "lost") return;
    if (board[r][c].flagged) return;

    let working = board;
    let nextStatus: GameStatus = status;

    if (status === "ready") {
      working = plantMines(r, c);
      nextStatus = "playing";
    } else {
      working = board.map((row) => row.map((cell) => ({ ...cell })));
    }

    const cell = working[r][c];
    if (cell.revealed) return;

    if (cell.mine) {
      cell.revealed = true;
      revealAllMines(working);
      setBoard(working);
      setStatus("lost");
      return;
    }

    floodReveal(working, r, c);
    setBoard(working);

    if (checkWin(working)) {
      setStatus("won");
      return;
    }
    setStatus(nextStatus);
  };

  const toggleFlag = (r: number, c: number) => {
    if (status === "won" || status === "lost" || status === "ready") {
      if (status !== "ready") return;
    }
    if (board[r][c].revealed) return;
    const working = board.map((row) => row.map((cell) => ({ ...cell })));
    working[r][c].flagged = !working[r][c].flagged;
    setFlags((f) => f + (working[r][c].flagged ? 1 : -1));
    setBoard(working);
  };

  const onTouchStart = (r: number, c: number) => {
    longPress.current.fired = false;
    longPress.current.timer = setTimeout(() => {
      longPress.current.fired = true;
      toggleFlag(r, c);
    }, 420);
  };
  const onTouchEnd = (r: number, c: number) => {
    if (longPress.current.timer) clearTimeout(longPress.current.timer);
    if (!longPress.current.fired) reveal(r, c);
  };

  const face = status === "lost" ? "\u{1F635}" : status === "won" ? "\u{1F60E}" : "\u{1F642}";

  return (
    <div className="flex h-full flex-col items-center gap-2 bg-[#c0c0c0] p-2 select-none">
      <div className="xp-well flex w-full items-center justify-between px-2 py-1">
        <span className="min-w-[3ch] rounded bg-black px-1.5 font-mono text-lg text-red-500">
          {String(Math.max(MINES - flags, 0)).padStart(3, "0")}
        </span>
        <button
          onClick={reset}
          aria-label="Reset game"
          className="xp-button h-7 w-7 text-base leading-none"
        >
          {face}
        </button>
        <span className="min-w-[3ch] rounded bg-black px-1.5 font-mono text-lg text-red-500">
          {String(seconds).padStart(3, "0")}
        </span>
      </div>

      <div className="xp-well grid gap-0 p-1" style={{ gridTemplateColumns: `repeat(${COLS}, 24px)` }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => reveal(r, c)}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(r, c);
              }}
              onTouchStart={() => onTouchStart(r, c)}
              onTouchEnd={(e) => {
                e.preventDefault();
                onTouchEnd(r, c);
              }}
              className={`flex h-6 w-6 items-center justify-center text-xs font-bold ${
                cell.revealed ? "xp-cell-in" : "xp-cell-out"
              } ${cell.mine && cell.revealed ? "bg-red-500" : ""}`}
            >
              {cell.revealed
                ? cell.mine
                  ? "\u{1F4A3}"
                  : cell.adjacent > 0 && (
                      <span className={NUMBER_COLORS[cell.adjacent]}>{cell.adjacent}</span>
                    )
                : cell.flagged
                  ? "\u{1F6A9}"
                  : ""}
            </button>
          )),
        )}
      </div>

      <p className="text-[11px] text-neutral-700">
        {status === "lost"
          ? "Boom. Click the face to try again."
          : status === "won"
            ? "Cleared it. Click the face to play again."
            : "Right-click (or press-and-hold) to flag."}
      </p>
    </div>
  );
}
