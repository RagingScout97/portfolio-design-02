"use client";

import { MENU_ITEMS, portfolio } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

const LABELS: Record<SectionId, string> = {
  menu: "MAIN MENU",
  dossier: "DOSSIER",
  loadout: "LOADOUT",
  deployments: "EXPERIENCE",
  missions: "MISSIONS",
  arcade: "ARCADE",
  uplink: "UPLINK",
};

export function HudChrome({
  section,
  onHome,
  onNavigate,
}: {
  section: SectionId;
  onHome: () => void;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 border-b-4 border-hairline bg-surface px-3 py-2 md:px-5">
      <button
        type="button"
        onClick={onHome}
        className="min-h-11 text-left hover:text-accent"
      >
        <p className="pixel-title text-[8px] text-accent">RAGINGSCOUT97</p>
        <p className="mt-1 font-mono text-[11px] text-ink">
          {portfolio.profile.name.split(" ")[0]}
        </p>
      </button>

      <div className="hidden items-center gap-1 md:flex">
        {MENU_ITEMS.map((item) => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`min-h-11 border-2 px-2 py-1 font-mono text-[10px] ${
                active
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
              }`}
            >
              {item.index}
            </button>
          );
        })}
      </div>

      <div className="text-right">
        <p className="pixel-title text-[8px] text-ink">{LABELS[section]}</p>
        <p className="mt-1 font-mono text-[10px] text-ok">ONLINE</p>
      </div>
    </header>
  );
}
