"use client";

import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function DossierPanel() {
  const { profile, education } = portfolio;

  return (
    <section className="panel-frame p-4 md:p-6">
      <p className="pixel-title text-accent">01 · DOSSIER</p>
      <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
        {profile.photoUrl && (
          <div className="relative h-32 w-32 overflow-hidden border-4 border-hairline md:h-40 md:w-40">
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>
        )}
        <div>
          <h2 className="pixel-title-lg text-ink">{profile.name}</h2>
          <p className="mt-3 font-mono text-sm text-accent-hot">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-ink-muted">
            {profile.about}
          </p>
        </div>
      </div>

      <div className="mt-8 border-t-2 border-hairline pt-5">
        <h3 className="pixel-title text-[8px] text-ink-muted">EDUCATION LOG</h3>
        <ul className="mt-4 space-y-3">
          {education.map((ed) => (
            <li
              key={`${ed.degree}-${ed.institute}`}
              className="border-l-4 border-accent pl-4"
            >
              <p className="pixel-title text-[9px] text-ink">{ed.degree}</p>
              <p className="mt-1 font-mono text-sm text-ink-muted">
                {ed.institute}
              </p>
              <span className="font-mono text-xs text-accent">{ed.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
