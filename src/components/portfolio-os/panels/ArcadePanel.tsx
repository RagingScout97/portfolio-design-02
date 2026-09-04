"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { KeyHintBar } from "../ui/KeyHintBar";
import { OrnateFrame } from "../ui/OrnateFrame";
import { PixelBanner } from "../ui/PixelBanner";
import { SectionTitle } from "../ui/SectionTitle";

type Word = {
  id: number;
  text: string;
  x: number;
  y: number;
  vy: number;
  alive: boolean;
};

const WORDS = [
  "REACT",
  "JAVA",
  "NEXT",
  "API",
  "HUD",
  "GSAP",
  "SQL",
  "NODE",
  "CSS",
  "GIT",
];

const CABINETS = [
  {
    id: "word-barrage",
    name: "WORD BARRAGE",
    blurb: "Tap falling tech words before they hit the floor.",
    playable: true,
    sprite: "/game-ui/sprites/cabinet-1.png",
  },
  {
    id: "snake",
    name: "SNAKE BYTE",
    blurb: "Classic snake. Eat pixels, grow longer, avoid walls.",
    playable: false,
    sprite: "/game-ui/sprites/cabinet-2.png",
  },
  {
    id: "breaker",
    name: "BLOCK BREAKER",
    blurb: "Breakout-style brick smash. Coming soon.",
    playable: false,
    sprite: "/game-ui/sprites/cabinet-3.png",
  },
  {
    id: "runner",
    name: "CODE RUNNER",
    blurb: "Side-scroll through syntax storms. Coming soon.",
    playable: false,
    sprite: "/game-ui/sprites/cabinet-4.png",
  },
] as const;

const FAKE_SCORES = [
  { name: "RAGING SCOUT 97", score: 12450 },
  { name: "CODE HUNTER", score: 9800 },
  { name: "BYTE BANDIT", score: 7200 },
  { name: "DEBUG KNIGHT", score: 5100 },
  { name: "SQL SORCERER", score: 3400 },
];

function WordBarrageGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const stateRef = useRef({
    words: [] as Word[],
    score: 0,
    nextId: 1,
    spawnAcc: 0,
    shipX: 0.5,
    running: false,
    over: false,
  });

  const reset = useCallback(() => {
    stateRef.current = {
      words: [],
      score: 0,
      nextId: 1,
      spawnAcc: 0,
      shipX: 0.5,
      running: true,
      over: false,
    };
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = Math.max(280, Math.min(420, parent.clientWidth * 0.55));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawn = (w: number) => {
      const s = stateRef.current;
      s.words.push({
        id: s.nextId++,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        x: 40 + Math.random() * Math.max(40, w - 80),
        y: -20,
        vy: 40 + Math.random() * 50 + s.score * 1.5,
        alive: true,
      });
    };

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const s = stateRef.current;

      ctx.fillStyle = "#0a0e12";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(92,225,255,0.12)";
      ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

      if (s.running && !s.over) {
        s.spawnAcc += dt;
        if (s.spawnAcc > Math.max(0.55, 1.2 - s.score * 0.02)) {
          s.spawnAcc = 0;
          spawn(w);
        }

        for (const word of s.words) {
          if (!word.alive) continue;
          word.y += word.vy * dt;
          if (word.y > h - 36) {
            s.over = true;
            s.running = false;
            setRunning(false);
            setGameOver(true);
          }
        }

        const shipPx = s.shipX * w;
        ctx.fillStyle = "#5ce1ff";
        ctx.beginPath();
        ctx.moveTo(shipPx, h - 18);
        ctx.lineTo(shipPx - 14, h - 8);
        ctx.lineTo(shipPx + 14, h - 8);
        ctx.closePath();
        ctx.fill();
      }

      for (const word of s.words) {
        if (!word.alive) continue;
        ctx.font = "700 14px JetBrains Mono, monospace";
        ctx.fillStyle = "#ffb84d";
        ctx.textAlign = "center";
        ctx.fillText(word.text, word.x, word.y);
      }

      ctx.fillStyle = "#8b959f";
      ctx.font = "11px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE ${s.score}`, 12, 22);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const shootAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;
    if (!s.running || s.over) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    s.shipX = Math.min(0.95, Math.max(0.05, x / rect.width));

    for (const word of s.words) {
      if (!word.alive) continue;
      const dx = Math.abs(word.x - x);
      const dy = Math.abs(word.y - y);
      if (dx < 42 && dy < 22) {
        word.alive = false;
        s.score += 10;
        setScore(s.score);
        return;
      }
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="min-h-11 border-2 border-hairline px-3 font-mono text-[11px] hover:border-accent hover:text-accent"
        >
          ← LOBBY
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 bg-accent px-4 py-2 font-mono text-[11px] text-canvas hover:bg-ink hover:text-accent"
        >
          {running ? "RESTART" : gameOver ? "PLAY AGAIN" : "START"}
        </button>
        <span className="font-mono text-sm text-accent-hot">SCORE {score}</span>
        {gameOver && (
          <span className="font-mono text-sm text-danger">SYSTEM BREACH</span>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="w-full touch-none cursor-crosshair border-2 border-hairline"
        onPointerDown={(e: ReactPointerEvent<HTMLCanvasElement>) =>
          shootAt(e.clientX, e.clientY)
        }
        aria-label="Word Barrage mini-game canvas"
      />
    </div>
  );
}

export function ArcadePanel() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const cab = CABINETS[selected];

  useEffect(() => {
    if (playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(CABINETS.length - 1, s + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(0, s - 1));
      }
      if (e.key === "Enter" && CABINETS[selected].playable) {
        e.preventDefault();
        setPlaying(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, selected]);

  return (
    <OrnateFrame className="p-3 md:p-5">
      <PixelBanner icon="trophy" side="left" />
      <PixelBanner icon="pad" side="right" />
      <SectionTitle>ARCADE</SectionTitle>
      <p className="mt-2 text-center pixel-title text-[8px] text-accent">
        PLAY · COMPETE · LEVEL UP
      </p>

      {playing ? (
        <div className="mt-4">
          <WordBarrageGame onExit={() => setPlaying(false)} />
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CABINETS.map((c, i) => {
              const active = i === selected;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(i)}
                  onDoubleClick={() => c.playable && setPlaying(true)}
                  className={`panel-frame flex flex-col items-center p-3 text-center transition ${
                    active
                      ? "border-accent shadow-[0_0_16px_rgba(82,217,236,0.3)]"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="relative mb-2 w-full overflow-hidden bg-canvas">
                    <Image
                      src={c.sprite}
                      alt=""
                      width={220}
                      height={360}
                      className="pixel-sprite mx-auto h-36 w-auto object-contain"
                      unoptimized
                    />
                    {!c.playable && (
                      <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[8px] text-accent-hot">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="pixel-title text-[8px] text-ink">{c.name}</p>
                  <span className="mt-1 text-gold text-[10px]">★★★★★</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="panel-frame p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden>
                  ▣
                </span>
                <div>
                  <p className="pixel-title text-[10px] text-ink">{cab.name}</p>
                  <p className="mt-2 font-mono text-[11px] text-ink-muted">
                    {cab.blurb}
                  </p>
                  {cab.playable ? (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="mt-3 font-mono text-[11px] text-accent animate-pulse"
                    >
                      ▶ PRESS ENTER TO PLAY ◀
                    </button>
                  ) : (
                    <p className="mt-3 font-mono text-[11px] text-accent-hot">
                      COMING SOON
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="panel-frame px-3 py-2">
                  <p className="font-mono text-[9px] text-ink-muted">BEST SCORE</p>
                  <p className="font-mono text-sm text-gold">001,245</p>
                </div>
              </div>
            </div>

            <div className="panel-frame p-3">
              <p className="pixel-title text-center text-[8px] text-gold">
                HIGH SCORES
              </p>
              <ol className="mt-2 space-y-1">
                {FAKE_SCORES.map((row, i) => (
                  <li
                    key={row.name}
                    className="flex items-center justify-between font-mono text-[10px]"
                  >
                    <span className="text-ink-muted">
                      {i + 1}. {row.name}
                    </span>
                    <span className="text-accent">
                      {row.score.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-4 panel-frame flex flex-wrap items-center justify-between gap-2 px-3 py-2">
            <p className="font-mono text-[10px] text-ink">
              PLAYER · {portfolio.profile.handle.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-accent">LV 97</p>
            <p className="font-mono text-[10px] text-gold">TOKENS 97</p>
          </div>
        </>
      )}

      <KeyHintBar
        className="mt-4"
        hints={[
          { key: "←→", label: "SELECT" },
          { key: "ENTER", label: "PLAY" },
          { key: "ESC", label: "BACK" },
        ]}
      />
    </OrnateFrame>
  );
}
