"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GameIcon, type GameIconName } from "@/components/icons/GameIcon";
import { MENU_ITEMS, portfolio } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/motion";
import type { SectionId } from "@/types/portfolio";
import { CastleCrest, LionCrest } from "./ui/DecorCrests";
import { KeyHintBar } from "./ui/KeyHintBar";
import { OrnateFrame } from "./ui/OrnateFrame";
import { StatusPill } from "./ui/StatusPill";
import { TorchSconce } from "./ui/TorchSconce";

const MENU_ICONS: Record<string, GameIconName> = {
  dossier: "scroll-unfurled",
  loadout: "crossed-swords",
  deployments: "family-tree",
  missions: "treasure-map",
  arcade: "joystick",
  uplink: "crystal-ball",
};

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
      className="relative z-10 flex w-full flex-1 flex-col justify-center px-2 py-4 md:px-6 md:py-6"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <OrnateFrame className="relative mx-auto w-full max-w-6xl p-3 md:p-6">
        <TorchSconce side="left" />
        <TorchSconce side="right" />

        <header className="relative z-[1] text-center">
          <h1 className="dungeon-title text-[clamp(38px,8vw,84px)]">
            {portfolio.profile.handle.toUpperCase()}
          </h1>
          <p className="dungeon-sub mt-2 text-[clamp(12px,1.8vw,18px)] text-accent">
            SYSTEMS · FULL STACK
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[11px] text-ink-muted md:text-sm">
            <span className="text-gold">+</span>
            {portfolio.profile.tagline}
            <span className="text-gold">+</span>
          </p>
        </header>

        <div className="relative z-[1] mt-6 grid items-center gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6">
          <div className="hidden lg:block">
            <LionCrest />
          </div>

          <nav
            className="panel-frame-glow panel-frame relative mx-auto w-full max-w-md overflow-hidden"
            aria-label="Main menu"
          >
            <div className="flex items-center justify-center border-b-2 border-hairline px-3 py-2">
              <StatusPill label="ONLINE" />
            </div>

            <ul className="relative p-2">
              {!reduce && (
                <motion.div
                  className="pointer-events-none absolute left-2 right-2 h-12 border-2 border-accent bg-accent/10"
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
                      <GameIcon
                        name={MENU_ICONS[item.id] ?? "round-star"}
                        className={`h-6 w-6 shrink-0 transition-colors ${
                          active ? "text-accent" : "text-ink-muted/70"
                        }`}
                      />
                      <span className="pixel-title flex-1 text-[10px] md:text-[11px]">
                        {item.label}
                      </span>
                      {active && (
                        <span className="arrow-bob text-accent">◀</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t-2 border-hairline px-3 py-2">
              <KeyHintBar
                hints={[
                  { key: "↑↓", label: "SELECT" },
                  { key: "ENTER", label: "CONFIRM" },
                ]}
              />
            </div>
          </nav>

          <div className="hidden lg:block">
            <CastleCrest />
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-6 lg:hidden">
          <LionCrest className="scale-75" />
          <CastleCrest className="scale-75" />
        </div>
      </OrnateFrame>
    </motion.div>
  );
}
