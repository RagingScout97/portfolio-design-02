"use client";

import { portfolio } from "@/data/portfolio";

export function UplinkPanel() {
  const { profile, socialLinks } = portfolio;

  return (
    <section className="panel-frame p-4 md:p-6">
      <p className="pixel-title text-accent">06 · UPLINK</p>
      <h2 className="pixel-title-lg mt-3 text-ink">Open a channel</h2>
      <p className="mt-3 max-w-lg font-mono text-sm text-ink-muted">
        Reach {profile.name} ({profile.handle}) for collaborations, roles, or
        side quests.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {socialLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-between border-2 border-hairline bg-surface-2 px-4 py-4 hover:border-accent hover:text-accent"
            >
              <span className="pixel-title text-[10px]">{link.name}</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-[11px] text-ink-muted">
        LOCATION · {profile.location.toUpperCase()}
      </p>
    </section>
  );
}
