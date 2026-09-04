"use client";

import { portfolio } from "@/data/portfolio";

export function DeploymentsPanel() {
  return (
    <section className="panel-frame p-5 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
        03 · DEPLOYMENTS
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Campaign Log
      </h2>
      <p className="mt-2 max-w-xl text-ink-muted">
        Experience framed as deployments — objectives completed in the field.
      </p>

      <ol className="mt-8 space-y-6">
        {portfolio.experiences.map((exp, i) => (
          <li
            key={`${exp.company}-${exp.role}`}
            className="relative border border-hairline bg-surface-2/60 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                  CHAPTER {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {exp.role}
                </h3>
                <p className="text-sm text-ink-muted">{exp.company}</p>
              </div>
              <p className="font-mono text-xs text-accent-hot">
                {exp.from} — {exp.to}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.description.map((line) => (
                <li
                  key={line}
                  className="flex gap-2 text-sm leading-relaxed text-ink-muted"
                >
                  <span className="mt-1 text-accent">▹</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
