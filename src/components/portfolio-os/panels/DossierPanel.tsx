"use client";

import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { KeyHintBar } from "../ui/KeyHintBar";
import { OrnateFrame } from "../ui/OrnateFrame";
import { PixelBanner } from "../ui/PixelBanner";
import { SectionTitle } from "../ui/SectionTitle";

const STATS = [
  { label: "FOCUS (PROBLEM SOLVING)", value: 82 },
  { label: "SPEED (ADAPTABILITY)", value: 88 },
  { label: "RELIABILITY (DELIVERY)", value: 90 },
];

const TRAITS = [
  { id: "code", label: "CODE", icon: "</>" },
  { id: "arch", label: "ARCHITECT", icon: "♜" },
  { id: "player", label: "PLAYER", icon: "▣" },
];

export function DossierPanel() {
  const { profile } = portfolio;

  return (
    <OrnateFrame className="p-3 md:p-5">
      <PixelBanner icon="sword" side="left" />
      <PixelBanner icon="tree" side="right" />

      <SectionTitle>DOSSIER</SectionTitle>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_auto]">
        {/* Portrait */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[220px]">
            <div
              className="pointer-events-none absolute inset-0 z-[2] pixel-sprite"
              style={{
                borderStyle: "solid",
                borderWidth: 14,
                borderColor: "transparent",
                borderImageSource:
                  "url(/game-ui/dark-dwellers/portrait-frame-remapped.png)",
                borderImageSlice: "18 fill",
                borderImageWidth: 14,
                borderImageRepeat: "stretch",
              }}
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
              {profile.photoUrl ? (
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="220px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-canvas text-ink-muted">
                  <span className="pixel-title text-accent">97</span>
                </div>
              )}
              <span className="absolute bottom-3 right-3 z-[3] border border-accent bg-canvas/80 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                97
              </span>
            </div>
          </div>
          <p className="mt-3 text-center pixel-title text-[8px] leading-relaxed text-ink">
            {profile.name.toUpperCase()}
          </p>
          <p className="mt-1 text-center pixel-title text-[7px] text-accent">
            {profile.handle.toUpperCase()}
          </p>
          <p className="mt-1 font-mono text-[10px] text-accent">
            {profile.location.split(",")[0].toUpperCase()}
          </p>
        </div>

        {/* Status + Bio */}
        <div className="space-y-4">
          <div className="panel-frame p-3 md:p-4">
            <p className="pixel-title text-[8px] text-ink-muted">STATUS</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs text-ink">
                CLASS ·{" "}
                <span className="text-accent">{profile.role.toUpperCase()}</span>
              </p>
              <span className="inline-flex items-center gap-1 border border-gold/50 px-2 py-0.5 font-mono text-[10px] text-gold">
                LV <strong className="text-ink">97</strong>
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {STATS.map((s) => (
                <li key={s.label}>
                  <div className="mb-1 flex justify-between font-mono text-[9px] text-ink-muted">
                    <span>{s.label}</span>
                    <span className="text-accent">
                      {s.value} / 100
                    </span>
                  </div>
                  <div className="stat-bar">
                    <span style={{ width: `${s.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-frame p-3 md:p-4">
            <p className="pixel-title text-[8px] text-ink-muted">BIO</p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink md:text-sm">
              {profile.about}
            </p>
            <p className="mt-3 font-mono text-[10px] text-accent-hot">
              Always learning. Always shipping. Always leveling up.
            </p>
          </div>
        </div>

        {/* Side plaques */}
        <div className="flex flex-row justify-center gap-2 lg:flex-col lg:justify-start">
          {[
            { label: "EXP", value: "42,650" },
            { label: "GIT", value: "∞" },
            { label: "UPTIME", value: "99.9%" },
          ].map((p) => (
            <div
              key={p.label}
              className="panel-frame min-w-[5.5rem] px-3 py-3 text-center"
            >
              <p className="pixel-title text-[7px] text-ink-muted">{p.label}</p>
              <p className="mt-1 font-mono text-sm text-accent">{p.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="pixel-title mb-2 text-center text-[8px] text-ink-muted">
          TRAITS
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TRAITS.map((t) => (
            <div
              key={t.id}
              className="panel-frame flex flex-col items-center gap-1 px-2 py-3"
            >
              <span className="font-mono text-sm text-accent">{t.icon}</span>
              <span className="pixel-title text-[7px] text-ink">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <KeyHintBar
        className="mt-4"
        hints={[{ key: "ESC", label: "BACK" }]}
      />
    </OrnateFrame>
  );
}
