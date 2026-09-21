"use client";

import { useState } from "react";

type Suit = "S" | "H" | "D" | "C";
type Card = { id: string; suit: Suit; rank: number; faceUp: boolean };
type Selection = { from: "waste" } | { from: "tableau"; col: number; index: number };

const SUITS: Suit[] = ["S", "H", "D", "C"];
const RED = new Set<Suit>(["H", "D"]);
const SUIT_SYMBOL: Record<Suit, string> = { S: "♠", H: "♥", D: "♦", C: "♣" };
const rankLabel = (r: number) => (r === 1 ? "A" : r === 11 ? "J" : r === 12 ? "Q" : r === 13 ? "K" : String(r));

type GameState = {
  stock: Card[];
  waste: Card[];
  foundations: Record<Suit, Card[]>;
  tableau: Card[][];
};

function freshDeck(): Card[] {
  const cards: Card[] = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) cards.push({ id: `${suit}${rank}`, suit, rank, faceUp: false });
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function deal(): GameState {
  const deck = freshDeck();
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let idx = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck[idx++];
      card.faceUp = row === col;
      tableau[col].push(card);
    }
  }
  return {
    stock: deck.slice(idx).map((c) => ({ ...c, faceUp: false })),
    waste: [],
    foundations: { S: [], H: [], D: [], C: [] },
    tableau,
  };
}

function canPlaceOnTableau(card: Card, top: Card | undefined): boolean {
  if (!top) return card.rank === 13;
  return RED.has(card.suit) !== RED.has(top.suit) && card.rank === top.rank - 1;
}

function canPlaceOnFoundation(card: Card, pile: Card[]): boolean {
  const top = pile[pile.length - 1];
  if (!top) return card.rank === 1;
  return top.suit === card.suit && card.rank === top.rank + 1;
}

function Face({ card, dim = false }: { card: Card; dim?: boolean }) {
  const red = RED.has(card.suit);
  if (!card.faceUp) {
    return (
      <div className="flex h-14 w-10 items-center justify-center rounded border border-blue-950 bg-[repeating-linear-gradient(45deg,#1e5fd6,#1e5fd6_4px,#173f8f_4px,#173f8f_8px)] shadow" />
    );
  }
  return (
    <div
      className={`flex h-14 w-10 flex-col justify-between rounded border border-neutral-500 bg-white p-0.5 text-[11px] font-bold shadow ${
        red ? "text-red-600" : "text-black"
      } ${dim ? "opacity-60" : ""}`}
    >
      <span>{rankLabel(card.rank)}</span>
      <span className="self-center text-sm">{SUIT_SYMBOL[card.suit]}</span>
    </div>
  );
}

