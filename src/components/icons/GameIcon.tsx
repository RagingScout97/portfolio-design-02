import type { SVGProps } from "react";
import { GAME_ICONS, type GameIconName } from "./generated/paths";

export type { GameIconName };

/**
 * Renders a game-icons.net symbol inline so it inherits `currentColor`
 * and can be glowed or animated with CSS. Extra SVG props pass through,
 * which lets it nest inside another <svg> with x/y/width/height.
 */
export function GameIcon({
  name,
  className = "",
  title,
  ...rest
}: {
  name: GameIconName;
  className?: string;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML">) {
  const icon = GAME_ICONS[name];

  return (
    <svg
      viewBox={icon.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: icon.body }}
      {...rest}
    />
  );
}
