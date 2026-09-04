import { GameIcon, type GameIconName } from "@/components/icons/GameIcon";

/** Stone medallion holding a carved emblem, flanking the title screen. */
function Crest({
  icon,
  lines,
  className = "",
}: {
  icon: GameIconName;
  lines: [string, string];
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative">
        <svg viewBox="0 0 96 112" className="h-28 w-24 md:h-36 md:w-32" aria-hidden>
          <path
            d="M48 4 L88 26 L88 74 L48 108 L8 74 L8 26 Z"
            fill="#1c2024"
            stroke="var(--rim)"
            strokeWidth="4"
          />
          <path
            d="M48 13 L80 31 L80 70 L48 97 L16 70 L16 31 Z"
            fill="none"
            stroke="#0b0d0f"
            strokeWidth="3"
          />
          <path
            d="M48 18 L76 34 L76 68 L48 91 L20 68 L20 34 Z"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            opacity="0.45"
          />
        </svg>

        <GameIcon
          name={icon}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-accent/85 md:h-16 md:w-16"
        />
        <span
          className="gem absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-accent"
          aria-hidden
        />
      </div>

      <div className="panel-frame px-3 py-2 text-center">
        <p className="pixel-title text-[7px] leading-relaxed text-ink-muted">
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </div>
  );
}

export function LionCrest({ className = "" }: { className?: string }) {
  return (
    <Crest icon="lion" lines={["CODE · ARCHITECT", "PLAYER"]} className={className} />
  );
}

export function CastleCrest({ className = "" }: { className?: string }) {
  return (
    <Crest icon="castle" lines={["BUILD · SOLVE", "LEVEL UP"]} className={className} />
  );
}
