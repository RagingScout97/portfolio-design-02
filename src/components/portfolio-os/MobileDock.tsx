"use client";

import { GameIcon } from "@/components/icons/GameIcon";
import { MENU_ITEMS } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";
import { SECTION_ICONS } from "./HudChrome";

export function MobileDock({
  section,
  onNavigate,
  onHome,
}: {
  section: SectionId;
  onNavigate: (id: SectionId) => void;
  onHome: () => void;
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t-4 border-hairline bg-surface/95 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 md:hidden"
      aria-label="Section dock"
    >
      <div className="flex items-stretch justify-between gap-0.5 overflow-x-auto">
        <button
          type="button"
          onClick={onHome}
          className={`flex min-h-11 min-w-[2.75rem] flex-1 flex-col items-center justify-center gap-0.5 border-2 px-0.5 py-1 font-mono text-[8px] ${
            section === "menu"
              ? "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(82,217,236,0.3)]"
              : "border-transparent text-ink-muted"
          }`}
        >
          <GameIcon name={SECTION_ICONS.menu} className="h-4 w-4" />
          MENU
        </button>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex min-h-11 min-w-[2.75rem] flex-1 flex-col items-center justify-center gap-0.5 border-2 px-0.5 py-1 font-mono text-[8px] ${
              section === item.id
                ? "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(82,217,236,0.3)]"
                : "border-transparent text-ink-muted"
            }`}
          >
            <GameIcon name={SECTION_ICONS[item.id]} className="h-4 w-4" />
            {item.label.slice(0, 4)}
          </button>
        ))}
      </div>
    </nav>
  );
}
