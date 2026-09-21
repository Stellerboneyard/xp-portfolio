"use client";

// Small synthesized sound set -- no external audio files (nothing to source
// license-clean, nothing to fetch). Each call builds a short oscillator
// envelope and discards it. The AudioContext is created lazily on first use,
// which is always from inside a click handler here, satisfying the browser's
// autoplay-needs-a-user-gesture rule.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType, gain: number) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0, audio.currentTime + start);
  amp.gain.linearRampToValueAtTime(gain, audio.currentTime + start + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(amp).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

export const sound = {
  click: () => tone(1200, 0, 0.03, "square", 0.03),
  open: () => {
    tone(660, 0, 0.08, "sine", 0.05);
    tone(990, 0.05, 0.1, "sine", 0.05);
  },
  close: () => {
    tone(880, 0, 0.07, "sine", 0.05);
    tone(520, 0.05, 0.09, "sine", 0.05);
  },
  error: () => {
    tone(220, 0, 0.12, "square", 0.04);
    tone(160, 0.1, 0.16, "square", 0.04);
  },
  chime: () => {
    tone(523, 0, 0.18, "sine", 0.06);
    tone(659, 0.12, 0.18, "sine", 0.06);
    tone(784, 0.24, 0.28, "sine", 0.06);
  },
};
