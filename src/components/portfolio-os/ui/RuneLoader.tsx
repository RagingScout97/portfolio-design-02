/**
 * Counter-rotating rune rings around a pulsing core — the boot screen's
 * "something is working" indicator. Progress drives the outer arc so the
 * ring doubles as a readout instead of spinning decoratively.
 */
const OUTER_RUNES = ["ᚠ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ"];
const INNER_RUNES = ["ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ"];

function RuneRing({
  runes,
  radius,
  className,
}: {
  runes: string[];
  radius: number;
  className: string;
}) {
  return (
    <g className={className}>
      {runes.map((rune, i) => {
        const angle = (i / runes.length) * Math.PI * 2 - Math.PI / 2;
        // Rounded so server and client serialize identical coordinates.
        return (
          <text
            key={rune}
            x={Number((80 + Math.cos(angle) * radius).toFixed(2))}
            y={Number((80 + Math.sin(angle) * radius).toFixed(2))}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={radius > 52 ? 11 : 9}
            fill="currentColor"
          >
            {rune}
          </text>
        );
      })}
    </g>
  );
}

export function RuneLoader({
  progress,
  className = "",
}: {
  /** 0–100; drives the outer arc sweep. */
  progress: number;
  className?: string;
}) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const swept = circumference * (Math.min(100, Math.max(0, progress)) / 100);

  return (
    <svg
      viewBox="0 0 160 160"
      className={`h-36 w-36 md:h-44 md:w-44 ${className}`}
      aria-hidden
    >
      {/* seat */}
      <circle cx="80" cy="80" r={radius} fill="#0a0b0c" stroke="#3a3e42" strokeWidth="4" />

      {/* progress arc */}
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="butt"
        strokeDasharray={`${swept} ${circumference}`}
        transform="rotate(-90 80 80)"
        opacity="0.9"
      />

      <RuneRing runes={OUTER_RUNES} radius={55} className="rune-ring text-accent/70" />
      <circle cx="80" cy="80" r="42" fill="none" stroke="#2e3236" strokeWidth="2" />
      <RuneRing
        runes={INNER_RUNES}
        radius={32}
        className="rune-ring rune-ring--inner text-gold/70"
      />

      <g className="rune-core">
        <circle cx="80" cy="80" r="16" fill="#0d1417" stroke="var(--accent)" strokeWidth="2" />
        <rect
          x="72"
          y="72"
          width="16"
          height="16"
          transform="rotate(45 80 80)"
          fill="var(--accent)"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
