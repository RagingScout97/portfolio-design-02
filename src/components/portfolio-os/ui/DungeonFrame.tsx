import type { ReactNode } from "react";

type Variant = "outer" | "panel" | "inset";
type Corner = "tl" | "tr" | "bl" | "br";

const BASE_CLASS: Record<Variant, string> = {
  outer: "ornate-outer",
  panel: "panel-frame",
  inset: "frame-inset",
};

const CORNER_SIZE: Record<Variant, number> = {
  outer: 34,
  panel: 20,
  inset: 0,
};

/** Stepped stone corner block with a gold inlay and a gem socket. */
function CornerBlock({ size, at }: { size: number; at: Corner }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`dungeon-corner dungeon-corner--${at}`}
      aria-hidden
    >
      <path
        d="M0 0H32V7H16V16H7V32H0Z"
        fill="currentColor"
        stroke="#0b0d0f"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
      <path
        d="M2.5 2.5H30M2.5 2.5V30"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
      />
      <path
        d="M13 4.5H29M4.5 13V29"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <rect
        x="2.5"
        y="2.5"
        width="11"
        height="11"
        transform="rotate(45 8 8)"
        fill="#0a0c0d"
        stroke="#0b0d0f"
        strokeWidth="1.5"
      />
      <rect
        className="gem"
        x="4.5"
        y="4.5"
        width="7"
        height="7"
        transform="rotate(45 8 8)"
        fill="var(--accent)"
      />
    </svg>
  );
}

/** Mid-edge banded plate that breaks up long runs of stone. */
function Cartouche({ side }: { side: "top" | "bottom" }) {
  return (
    <svg
      viewBox="0 0 56 14"
      width={56}
      height={14}
      className={`dungeon-cartouche dungeon-cartouche--${side}`}
      aria-hidden
    >
      <path
        d="M7 0H49L56 7L49 14H7L0 7Z"
        fill="currentColor"
        stroke="#0b0d0f"
        strokeWidth="2"
      />
      <path
        d="M9 3.5H47"
        stroke="var(--gold)"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <rect
        className="gem"
        x="24"
        y="3"
        width="8"
        height="8"
        transform="rotate(45 28 7)"
        fill="var(--accent)"
      />
    </svg>
  );
}

export function DungeonFrame({
  children,
  className = "",
  variant = "panel",
  glow = false,
  title,
  cartouches,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  glow?: boolean;
  /** Renders a carved name plate straddling the top edge. */
  title?: string;
  /** Defaults on for the outer frame, off for inner panels. */
  cartouches?: boolean;
}) {
  const cornerSize = CORNER_SIZE[variant];
  const showCartouches = cartouches ?? variant === "outer";
  const corners: Corner[] = ["tl", "tr", "bl", "br"];

  return (
    <div
      className={`${BASE_CLASS[variant]} ${glow ? "panel-frame-glow" : ""} relative ${className}`}
    >
      {cornerSize > 0 &&
        corners.map((at) => (
          <CornerBlock key={at} size={cornerSize} at={at} />
        ))}

      {showCartouches && (
        <>
          <Cartouche side="top" />
          <Cartouche side="bottom" />
        </>
      )}

      {title && (
        <span className="dungeon-title-plate pixel-title text-[8px] text-gold">
          {title}
        </span>
      )}

      <div className="relative z-[1] h-full min-h-0">{children}</div>
    </div>
  );
}
