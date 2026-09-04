"use client";

import type { AbilityNode } from "./types";

export function AbilityDetailRail({
  nodes,
  selectedId,
  onSelect,
  headerLabel = "ACTIVE ABILITIES",
}: {
  nodes: AbilityNode[];
  selectedId: string;
  onSelect: (id: string) => void;
  headerLabel?: string;
}) {
  const selected = nodes.find((n) => n.id === selectedId) ?? nodes[0];
  const ap = nodes.length;

  return (
    <aside className="panel-frame flex max-h-[min(70vh,640px)] flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-hairline px-3 py-2">
        <span className="pixel-title text-[8px] text-accent">
          {headerLabel} · {ap}/{ap} AP
        </span>
      </div>

      <div className="panel-scroll flex-1 space-y-2 p-3">
        {nodes.map((node) => {
          const active = node.id === selected?.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node.id)}
              className={`flex w-full items-start gap-2 border-2 p-3 text-left transition ${
                active
                  ? "border-accent bg-accent/10 shadow-[0_0_10px_rgba(82,217,236,0.2)]"
                  : "border-hairline hover:border-accent/50"
              }`}
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 ${active ? "bg-accent shadow-[0_0_6px_#52d9ec]" : "bg-hairline"}`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="pixel-title text-[9px] text-ink">{node.label}</p>
                {node.meta && (
                  <p className="mt-1 font-mono text-[10px] text-accent-hot">
                    {node.meta}
                  </p>
                )}
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-muted">
                  {node.detail}
                </p>
              </div>
              <span className="shrink-0 border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-ink-muted">
                1 AP
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
