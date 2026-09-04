"use client";

import { MENU_ITEMS, portfolio } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

const LABELS: Record<SectionId, string> = {
  menu: "MAIN MENU",
  dossier: "DOSSIER",
  loadout: "LOADOUT",
  deployments: "DEPLOYMENTS",
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
    <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-hairline bg-canvas/80 px-4 py-3 backdrop-blur-md md:px-6">
      <button
        type="button"
        onClick={onHome}
        className="text-left transition hover:text-accent"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-accent">
          RAGINGSCOUT97 SYSTEMS
        </p>
        <p className="font-display text-sm font-semibold tracking-wide">
          {portfolio.profile.name}
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
              className={`px-2 py-1 font-mono text-[10px] tracking-[0.14em] transition ${
                active
                  ? "text-accent"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.index}
            </button>
          );
        })}
      </div>

      <div className="text-right font-mono text-[10px] tracking-[0.18em] text-ink-muted">
        <p className="text-ink">{LABELS[section]}</p>
        <p>ONLINE</p>
      </div>
    </header>
  );
}
