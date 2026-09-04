/** CSS/SVG decorative side pieces for the title screen */

export function LionCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 96 112"
        className="pixel h-28 w-24 text-stone-light md:h-36 md:w-32"
        aria-hidden
      >
        <path
          fill="#2a2e32"
          stroke="#5a5e62"
          strokeWidth="3"
          d="M48 8 L84 28 L84 72 L48 104 L12 72 L12 28 Z"
        />
        <path
          fill="none"
          stroke="#52d9ec"
          strokeWidth="1.5"
          opacity="0.5"
          d="M48 16 L76 32 L76 68 L48 94 L20 68 L20 32 Z"
        />
        {/* stylized lion head */}
        <ellipse cx="48" cy="52" rx="18" ry="20" fill="#3a3e42" stroke="#6a6e72" strokeWidth="2" />
        <path
          d="M30 48 Q24 40 28 34 M66 48 Q72 40 68 34"
          fill="none"
          stroke="#6a6e72"
          strokeWidth="2"
        />
        <circle cx="42" cy="50" r="2.5" fill="#52d9ec" />
        <circle cx="54" cy="50" r="2.5" fill="#52d9ec" />
        <path d="M44 58 Q48 62 52 58" fill="none" stroke="#8a8e92" strokeWidth="1.5" />
        <path d="M48 40 L46 46 L50 46 Z" fill="#e8c45a" />
      </svg>
      <div className="panel-frame px-2 py-2 text-center">
        <p className="pixel-title text-[7px] leading-relaxed text-ink-muted">
          CODE · ARCHITECT
          <br />
          PLAYER
        </p>
      </div>
    </div>
  );
}

export function CastleCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 96 112"
        className="pixel h-28 w-24 text-stone-light md:h-36 md:w-32"
        aria-hidden
      >
        <rect x="8" y="8" width="80" height="96" fill="#1a1c1e" stroke="#5a5e62" strokeWidth="3" />
        {/* towers */}
        <rect x="18" y="40" width="18" height="52" fill="#2a2e32" stroke="#4a4e52" strokeWidth="2" />
        <rect x="39" y="28" width="18" height="64" fill="#2e3236" stroke="#5a5e62" strokeWidth="2" />
        <rect x="60" y="40" width="18" height="52" fill="#2a2e32" stroke="#4a4e52" strokeWidth="2" />
        <rect x="20" y="32" width="6" height="8" fill="#3a3e42" />
        <rect x="28" y="32" width="6" height="8" fill="#3a3e42" />
        <rect x="41" y="20" width="6" height="8" fill="#3a3e42" />
        <rect x="49" y="20" width="6" height="8" fill="#3a3e42" />
        <rect x="62" y="32" width="6" height="8" fill="#3a3e42" />
        <rect x="70" y="32" width="6" height="8" fill="#3a3e42" />
        {/* windows */}
        <rect x="23" y="52" width="8" height="10" fill="#52d9ec" opacity="0.7" />
        <rect x="44" y="44" width="8" height="12" fill="#52d9ec" opacity="0.85" />
        <rect x="65" y="52" width="8" height="10" fill="#52d9ec" opacity="0.7" />
        <rect x="44" y="70" width="8" height="14" fill="#0a0b0c" stroke="#52d9ec" strokeWidth="1" />
        {/* flag */}
        <line x1="48" y1="12" x2="48" y2="20" stroke="#e8c45a" strokeWidth="2" />
        <path d="M48 12 L62 16 L48 20 Z" fill="#52d9ec" />
      </svg>
      <div className="panel-frame px-2 py-2 text-center">
        <p className="pixel-title text-[7px] leading-relaxed text-ink-muted">
          BUILD · SOLVE
          <br />
          LEVEL UP
        </p>
      </div>
    </div>
  );
}
