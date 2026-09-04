"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const LINES = [
  "RAGINGSCOUT97 SYSTEMS",
  "LOADING SAVE DATA...",
  "MOUNTING ABILITY TREE...",
  "SYNCING QUEST LOG...",
  "MENU READY",
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
      className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="panel-frame w-full max-w-lg p-6 md:p-8">
        <p className="pixel-title text-center text-accent">BOOT SEQUENCE</p>
        <h1 className="pixel-title-lg mt-6 text-center text-ink">
          RagingScout97
        </h1>
        <p className="pixel-title mt-3 text-center text-ink-muted">SYSTEMS</p>

        <div className="mt-8">
          <div className="mb-2 flex justify-between font-mono text-[11px] text-ink-muted">
            <span>{LINES[lineIdx]}</span>
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="h-4 border-2 border-hairline bg-canvas p-0.5">
            <div
              className="h-full bg-accent"
              style={{
                width: `${progress}%`,
                imageRendering: "pixelated",
              }}
            />
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] text-ink-muted">
          PRESS ANY KEY / TAP TO SKIP
        </p>
      </div>
    </motion.div>
  );
}
