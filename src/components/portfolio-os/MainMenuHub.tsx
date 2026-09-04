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
      className="relative z-10 flex w-full flex-1 flex-col justify-center px-3 py-6 md:px-10"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="panel-frame p-5 md:p-6">
          <p className="pixel-title text-accent">CLASSIC MENU · BUILD 3.0</p>
          <h1 className="pixel-title-lg mt-4 text-ink">
            {portfolio.profile.handle}
          </h1>
          <p className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">
            {portfolio.profile.tagline}
          </p>
          <p className="mt-6 font-mono text-[10px] text-ink-muted">
            ↑↓ SELECT · ENTER CONFIRM
          </p>
        </div>

        <nav
          className="panel-frame-glow panel-frame relative overflow-hidden p-2"
          aria-label="Main menu"
        >
          <div className="mb-1 flex items-center justify-between border-b-2 border-hairline px-3 py-2">
            <span className="pixel-title text-ink-muted">MAIN MENU</span>
            <span className="pixel-title text-ok">READY</span>
          </div>

          <ul className="relative">
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute left-0 right-0 h-12 bg-accent/15 shadow-[inset_4px_0_0_#52d9ec]"
                animate={{ y: hover * 48 }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
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
                    className={`relative flex h-12 min-h-11 w-full items-center gap-3 px-3 text-left ${
                      active ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">
                      {item.index}
                    </span>
                    <span className="pixel-title flex-1 text-[10px] md:text-[11px]">
                      {item.label}
                    </span>
                    <span className="hidden font-mono text-[10px] sm:inline">
                      {item.subtitle}
                    </span>
                    {active && <span className="text-accent">▶</span>}
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
