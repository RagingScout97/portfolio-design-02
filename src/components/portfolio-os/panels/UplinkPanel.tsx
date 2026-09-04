"use client";

import { portfolio } from "@/data/portfolio";

export function UplinkPanel() {
  const { profile, socialLinks } = portfolio;

  return (
    <section className="panel-frame p-5 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
        06 · UPLINK
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
        Open a channel
      </h2>
      <p className="mt-3 max-w-lg text-ink-muted">
        Reach {profile.name} ({profile.handle}) for collaborations, roles, or
        side quests.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {socialLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-hairline bg-surface-2/40 px-4 py-4 transition hover:border-accent hover:text-accent"
            >
              <span className="font-display text-xl font-semibold">{link.name}</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-ink-muted">
        LOCATION · {profile.location.toUpperCase()}
      </p>
    </section>
  );
}
