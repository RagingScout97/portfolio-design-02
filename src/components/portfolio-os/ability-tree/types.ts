import type { GameIconName } from "@/components/icons/GameIcon";

export type AbilityIcon =
  | "root"
  | "sword"
  | "code"
  | "star"
  | "gear"
  | "bolt"
  | "book"
  | "shield";

export interface AbilityNode {
  id: string;
  label: string;
  detail: string;
  icon: AbilityIcon;
  x: number;
  y: number;
  prerequisites: string[];
  meta?: string;
}

export const ABILITY_ICON_NAME: Record<AbilityIcon, GameIconName> = {
  root: "rune-stone",
  sword: "broadsword",
  code: "laptop",
  star: "round-star",
  gear: "cog",
  bolt: "crystal-shine",
  book: "spell-book",
  shield: "shield",
};

/** Collect ancestor path ids from root(s) to selected (inclusive). */
export function litPathIds(
  nodes: AbilityNode[],
  selectedId: string,
): Set<string> {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const lit = new Set<string>();
  const walk = (id: string) => {
    if (lit.has(id)) return;
    lit.add(id);
    const node = byId.get(id);
    if (!node) return;
    for (const p of node.prerequisites) walk(p);
  };
  walk(selectedId);
  return lit;
}
