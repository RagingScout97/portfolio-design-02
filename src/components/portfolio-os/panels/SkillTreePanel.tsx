"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { AbilityDetailRail } from "../ability-tree/AbilityDetailRail";
import { AbilityTreeCanvas } from "../ability-tree/AbilityTreeCanvas";
import { abilityTreeBounds } from "../ability-tree/mapExperiences";
import { skillsToAbilityNodes } from "../ability-tree/mapSkills";
import { KeyHintBar } from "../ui/KeyHintBar";
import { OrnateFrame } from "../ui/OrnateFrame";
import { SectionTitle } from "../ui/SectionTitle";

export function SkillTreePanel() {
  const nodes = useMemo(() => skillsToAbilityNodes(portfolio.skills), []);
  const bounds = useMemo(() => abilityTreeBounds(nodes), [nodes]);
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const ap = nodes.length;

  return (
    <OrnateFrame className="p-3 md:p-5">
      <SectionTitle>LOADOUT</SectionTitle>
      <p className="mt-2 text-center pixel-title text-[8px] text-ink-muted">
        STACK ROOT · TECHNICAL LOADOUT
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
        <div>
          <AbilityTreeCanvas
            nodes={nodes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            width={bounds.width}
            height={bounds.height}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="panel-frame px-3 py-1.5 font-mono text-[10px] text-accent">
              AP {ap}/{ap} AVAILABLE
            </div>
            <KeyHintBar
              hints={[
                { key: "↑↓", label: "NAVIGATE" },
                { key: "ENTER", label: "INSPECT" },
                { key: "ESC", label: "BACK" },
              ]}
            />
          </div>
        </div>
        <AbilityDetailRail
          nodes={nodes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          headerLabel="EQUIPPED SKILLS"
        />
      </div>
    </OrnateFrame>
  );
}
