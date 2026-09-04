/**
 * Wall torch that flanks the outer frame. The flame is two offset
 * flicker cycles plus a halo, so the light never pulses in lockstep.
 */
export function TorchSconce({
  side = "left",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute top-6 z-[3] hidden w-12 md:block ${
        side === "left" ? "left-4 lg:left-7" : "right-4 lg:right-7"
      } ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 48 96" className="h-24 w-12">
        {/* cast light on the wall behind */}
        <ellipse
          className="torch-halo"
          cx="24"
          cy="34"
          rx="21"
          ry="26"
          fill="var(--accent-hot)"
          opacity="0.4"
        />

        {/* flame */}
        <g className="torch-flame">
          <path
            d="M24 8c6 9 11 13 11 21a11 11 0 0 1-22 0c0-8 5-12 11-21Z"
            fill="var(--accent-hot)"
          />
          <path
            d="M24 16c3.5 6 6 9 6 14a6 6 0 0 1-12 0c0-5 2.5-8 6-14Z"
            fill="#ffe9a8"
          />
        </g>
        <g className="torch-flame torch-flame--offset">
          <path
            d="M24 22c2 4 3.5 6 3.5 9a3.5 3.5 0 0 1-7 0c0-3 1.5-5 3.5-9Z"
            fill="#fffdf2"
            opacity="0.9"
          />
        </g>

        {/* bowl and bracket */}
        <path d="M12 40h24l-4 10H16Z" fill="#3a3e42" stroke="#0b0d0f" strokeWidth="2" />
        <rect x="20" y="50" width="8" height="30" fill="#2a2e32" stroke="#0b0d0f" strokeWidth="2" />
        <rect x="14" y="78" width="20" height="8" fill="#4b5157" stroke="#0b0d0f" strokeWidth="2" />
        <rect
          className="gem"
          x="21"
          y="79"
          width="6"
          height="6"
          transform="rotate(45 24 82)"
          fill="var(--accent)"
        />
      </svg>
    </div>
  );
}