export function SolitaireApp() {
  const [state, setState] = useState<GameState>(deal);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [moves, setMoves] = useState(0);

  const won = SUITS.every((s) => state.foundations[s].length === 13);

  const getRun = (sel: Selection): Card[] | null => {
    if (sel.from === "waste") {
      const top = state.waste[state.waste.length - 1];
      return top ? [top] : null;
    }
    const pile = state.tableau[sel.col];
    if (sel.index >= pile.length || !pile[sel.index].faceUp) return null;
    return pile.slice(sel.index);
  };

  const removeRun = (base: GameState, sel: Selection): GameState => {
    if (sel.from === "waste") {
      return { ...base, waste: base.waste.slice(0, -1) };
    }
    const tableau = base.tableau.map((p) => [...p]);
    tableau[sel.col] = tableau[sel.col].slice(0, sel.index);
    const remaining = tableau[sel.col];
    if (remaining.length > 0) remaining[remaining.length - 1] = { ...remaining[remaining.length - 1], faceUp: true };
    return { ...base, tableau };
  };

  const tryMoveTo = (dest: { type: "tableau"; col: number } | { type: "foundation"; suit: Suit }) => {
    if (!selection) return;
    const run = getRun(selection);
    if (!run) {
      setSelection(null);
      return;
    }
    if (dest.type === "tableau") {
      const top = state.tableau[dest.col][state.tableau[dest.col].length - 1];
      if (!canPlaceOnTableau(run[0], top)) {
        setSelection(null);
        return;
      }
      const next = removeRun(state, selection);
      next.tableau = next.tableau.map((p) => [...p]);
      next.tableau[dest.col] = [...next.tableau[dest.col], ...run];
      setState(next);
      setMoves((m) => m + 1);
    } else {
      if (run.length !== 1 || run[0].suit !== dest.suit || !canPlaceOnFoundation(run[0], state.foundations[dest.suit])) {
        setSelection(null);
        return;
      }
      const next = removeRun(state, selection);
      next.foundations = { ...next.foundations, [dest.suit]: [...next.foundations[dest.suit], run[0]] };
      setState(next);
      setMoves((m) => m + 1);
    }
    setSelection(null);
  };

  const autoToFoundation = (sel: Selection) => {
    const run = getRun(sel);
    if (!run || run.length !== 1) return;
    const card = run[0];
    if (!canPlaceOnFoundation(card, state.foundations[card.suit])) return;
    const next = removeRun(state, sel);
    next.foundations = { ...next.foundations, [card.suit]: [...next.foundations[card.suit], card] };
    setState(next);
    setMoves((m) => m + 1);
    setSelection(null);
  };

  const onStockClick = () => {
    if (state.stock.length > 0) {
      const card = { ...state.stock[state.stock.length - 1], faceUp: true };
      setState({ ...state, stock: state.stock.slice(0, -1), waste: [...state.waste, card] });
    } else if (state.waste.length > 0) {
      setState({
        ...state,
        stock: [...state.waste].reverse().map((c) => ({ ...c, faceUp: false })),
        waste: [],
      });
    }
  };

  const onWasteClick = () => {
    if (state.waste.length === 0) return;
    if (selection?.from === "waste") {
      setSelection(null);
      return;
    }
    setSelection({ from: "waste" });
  };

  const onTableauCardClick = (col: number, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const card = state.tableau[col][index];
    if (!card.faceUp) return;
    if (selection?.from === "tableau" && selection.col === col && selection.index === index) {
      setSelection(null);
      return;
    }
    if (selection) {
      tryMoveTo({ type: "tableau", col });
      return;
    }
    setSelection({ from: "tableau", col, index });
  };

  const onColumnClick = (col: number) => {
    if (selection) tryMoveTo({ type: "tableau", col });
  };

  const onFoundationClick = (suit: Suit) => {
    if (selection) tryMoveTo({ type: "foundation", suit });
  };

  const isSelected = (col: number, index: number) =>
    selection?.from === "tableau" && selection.col === col && index >= selection.index;

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto bg-[#0a6b1e] p-2">
      <div className="flex items-center justify-between text-[11px] text-white">
        <span>Moves: {moves}</span>
        <button
          onClick={() => {
            setState(deal());
            setSelection(null);
            setMoves(0);
          }}
          className="xp-button px-2 py-0.5 text-black"
        >
          New Game
        </button>
      </div>

      {won && (
        <div className="rounded bg-yellow-200 p-2 text-center text-[12px] font-bold text-yellow-900">
          You win! Click New Game to play again.
        </div>
      )}

      <div className="flex gap-1.5">
        <button onClick={onStockClick} className="shrink-0">
          {state.stock.length > 0 ? (
            <Face card={{ ...state.stock[state.stock.length - 1], faceUp: false }} />
          ) : (
            <div className="flex h-14 w-10 items-center justify-center rounded border border-dashed border-white/60 text-[9px] text-white/70">
              redo
            </div>
          )}
        </button>
        <button
          onClick={onWasteClick}
          onDoubleClick={() => state.waste.length > 0 && autoToFoundation({ from: "waste" })}
          className="shrink-0"
        >
          {state.waste.length > 0 ? (
            <div className={selection?.from === "waste" ? "-translate-y-1 ring-2 ring-yellow-300" : ""}>
              <Face card={state.waste[state.waste.length - 1]} />
            </div>
          ) : (
            <div className="h-14 w-10 rounded border border-dashed border-white/30" />
          )}
        </button>
        <div className="flex-1" />
        {SUITS.map((s) => (
          <button key={s} onClick={() => onFoundationClick(s)} className="shrink-0">
            {state.foundations[s].length > 0 ? (
              <Face card={state.foundations[s][state.foundations[s].length - 1]} />
            ) : (
              <div
                className={`flex h-14 w-10 items-center justify-center rounded border border-dashed border-white/50 text-base ${
                  RED.has(s) ? "text-red-300" : "text-white/60"
                }`}
              >
                {SUIT_SYMBOL[s]}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-1 gap-1.5">
        {state.tableau.map((pile, col) => (
          <div
            key={col}
            onClick={() => onColumnClick(col)}
            className="relative w-10 flex-1"
            style={{ minHeight: 56 + Math.max(pile.length - 1, 0) * 16 }}
          >
            {pile.length === 0 && (
              <div className="absolute inset-x-0 top-0 h-14 rounded border border-dashed border-white/30" />
            )}
            {pile.map((card, index) => (
              <div
                key={card.id}
                onClick={(e) => onTableauCardClick(col, index, e)}
                onDoubleClick={() => card.faceUp && autoToFoundation({ from: "tableau", col, index })}
                className={`absolute left-0 ${isSelected(col, index) ? "-translate-y-1 ring-2 ring-yellow-300" : ""}`}
                style={{ top: index * 16 }}
              >
                <Face card={card} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-white/70">
        Click a card, then click a pile to move it. Double-click sends a card to its foundation.
      </p>
    </div>
  );
}
