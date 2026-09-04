import Image from "next/image";

/** Decorative side pieces for the title screen — cropped from design refs */

export function LionCrest({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Image
        src="/game-ui/sprites/lion-crest.png"
        alt=""
        width={180}
        height={260}
        className="pixel-sprite h-auto w-28 md:w-36"
        unoptimized
      />
      <div className="panel-frame-thin px-2 py-2 text-center">
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
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Image
        src="/game-ui/sprites/castle-crest.png"
        alt=""
        width={180}
        height={260}
        className="pixel-sprite h-auto w-28 md:w-36"
        unoptimized
      />
      <div className="panel-frame-thin px-2 py-2 text-center">
        <p className="pixel-title text-[7px] leading-relaxed text-ink-muted">
          BUILD · SOLVE
          <br />
          LEVEL UP
        </p>
      </div>
    </div>
  );
}
