"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

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

export function ArcadePanel() {
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

        // ship
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

  const onPointer = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    shootAt(e.clientX, e.clientY);
  };

  return (
    <section className="panel-frame p-4 md:p-6">
      <p className="pixel-title text-accent">05 · ARCADE</p>
      <h2 className="pixel-title-lg mt-3 text-ink">Word Barrage</h2>
      <p className="mt-2 max-w-xl font-mono text-sm text-ink-muted">
        Tap or click falling tech words before they hit the floor.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
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

      <div className="mt-4 w-full">
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          onPointerDown={onPointer}
          aria-label="Word Barrage mini-game canvas"
        />
      </div>
      <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-ink-muted">
        DESKTOP · CLICK WORDS · MOBILE · TAP TARGETS
      </p>
    </section>
  );
}
