"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import type { SkillNode } from "@/types/portfolio";

const TIER_LABEL = { 1: "NODE", 2: "BRANCH", 3: "CORE" } as const;

export function SkillTreePanel() {
  const categories = useMemo(() => {
    const map = new Map<string, SkillNode[]>();
    for (const skill of portfolio.skills) {
      const list = map.get(skill.category) ?? [];
      list.push(skill);
      map.set(skill.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const [selectedId, setSelectedId] = useState(portfolio.skills[0]?.id);
  const selected =
    portfolio.skills.find((s) => s.id === selectedId) ?? portfolio.skills[0];

  const prereqNames = (selected.prerequisites ?? [])
    .map((id) => portfolio.skills.find((s) => s.id === id)?.name)
    .filter(Boolean);

  return (
    <section className="panel-frame p-5 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
        02 · LOADOUT
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Skill Tree
      </h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Tap a node to inspect. Tier rings mark depth — CORE skills sit at the
        edge of the build.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8 overflow-x-auto pb-2">
          {categories.map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-3 font-mono text-[10px] tracking-[0.28em] text-ink-muted">
                {category.toUpperCase()}
              </h3>
              <div className="relative flex flex-wrap gap-3 md:gap-4">
                {skills.map((skill, i) => {
                  const active = skill.id === selected.id;
                  const size =
                    skill.tier === 3
                      ? "h-20 w-20 md:h-24 md:w-24"
                      : skill.tier === 2
                        ? "h-16 w-16 md:h-20 md:w-20"
                        : "h-14 w-14 md:h-16 md:w-16";
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedId(skill.id)}
                      className={`group relative flex ${size} flex-col items-center justify-center rounded-full border text-center transition ${
                        active
                          ? "border-accent bg-accent/15 shadow-[0_0_24px_rgba(92,225,255,0.25)]"
                          : "border-hairline bg-surface-2/80 hover:border-accent/50"
                      }`}
                      style={{
                        transform: `translateY(${(i % 3) * 4}px)`,
                      }}
                      aria-pressed={active}
                    >
                      <span className="px-1 font-display text-[10px] font-semibold leading-tight md:text-xs">
                        {skill.name}
                      </span>
                      <span className="mt-0.5 font-mono text-[8px] text-accent">
                        T{skill.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <aside className="border border-hairline bg-surface-2/60 p-5 h-fit sticky top-0">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
            {TIER_LABEL[selected.tier]} · TIER {selected.tier}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">{selected.name}</h3>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-ink-muted">
            {selected.category}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {selected.detail}
          </p>
          {prereqNames.length > 0 && (
            <div className="mt-5 border-t border-hairline pt-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-muted">
                REQUIRES
              </p>
              <p className="mt-2 text-sm text-accent-hot">
                {prereqNames.join(" → ")}
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
