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
    () =>
      portfolio.projects.find((p) => p.id === activeId) ?? portfolio.projects[0],
    [activeId],
  );

  return (
    <section className="panel-frame p-4 md:p-6">
      <p className="pixel-title text-accent">04 · MISSIONS</p>
      <h2 className="pixel-title-lg mt-3 text-ink">Project Quests</h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <ul className="space-y-2">
          {portfolio.projects.map((project, i) => {
            const selected = project.id === active.id;
            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className={`flex min-h-11 w-full items-center gap-3 border-2 px-3 py-3 text-left ${
                    selected
                      ? "menu-item-active border-accent"
                      : "border-hairline hover:border-accent/40"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pixel-title flex-1 text-[9px]">
                    {project.name}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase ${STATUS_COLOR[project.status]}`}
                  >
                    {project.status}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <article className="border-2 border-hairline bg-surface-2 p-4 md:p-5">
          <p className="pixel-title text-[8px] text-ink-muted">MISSION BRIEF</p>
          <h3 className="pixel-title-lg mt-2 text-ink">{active.name}</h3>
          <p className="mt-3 font-mono text-sm leading-relaxed text-ink-muted">
            {active.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {active.techStack.map((tech) => (
              <span
                key={tech}
                className="border-2 border-hairline px-2 py-1 font-mono text-[10px] text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {active.liveUrl && (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 bg-accent px-4 py-2 font-mono text-[11px] text-canvas hover:bg-ink hover:text-accent"
              >
                LIVE LINK
              </a>
            )}
            {active.githubUrl && (
              <a
                href={active.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 border-2 border-hairline px-4 py-2 font-mono text-[11px] text-ink hover:border-accent hover:text-accent"
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
