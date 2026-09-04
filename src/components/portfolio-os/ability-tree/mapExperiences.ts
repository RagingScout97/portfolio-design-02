import type { Experience } from "@/types/portfolio";
import type { AbilityIcon, AbilityNode } from "./types";

const CHAPTER_ICONS: AbilityIcon[] = ["sword", "gear", "bolt", "shield"];
const ABILITY_ICONS: AbilityIcon[] = ["code", "book", "star", "bolt", "gear"];

export function experiencesToAbilityNodes(
  experiences: Experience[],
): AbilityNode[] {
  const nodes: AbilityNode[] = [
    {
      id: "exp-root",
      label: "Career Root",
      detail: "Origin of the campaign — every deployment branches from here.",
      icon: "root",
      x: 210,
      y: 40,
      prerequisites: [],
      meta: "ROOT",
    },
  ];

  let cursorY = 130;
  const colLeft = 100;
  const colRight = 320;
  const colMid = 210;

  experiences.forEach((exp, ei) => {
    const chapterId = `exp-ch-${ei}`;
    const x = ei % 2 === 0 ? colLeft : colRight;
    nodes.push({
      id: chapterId,
      label: exp.role,
      detail: `${exp.company} · ${exp.from}–${exp.to}`,
      icon: CHAPTER_ICONS[ei % CHAPTER_ICONS.length],
      x,
      y: cursorY,
      prerequisites: ["exp-root"],
      meta: `CHAPTER ${String(ei + 1).padStart(2, "0")}`,
    });

    let prevId = chapterId;
    let childY = cursorY + 90;
    exp.description.forEach((line, ai) => {
      const id = `exp-ch-${ei}-a-${ai}`;
      const childX = ei % 2 === 0 ? colMid - 40 : colMid + 40;
      const short =
        line.length > 42 ? `${line.slice(0, 40).trim()}…` : line;
      nodes.push({
        id,
        label: short,
        detail: line,
        icon: ABILITY_ICONS[ai % ABILITY_ICONS.length],
        x: childX + (ai % 2 === 0 ? -30 : 30),
        y: childY,
        prerequisites: [prevId],
        meta: exp.company,
      });
      prevId = id;
      childY += 80;
    });

    cursorY = Math.max(cursorY + 100, childY + 20);
  });

  // Normalize height: return nodes; canvas height computed by consumer
  return nodes;
}

export function abilityTreeBounds(nodes: AbilityNode[]): {
  width: number;
  height: number;
} {
  const maxX = Math.max(...nodes.map((n) => n.x), 420);
  const maxY = Math.max(...nodes.map((n) => n.y), 400);
  return { width: Math.max(420, maxX + 60), height: Math.max(480, maxY + 60) };
}
