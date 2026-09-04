"use client";

import { MENU_ITEMS } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

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
      className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
      aria-label="Section dock"
    >
      <div className="flex items-stretch justify-between gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={onHome}
          className={`min-w-[3.25rem] flex-1 px-1 py-2 font-mono text-[9px] tracking-wider ${
            section === "menu" ? "text-accent" : "text-ink-muted"
          }`}
        >
          MENU
        </button>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`min-w-[3.25rem] flex-1 px-1 py-2 font-mono text-[9px] tracking-wider ${
              section === item.id ? "text-accent" : "text-ink-muted"
            }`}
          >
            {item.label.slice(0, 4)}
          </button>
        ))}
      </div>
    </nav>
  );
}
