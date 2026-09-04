import Image from "next/image";

export function PixelBanner({
  icon,
  side = "left",
}: {
  icon: "sword" | "crosshair" | "trophy" | "pad" | "star" | "tree";
  side?: "left" | "right";
}) {
  const src =
    side === "left"
      ? "/game-ui/sprites/banner-left.png"
      : "/game-ui/sprites/banner-right.png";

  return (
    <div
      className={`pointer-events-none absolute top-2 z-[1] hidden md:block ${
        side === "left" ? "left-2 lg:left-4" : "right-2 lg:right-4"
      }`}
      aria-hidden
      title={icon}
    >
      <Image
        src={src}
        alt=""
        width={56}
        height={128}
        className="pixel-sprite h-28 w-auto opacity-95"
        unoptimized
      />
    </div>
  );
}
