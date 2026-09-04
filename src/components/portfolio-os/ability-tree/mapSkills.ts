import type { SkillNode } from "@/types/portfolio";
import type { AbilityIcon, AbilityNode } from "./types";

const CAT_ICON: Record<string, AbilityIcon> = {
  Languages: "book",
  Frontend: "code",
  Backend: "gear",
  Creative: "star",
  Ops: "shield",
};

export function skillsToAbilityNodes(skills: SkillNode[]): AbilityNode[] {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const nodes: AbilityNode[] = [
    {
      id: "skill-root",
      label: "Loadout Core",
      detail: "Technical skill tree — unlock paths across the stack.",
      icon: "root",
      x: 240,
      y: 36,
      prerequisites: [],
      meta: "CORE",
    },
  ];

  const catY = 120;
  const catSpacing = 420 / Math.max(categories.length, 1);
  const catIds: Record<string, string> = {};

  categories.forEach((cat, i) => {
    const id = `cat-${cat}`;
    catIds[cat] = id;
    nodes.push({
      id,
      label: cat,
      detail: `${cat} branch of the loadout.`,
      icon: CAT_ICON[cat] ?? "gear",
      x: 60 + i * catSpacing + catSpacing / 2,
      y: catY,
      prerequisites: ["skill-root"],
      meta: "BRANCH",
    });
  });

  const byCat = new Map<string, SkillNode[]>();
  for (const s of skills) {
    const list = byCat.get(s.category) ?? [];
    list.push(s);
    byCat.set(s.category, list);
  }

  categories.forEach((cat, ci) => {
    const list = byCat.get(cat) ?? [];
    const baseX = 60 + ci * catSpacing + catSpacing / 2;
    list.forEach((skill, si) => {
      const prereqs =
        skill.prerequisites && skill.prerequisites.length > 0
          ? skill.prerequisites
          : [catIds[cat]];
      // Only keep prereqs that exist as skill ids or category
      const resolved = prereqs
        .map((p) => (skills.some((x) => x.id === p) ? p : catIds[cat]))
        .filter(Boolean) as string[];

      nodes.push({
        id: skill.id,
        label: skill.name,
        detail: skill.detail,
        icon: CAT_ICON[cat] ?? "code",
        x: baseX + (si % 2 === 0 ? -28 : 28),
        y: catY + 100 + si * 78,
        prerequisites: resolved.length ? resolved : [catIds[cat]],
        meta: `TIER ${skill.tier}`,
      });
    });
  });

  return nodes;
}
