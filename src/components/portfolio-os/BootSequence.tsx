"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { OrnateFrame } from "./ui/OrnateFrame";
import { PixelBanner } from "./ui/PixelBanner";

const BOOT_LOG = [
  { ok: true, text: "BOOT SEQUENCE INITIATED" },
  { ok: true, text: "MOUNTING SYSTEMS..." },
  { ok: true, text: "LOADING CORE MODULES..." },
  { ok: true, text: "LOADING LOADOUT..." },
  { ok: false, text: "ESTABLISHING UPLINK..." },
  { ok: false, text: "SYNCHRONIZING DATA..." },
  { ok: true, text: "UPLINK READY" },
];

function WireframeGlobe() {
  return (
    <svg viewBox="0 0 160 160" className="pixel mx-auto h-36 w-36 md:h-44 md:w-44" aria-hidden>
      <circle
        cx="80"
        cy="80"
        r="68"
        fill="#0a0b0c"
        stroke="#4a4e52"
        strokeWidth="4"
      />
      <circle cx="80" cy="80" r="58" fill="none" stroke="#52d9ec" strokeWidth="1.5" opacity="0.85" />
      <ellipse cx="80" cy="80" rx="58" ry="22" fill="none" stroke="#52d9ec" strokeWidth="1" opacity="0.5" />
      <ellipse cx="80" cy="80" rx="58" ry="40" fill="none" stroke="#52d9ec" strokeWidth="1" opacity="0.4" />
      <ellipse cx="80" cy="80" rx="22" ry="58" fill="none" stroke="#52d9ec" strokeWidth="1" opacity="0.5" />
      <ellipse cx="80" cy="80" rx="40" ry="58" fill="none" stroke="#52d9ec" strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="80" x2="138" y2="80" stroke="#52d9ec" strokeWidth="1" opacity="0.6" />
      <line x1="80" y1="22" x2="80" y2="138" stroke="#52d9ec" strokeWidth="1" opacity="0.6" />
      <circle cx="80" cy="80" r="3" fill="#52d9ec" />
    </svg>
  );
}

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(1);
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
      setVisibleLines(
        Math.min(BOOT_LOG.length, Math.max(1, Math.ceil(t * BOOT_LOG.length))),
      );
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(finish, 280);
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

  const segments = 24;
  const onCount = Math.round((progress / 100) * segments);

  return (
    <motion.div
      className="relative z-20 flex h-full w-full flex-col items-center justify-center px-3 py-4 md:px-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <OrnateFrame className="relative w-full max-w-4xl p-4 md:p-8">
        <PixelBanner icon="crosshair" side="left" />
        <PixelBanner icon="crosshair" side="right" />

        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <p className="gold-title text-center text-[clamp(16px,3.5vw,28px)] leading-tight">
            RAGING SCOUT 97
          </p>

          <div className="mt-6 flex w-full max-w-xl items-center gap-3">
            <div className="h-5 flex-1 border-2 border-hairline bg-canvas p-0.5">
              <div className="progress-segments h-full">
                {Array.from({ length: segments }).map((_, i) => (
                  <i key={i} className={i < onCount ? "on" : ""} />
                ))}
              </div>
            </div>
            <span className="pixel-title shrink-0 text-accent">{progress}%</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="panel-frame border-accent/40 p-3 font-mono text-[10px] leading-relaxed md:text-[11px]">
            {BOOT_LOG.slice(0, visibleLines).map((line, i) => {
              const doneLine =
                line.ok &&
                (i < visibleLines - 1 ||
                  progress > 90 ||
                  (line.text === "UPLINK READY" && progress >= 100));
              const pending =
                !line.ok && i === visibleLines - 1 && progress < 95;
              return (
                <p key={line.text} className="mb-1 last:mb-0">
                  <span className={doneLine || (!pending && line.ok) ? "text-ok" : "text-ink-muted"}>
                    [{doneLine || (line.ok && i < visibleLines - 1) || (line.ok && progress >= 98) ? " OK " : " .. "}]
                  </span>{" "}
                  <span className="text-ink">{line.text}</span>
                </p>
              );
            })}
          </div>

          <div className="panel-frame flex items-center justify-center p-3">
            <WireframeGlobe />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 font-mono text-[9px] text-ink-muted">
          <span>SYS v1.0.0</span>
          <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-gold/50 text-[10px] text-gold">
            97
          </span>
          <span>© RAGING SCOUT 97</span>
        </div>

        <p className="mt-3 text-center font-mono text-[10px] text-ink-muted">
          PRESS ANY KEY / TAP TO SKIP
        </p>
      </OrnateFrame>
    </motion.div>
  );
}
