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
      <div className="relative z-[1] h-full min-h-0">{children}</div>
    </div>
  );
}
