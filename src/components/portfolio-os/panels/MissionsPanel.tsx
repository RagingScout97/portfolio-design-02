"use client";

import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";

const STATUS_COLOR = {
  complete: "text-ok",
  active: "text-accent",
  prototype: "text-accent-hot",
} as const;

export function MissionsPanel() {
  const [activeId, setActiveId] = useState(portfolio.projects[0]?.id);
  const active = useMemo(
    () => portfolio.projects.find((p) => p.id === activeId) ?? portfolio.projects[0],
    [activeId],
  );

  return (
    <section className="panel-frame p-5 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
        04 · MISSIONS
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Project Quests
      </h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ul className="space-y-2">
          {portfolio.projects.map((project, i) => {
            const selected = project.id === active.id;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className={`flex w-full items-center gap-3 border px-3 py-3 text-left transition ${
                    selected
                      ? "menu-item-active border-accent/40"
                      : "border-hairline hover:border-accent/30"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold">
                    {project.name}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${STATUS_COLOR[project.status]}`}
                  >
                    {project.status}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <article className="border border-hairline bg-surface-2/50 p-5 md:p-6">
          <p className="font-mono text-[10px] tracking-[0.22em] text-ink-muted">
            MISSION BRIEF
          </p>
          <h3 className="mt-2 font-display text-3xl font-bold">{active.name}</h3>
          <p className="mt-4 leading-relaxed text-ink-muted">
            {active.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-hairline px-2 py-1 font-mono text-[10px] tracking-wider text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {active.liveUrl && (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-canvas transition hover:bg-accent"
              >
                LIVE LINK
              </a>
            )}
            {active.githubUrl && (
              <a
                href={active.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-hairline px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-ink transition hover:border-accent hover:text-accent"
              >
                SOURCE
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
