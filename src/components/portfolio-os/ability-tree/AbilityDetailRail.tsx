"use client";

import type { AbilityNode } from "./types";

export function AbilityDetailRail({
  nodes,
  selectedId,
  onSelect,
  headerLabel = "Active Abilities",
}: {
  nodes: AbilityNode[];
  selectedId: string;
  onSelect: (id: string) => void;
  headerLabel?: string;
}) {
  const selected =
    nodes.find((n) => n.id === selectedId) ?? nodes[0];

  return (
    <aside className="panel-frame flex max-h-[min(70vh,640px)] flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-hairline px-3 py-2">
        <span className="pixel-title text-[8px] text-accent">{headerLabel}</span>
        <span className="font-mono text-[11px] text-ink-muted">
          {nodes.length}/{nodes.length}AP
        </span>
      </div>

      <div className="panel-scroll flex-1 space-y-2 p-3">
        {nodes.map((node) => {
          const active = node.id === selected.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node.id)}
              className={`block w-full border-2 p-3 text-left transition ${
                active
                  ? "border-accent bg-accent/10"
                  : "border-hairline hover:border-accent/50"
              }`}
            >
              <p className="pixel-title text-[9px] text-ink">{node.label}</p>
              {node.meta && (
                <p className="mt-1 font-mono text-[10px] text-accent-hot">
                  {node.meta}
                </p>
              )}
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-muted">
                {node.detail}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
