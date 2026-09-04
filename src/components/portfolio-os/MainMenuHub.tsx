"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MENU_ITEMS, portfolio } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import type { SectionId } from "@/types/portfolio";

export function MainMenuHub({
  onSelect,
}: {
  onSelect: (id: SectionId) => void;
}) {
  const [hover, setHover] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHover((h) => Math.min(MENU_ITEMS.length - 1, h + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHover((h) => Math.max(0, h - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        onSelect(MENU_ITEMS[hover].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hover, onSelect]);

  return (
    <motion.div
      className="relative z-10 flex w-full flex-1 flex-col justify-center px-4 py-8 md:px-12"
      initial={reduce ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? undefined : { opacity: 0, x: -12 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent">
            PORTFOLIO OS · BUILD 2.0
          </p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.9] tracking-tight md:text-7xl md:tracking-[-0.05em]">
            {portfolio.profile.handle}
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-muted">
            {portfolio.profile.tagline}
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-ink-muted">
            ↑↓ NAVIGATE · ENTER SELECT · TOUCH OK
          </p>
        </div>

        <nav className="panel-frame relative overflow-hidden p-2 md:p-3" aria-label="Main menu">
          <div className="mb-2 flex items-center justify-between px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-ink-muted">
            <span>MAIN MENU</span>
            <span className="text-ok">SYS OK</span>
          </div>

          <ul className="relative">
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute left-0 right-0 h-14 border-y border-accent/30 bg-accent/10"
                animate={{ y: hover * 56 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {MENU_ITEMS.map((item, i) => {
              const active = i === hover;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onClick={() => onSelect(item.id)}
                    className={`relative flex h-14 w-full items-center gap-4 px-3 text-left transition ${
                      active ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">
                      {item.index}
                    </span>
                    <span className="flex-1 font-display text-xl font-semibold tracking-wide md:text-2xl">
                      {item.label}
                    </span>
                    <span className="hidden font-mono text-[10px] tracking-[0.18em] sm:inline">
                      {item.subtitle}
                    </span>
                    {active && (
                      <span className="font-mono text-accent">▶</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
