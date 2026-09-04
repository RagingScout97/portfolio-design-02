import type { ReactNode } from "react";

export function OrnateFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ornate-outer relative ${className}`}>
      <span
        className="pointer-events-none absolute bottom-[6px] left-[6px] z-[2] h-2 w-2 bg-accent shadow-[0_0_6px_rgba(82,217,236,0.75)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-[6px] right-[6px] z-[2] h-2 w-2 bg-accent shadow-[0_0_6px_rgba(82,217,236,0.75)]"
        aria-hidden
      />
      <div className="relative z-[1] h-full min-h-0">{children}</div>
    </div>
  );
}
