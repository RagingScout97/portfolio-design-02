export function StatusPill({
  label = "ONLINE",
  tone = "ok",
}: {
  label?: string;
  tone?: "ok" | "accent" | "hot";
}) {
  const color =
    tone === "ok"
      ? "text-ok"
      : tone === "hot"
        ? "text-accent-hot"
        : "text-accent";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${color}`}
    >
      <span
        className={`inline-block h-2 w-2 ${
          tone === "ok"
            ? "bg-ok shadow-[0_0_6px_#3dffa8]"
            : tone === "hot"
              ? "bg-accent-hot"
              : "bg-accent shadow-[0_0_6px_#52d9ec]"
        }`}
        aria-hidden
      />
      {label}
    </span>
  );
}
