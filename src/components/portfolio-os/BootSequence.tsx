"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const LINES = [
  "RAGINGSCOUT97 SYSTEMS",
  "INITIALIZING KERNEL...",
  "LOADING PROFILE MODULE...",
  "MOUNTING SKILL TREE...",
  "SYNCING MISSION ARCHIVE...",
  "HUD ONLINE",
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete();
  };

  useEffect(() => {
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const start = performance.now();
    const duration = 2800;
    let raf = 0;
    let timeout = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      setLineIdx(Math.min(LINES.length - 1, Math.floor(t * LINES.length)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(finish, 220);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">
        BOOT SEQUENCE
      </p>
      <h1 className="text-center font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl md:tracking-[-0.04em]">
        RagingScout97
        <span className="block text-xl font-medium tracking-[0.18em] text-ink-muted md:text-2xl">
          SYSTEMS
        </span>
      </h1>

      <div className="mt-10 w-full max-w-md">
        <div className="mb-2 flex justify-between font-mono text-[11px] text-ink-muted">
          <span>{LINES[lineIdx]}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden border border-hairline bg-surface">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-8 font-mono text-[10px] tracking-[0.25em] text-ink-muted">
        CLICK OR PRESS ANY KEY TO SKIP
      </p>
    </motion.div>
  );
}
