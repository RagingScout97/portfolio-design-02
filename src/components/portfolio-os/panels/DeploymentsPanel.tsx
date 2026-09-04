"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { AbilityDetailRail } from "../ability-tree/AbilityDetailRail";
import { AbilityTreeCanvas } from "../ability-tree/AbilityTreeCanvas";
import {
  abilityTreeBounds,
  experiencesToAbilityNodes,
} from "../ability-tree/mapExperiences";

export function DeploymentsPanel() {
  const nodes = useMemo(
    () => experiencesToAbilityNodes(portfolio.experiences),
    [],
  );
  const bounds = useMemo(() => abilityTreeBounds(nodes), [nodes]);
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");

  return (
    <section>
      <div className="panel-frame mb-4 p-4 md:p-5">
        <p className="pixel-title text-accent">03 · EXPERIENCE</p>
        <h2 className="pixel-title-lg mt-3 text-ink">Ability Tree</h2>
        <p className="mt-3 max-w-xl font-mono text-sm text-ink-muted">
          Wynncraft-style path — select a node to light the route and read the
          ability brief.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
        <AbilityTreeCanvas
          nodes={nodes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          width={bounds.width}
          height={bounds.height}
        />
        <AbilityDetailRail
          nodes={nodes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          headerLabel="Active Abilities"
        />
      </div>
    </section>
  );
}
