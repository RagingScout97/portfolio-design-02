import type { ReactNode } from "react";
import { DungeonFrame } from "./DungeonFrame";

export function OrnateFrame({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <DungeonFrame variant="outer" className={className} title={title}>
      {children}
    </DungeonFrame>
  );
}
