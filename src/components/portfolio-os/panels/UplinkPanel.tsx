"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { KeyHintBar } from "../ui/KeyHintBar";
import { OrnateFrame } from "../ui/OrnateFrame";
import { SectionTitle } from "../ui/SectionTitle";
import { StatusPill } from "../ui/StatusPill";

const FREQUENCIES = [
  ...portfolio.socialLinks.map((l, i) => ({
    id: `ch-${i + 1}`,
    name: l.name,
    url: l.url,
    ch: `CH-0${i + 1}`,
  })),
  {
    id: "ch-email",
    name: "Email",
    url: "mailto:hello@ragingscout97.in",
    ch: `CH-0${portfolio.socialLinks.length + 1}`,
  },
];

export function UplinkPanel() {
  const { profile } = portfolio;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tuned, setTuned] = useState(0);

  const transmit = () => {
    const body = [
      `From: ${name || "anonymous"}`,
      `Reply-To: ${email || "n/a"}`,
      "",
      message || "(empty message)",
    ].join("\n");
    const subject = encodeURIComponent(`Uplink from ${name || "visitor"}`);
    const mailto = `mailto:hello@ragingscout97.in?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <OrnateFrame className="p-3 md:p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] text-ink-muted">
        <span className="inline-flex items-center gap-1 text-accent">
          ⌠ SIGNAL ·|||||
        </span>
        <span>NODE ID: RAGING-SCOUT-97</span>
      </div>

      <SectionTitle>UPLINK</SectionTitle>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.7fr_1.4fr_0.9fr]">
        {/* Status widgets */}
        <div className="flex flex-row gap-2 lg:flex-col">
          <div className="panel-frame flex-1 p-3 text-center">
            <p className="pixel-title text-[7px] text-ink-muted">UPLINK NODE</p>
            <p className="mt-2 font-mono text-lg text-accent" aria-hidden>
              ⌠⌡
            </p>
          </div>
          <div className="panel-frame flex-1 p-3 text-center">
            <p className="pixel-title text-[7px] text-ink-muted">CHANNEL</p>
            <p className="mt-2 font-mono text-lg text-accent" aria-hidden>
              [#]
            </p>
            <p className="mt-1 font-mono text-[9px] text-accent">ENCRYPTED</p>
          </div>
          <div className="panel-frame flex-1 p-3 text-center">
            <p className="pixel-title text-[7px] text-ink-muted">DATA STREAM</p>
            <p className="mt-2 font-mono text-[10px] text-ok">STABLE</p>
            <p className="font-mono text-[9px] text-ink-muted">PING 37ms</p>
          </div>
        </div>

        {/* Terminal */}
        <div className="panel-frame flex flex-col border-accent/30 p-3 md:p-4">
          <div className="mb-3 flex justify-center">
            <StatusPill label="CHANNEL OPEN" tone="ok" />
          </div>
          <div className="flex-1 bg-canvas/80 p-3 font-mono text-[10px] leading-relaxed text-accent md:text-[11px]">
            <p className="text-ink-muted">
              &gt;&gt; {profile.handle.toUpperCase()} UPLINK TERMINAL v1.0 &lt;&lt;
            </p>
            <p className="mt-2 text-ink-muted">Establish connection...</p>
            <p className="text-ink-muted">Initializing secure channel...</p>
            <p className="text-ok">Link verified.</p>
            <p className="mt-2 text-ink">
              You are now connected to {profile.handle.toUpperCase()}.
            </p>
            <p className="text-ink-muted">Please transmit your message.</p>

            <label className="mt-4 block text-ink">
              &gt; NAME:{" "}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border-b border-accent/40 bg-transparent px-1 py-1 text-ink outline-none focus:border-accent"
                autoComplete="name"
              />
            </label>
            <label className="mt-3 block text-ink">
              &gt; EMAIL:{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border-b border-accent/40 bg-transparent px-1 py-1 text-ink outline-none focus:border-accent"
                autoComplete="email"
              />
            </label>
            <label className="mt-3 block text-ink">
              &gt; MESSAGE:{" "}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mt-1 w-full resize-none border border-accent/30 bg-transparent px-2 py-1 text-ink outline-none focus:border-accent"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={transmit}
            className="mt-3 min-h-11 border-2 border-accent bg-accent/15 px-4 font-mono text-[12px] text-accent hover:bg-accent hover:text-canvas"
          >
            TRANSMIT
          </button>
        </div>

        {/* Frequencies */}
        <div className="panel-frame p-3">
          <p className="pixel-title text-center text-[8px] text-gold">
            — FREQUENCIES —
          </p>
          <ul className="mt-3 space-y-2">
            {FREQUENCIES.map((f, i) => {
              const active = i === tuned;
              return (
                <li key={f.id}>
                  <a
                    href={f.url}
                    target={f.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onFocus={() => setTuned(i)}
                    onMouseEnter={() => setTuned(i)}
                    className={`flex items-center gap-2 border-2 px-2 py-2 ${
                      active
                        ? "border-accent bg-accent/10"
                        : "border-hairline hover:border-accent/40"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 ${active ? "bg-accent" : "border border-hairline"}`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="pixel-title text-[8px] text-ink">{f.name}</p>
                      <p className="truncate font-mono text-[9px] text-ink-muted">
                        {f.url.replace(/^https?:\/\//, "")}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] text-accent">{f.ch}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 font-mono text-[9px] leading-relaxed text-ink-muted">
            TUNE TO A FREQUENCY to establish contact.
          </p>
        </div>
      </div>

      <KeyHintBar
        className="mt-4"
        hints={[
          { key: "ENTER", label: "TRANSMIT" },
          { key: "ESC", label: "DISCONNECT" },
        ]}
      />
    </OrnateFrame>
  );
}
