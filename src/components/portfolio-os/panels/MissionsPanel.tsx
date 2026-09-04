"use client";

import { useEffect, useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { KeyHintBar } from "../ui/KeyHintBar";
import { OrnateFrame } from "../ui/OrnateFrame";
import { SectionTitle } from "../ui/SectionTitle";

const STATUS_LABEL = {
  complete: "COMPLETE",
  active: "IN PROGRESS",
  prototype: "IN PROGRESS",
} as const;

const STATUS_COLOR = {
  complete: "text-accent",
  active: "text-accent-hot",
  prototype: "text-accent-hot",
} as const;

const ICONS = ["◆", "◇", "○", "□", "▣", "▸", "▪", "◈"];

function Stars({ n = 3 }: { n?: number }) {
  return (
    <span className="text-gold" aria-label={`${n} stars`}>
      {"★".repeat(n)}
      <span className="text-hairline">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function MissionsPanel() {
  const [activeId, setActiveId] = useState(portfolio.projects[0]?.id);
  const [cursor, setCursor] = useState(0);

  const active = useMemo(
    () =>
      portfolio.projects.find((p) => p.id === activeId) ?? portfolio.projects[0],
    [activeId],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => {
          const next = Math.min(portfolio.projects.length - 1, c + 1);
          setActiveId(portfolio.projects[next].id);
          return next;
        });
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => {
          const next = Math.max(0, c - 1);
          setActiveId(portfolio.projects[next].id);
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const xp = active.status === "complete" ? 1500 : 800;

  return (
    <OrnateFrame className="p-3 md:p-5">
      <SectionTitle>MISSIONS</SectionTitle>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="panel-frame flex max-h-[min(60vh,560px)] flex-col">
          <ul className="panel-scroll flex-1 space-y-1 p-2">
            {portfolio.projects.map((project, i) => {
              const selected = project.id === active.id;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(project.id);
                      setCursor(i);
                    }}
                    className={`flex min-h-11 w-full items-center gap-2 px-2 py-2 text-left ${
                      selected ? "menu-item-active" : "hover:bg-accent/5"
                    }`}
                  >
                    {selected && (
                      <span className="text-accent" aria-hidden>
                        ▶
                      </span>
                    )}
                    <span className="w-6 text-center text-sm" aria-hidden>
                      {ICONS[i % ICONS.length]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="pixel-title truncate text-[9px]">
                        {project.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[9px] text-ink-muted">
                        {project.description.slice(0, 48)}…
                      </p>
                      <Stars n={project.status === "complete" ? 4 : 3} />
                    </div>
                    <span
                      className={`shrink-0 font-mono text-[9px] uppercase ${STATUS_COLOR[project.status]}`}
                    >
                      {STATUS_LABEL[project.status]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t-2 border-hairline px-3 py-2 text-center font-mono text-[10px] text-accent">
            {cursor + 1} / {portfolio.projects.length}
          </div>
        </div>

        <article className="panel-frame flex flex-col p-4">
          <p className="pixel-title text-[8px] text-accent">MISSION BRIEFING</p>
          <div className="mt-3 flex items-start gap-3">
            <span className="text-2xl" aria-hidden>
              {ICONS[cursor % ICONS.length]}
            </span>
            <div>
              <h3 className="pixel-title-lg text-ink">{active.name}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Stars n={active.status === "complete" ? 4 : 3} />
                <span
                  className={`font-mono text-[10px] uppercase ${STATUS_COLOR[active.status]}`}
                >
                  {STATUS_LABEL[active.status]}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-muted md:text-sm">
            {active.description}
          </p>

          <p className="pixel-title mt-5 text-[8px] text-ink-muted">TECH STACK</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {active.techStack.map((tech) => (
              <span
                key={tech}
                className="border-2 border-hairline bg-surface-2 px-2 py-1 font-mono text-[10px] text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="pixel-title mt-5 text-[8px] text-ink-muted">REWARDS</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="panel-frame px-2 py-2 text-center">
              <p className="font-mono text-[10px] text-gold">+{xp} XP</p>
            </div>
            <div className="panel-frame px-2 py-2 text-center">
              <p className="font-mono text-[10px] text-accent">+2 SP</p>
            </div>
            <div className="panel-frame px-2 py-2 text-center">
              <p className="font-mono text-[9px] text-ink-muted">
                {active.techStack.slice(0, 2).join(" · ")}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {active.liveUrl && (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 bg-accent px-4 py-2 font-mono text-[11px] text-canvas hover:bg-ink hover:text-accent"
              >
                OPEN LIVE
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

      <KeyHintBar
        className="mt-4"
        hints={[
          { key: "↑↓", label: "SELECT" },
          { key: "ENTER", label: "OPEN" },
          { key: "ESC", label: "BACK" },
        ]}
      />
    </OrnateFrame>
  );
}
