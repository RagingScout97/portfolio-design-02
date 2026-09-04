export function PixelBanner({
  icon,
  side = "left",
}: {
  icon: "sword" | "crosshair" | "trophy" | "pad" | "star" | "tree";
  side?: "left" | "right";
}) {
  const glyphs: Record<typeof icon, string> = {
    sword: "⚔",
    crosshair: "⌖",
    trophy: "♛",
    pad: "▣",
    star: "★",
    tree: "☘",
  };

  return (
    <div
      className={`pointer-events-none absolute top-0 z-[1] hidden w-10 flex-col items-center md:flex ${
        side === "left" ? "left-3 lg:left-6" : "right-3 lg:right-6"
      }`}
      aria-hidden
    >
      <div className="h-3 w-8 border-x-2 border-t-2 border-gold/40 bg-stone" />
      <div className="flex h-20 w-8 items-center justify-center border-2 border-hairline bg-surface text-accent shadow-[inset_0_0_8px_rgba(82,217,236,0.15)]">
        <span className="text-lg leading-none">{glyphs[icon]}</span>
      </div>
    </div>
  );
}
