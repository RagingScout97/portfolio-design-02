/**
 * Backdrop of offset stone courses. Drawn as an SVG pattern so the
 * masonry stays crisp at any zoom and the mortar lines can stagger
 * per course, which pure CSS gradients cannot do.
 */
export function DungeonWall({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="dungeon-bricks"
          width="128"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <rect width="128" height="64" fill="#0b0d0e" />

          {/* upper course */}
          <rect x="1" y="1" width="61" height="29" fill="#1e2327" />
          <rect x="66" y="1" width="61" height="29" fill="#1a1e22" />
          {/* lower course, offset by half a block */}
          <rect x="-31" y="34" width="61" height="29" fill="#1b2024" />
          <rect x="33" y="34" width="61" height="29" fill="#212629" />
          <rect x="97" y="34" width="61" height="29" fill="#1b2024" />

          {/* lit top lip of each block */}
          <path
            d="M1 1.5H62M66 1.5H127M-31 34.5H30M33 34.5H94M97 34.5H158"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="2"
          />
          {/* pitted stone speckle */}
          <path
            d="M14 12h2v2h-2zM44 20h2v2h-2zM78 9h2v2h-2zM104 22h2v2h-2zM52 45h2v2h-2zM8 52h2v2h-2zM88 48h2v2h-2z"
            fill="rgba(0,0,0,0.5)"
          />
        </pattern>

        <radialGradient id="dungeon-vignette" cx="50%" cy="42%" r="78%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="58%" stopColor="#000" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#dungeon-bricks)" />
      <rect width="100%" height="100%" fill="url(#dungeon-vignette)" />
    </svg>
  );
}
