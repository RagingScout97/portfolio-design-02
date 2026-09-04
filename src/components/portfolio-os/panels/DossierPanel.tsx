"use client";

import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function DossierPanel() {
  const { profile, education } = portfolio;

  return (
    <section className="panel-frame p-5 md:p-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-accent">
        01 · DOSSIER
      </p>
      <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
        {profile.photoUrl && (
          <div className="relative h-36 w-36 overflow-hidden border border-hairline md:h-44 md:w-44">
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="176px"
              priority
            />
          </div>
        )}
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {profile.name}
          </h2>
          <p className="mt-2 font-mono text-sm tracking-[0.16em] text-accent-hot">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            {profile.about}
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-hairline pt-6">
        <h3 className="font-mono text-[11px] tracking-[0.24em] text-ink-muted">
          EDUCATION LOG
        </h3>
        <ul className="mt-4 space-y-3">
          {education.map((ed) => (
            <li
              key={`${ed.degree}-${ed.institute}`}
              className="flex flex-col gap-1 border-l-2 border-accent/40 pl-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <p className="font-display text-lg font-semibold">{ed.degree}</p>
                <p className="text-sm text-ink-muted">{ed.institute}</p>
              </div>
              <span className="font-mono text-xs text-accent">{ed.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
