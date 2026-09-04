"use client";

import { useState } from "react";
import { AbilityDetailRail } from "./AbilityDetailRail";
import { AbilityTreeCanvas } from "./AbilityTreeCanvas";
import type { AbilityNode } from "./types";

/** Stub tree for Step 3 verification */
export const STUB_NODES: AbilityNode[] = [
  {
    id: "root",
    label: "Origin",
    detail: "Starting node of the ability path.",
    icon: "root",
    x: 210,
    y: 48,
    prerequisites: [],
    meta: "ROOT",
  },
  {
    id: "a1",
    label: "Foundation",
    detail: "Core craft unlocked.",
    icon: "book",
    x: 210,
    y: 140,
    prerequisites: ["root"],
  },
  {
    id: "a2",
    label: "Blade Path",
    detail: "Combat / shipping discipline.",
    icon: "sword",
    x: 110,
    y: 240,
    prerequisites: ["a1"],
  },
  {
    id: "a3",
    label: "Code Path",
    detail: "Systems & full-stack craft.",
    icon: "code",
    x: 310,
    y: 240,
    prerequisites: ["a1"],
  },
  {
    id: "a4",
    label: "Mastery",
    detail: "Capstone ability.",
    icon: "star",
    x: 210,
    y: 360,
    prerequisites: ["a2", "a3"],
  },
  {
    id: "a5",
    label: "Shield",
    detail: "Reliability & ops.",
    icon: "shield",
    x: 210,
    y: 460,
    prerequisites: ["a4"],
  },
];

export function AbilityTreeDemo() {
  const [selectedId, setSelectedId] = useState(STUB_NODES[0].id);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr]">
      <AbilityTreeCanvas
        nodes={STUB_NODES}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <AbilityDetailRail
        nodes={STUB_NODES}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
