"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";

type Op = "+" | "-" | "×" | "÷";

function apply(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
}

const BUTTON_ROWS: string[][] = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [pending, setPending] = useState<{ value: number; op: Op } | null>(null);
  const [freshEntry, setFreshEntry] = useState(true);

  const inputDigit = (d: string) => {
    if (freshEntry) {
      setDisplay(d === "." ? "0." : d);
      setFreshEntry(false);
      return;
    }
    if (d === "." && display.includes(".")) return;
    if (display.length >= 14) return;
    setDisplay(display === "0" && d !== "." ? d : display + d);
  };

  const clear = () => {
    setDisplay("0");
    setPending(null);
    setFreshEntry(true);
  };

  const toggleSign = () => setDisplay((d) => (d.startsWith("-") ? d.slice(1) : d === "0" ? d : `-${d}`));

  const percent = () => setDisplay((d) => String(parseFloat(d) / 100));

  const chooseOp = (op: Op) => {
    const value = parseFloat(display);
    if (pending && !freshEntry) {
      const result = apply(pending.value, value, pending.op);
      setDisplay(Number.isNaN(result) ? "Error" : String(result));
      setPending({ value: Number.isNaN(result) ? 0 : result, op });
    } else {
      setPending({ value, op });
    }
    setFreshEntry(true);
  };

  const equals = () => {
    if (!pending) return;
    const value = parseFloat(display);
    const result = apply(pending.value, value, pending.op);
    setDisplay(Number.isNaN(result) ? "Error" : String(result));
    setPending(null);
    setFreshEntry(true);
  };

  const press = (key: string) => {
    sound.click();
    if (key === "C") return clear();
    if (key === "±") return toggleSign();
    if (key === "%") return percent();
    if (key === "=") return equals();
    if (key === "+" || key === "-" || key === "×" || key === "÷") return chooseOp(key as Op);
    return inputDigit(key);
  };

  return (
    <div className="flex h-full flex-col gap-2 bg-[#ece9d8] p-2">
      <div className="xp-well px-2 py-3 text-right font-mono text-2xl text-black" style={{ overflowWrap: "anywhere" }}>
        {display}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {BUTTON_ROWS.map((row, i) => (
          <div key={i} className="grid flex-1 grid-cols-4 gap-1.5">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => press(key)}
                className={`xp-button text-[15px] font-semibold text-neutral-800 ${
                  key === "0" ? "col-span-2" : ""
                } ${key === "=" ? "bg-blue-100" : ""}`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
