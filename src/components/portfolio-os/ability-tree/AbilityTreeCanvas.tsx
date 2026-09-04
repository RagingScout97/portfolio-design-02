"use client";

import { useMemo } from "react";
import { GameIcon } from "@/components/icons/GameIcon";
import { ABILITY_ICON_NAME, litPathIds, type AbilityNode } from "./types";

export function AbilityTreeCanvas({
  nodes,
  selectedId,
  onSelect,
  width = 420,
  height = 520,
}: {
  nodes: AbilityNode[];
  selectedId: string;
  onSelect: (id: string) => void;
  width?: number;
  height?: number;
}) {
  const lit = useMemo(
    () => litPathIds(nodes, selectedId),
    [nodes, selectedId],
  );

  const edges = useMemo(() => {
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const list: { from: AbilityNode; to: AbilityNode; lit: boolean }[] = [];
    for (const node of nodes) {
      for (const pid of node.prerequisites) {
        const parent = byId.get(pid);
        if (!parent) continue;
        list.push({
          from: parent,
          to: node,
          lit: lit.has(node.id) && lit.has(parent.id),
        });
      }
    }
    return list;
  }, [nodes, lit]);

  return (
    <div className="panel-frame relative overflow-auto bg-canvas/90 shadow-[inset_0_0_40px_rgba(82,217,236,0.04)]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pixel mx-auto block h-auto w-full min-h-[280px] max-h-[min(60vh,560px)]"
        role="img"
        aria-label="Ability tree"
      >
        {edges.map((e) => (
          <line
            key={`${e.from.id}-${e.to.id}`}
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            className={e.lit ? "ability-edge-lit" : "ability-edge"}
          />
        ))}

        {nodes.map((node) => {
          const active = node.id === selectedId;
          const onPath = lit.has(node.id);
          const size = 44;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x - size / 2}, ${node.y - size / 2})`}
              className="cursor-pointer"
              onClick={() => onSelect(node.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  onSelect(node.id);
                }
              }}
            >
              <rect
                width={size}
                height={size}
                rx={2}
                className={
                  active || onPath
                    ? "fill-[#1a1a1a] stroke-[#52d9ec] stroke-[3]"
                    : "fill-[#1a1a1a] stroke-[#4a4a4a] stroke-[3]"
                }
                style={
                  active
                    ? { filter: "drop-shadow(0 0 6px rgba(82,217,236,0.85))" }
                    : undefined
                }
              />
              <GameIcon
                name={ABILITY_ICON_NAME[node.icon]}
                x={7}
                y={7}
                width={30}
                height={30}
                className={
                  active || onPath ? "text-accent" : "text-ink-muted/70"
                }
              />
              <title>{node.label}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
