export function KeyHintBar({
  hints,
  className = "",
}: {
  hints: { key: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] text-ink-muted ${className}`}
    >
      {hints.map((h) => (
        <span key={`${h.key}-${h.label}`} className="inline-flex items-center gap-1.5">
          <kbd className="border border-gold/50 bg-surface-2 px-1.5 py-0.5 text-gold">
            {h.key}
          </kbd>
          <span className="uppercase tracking-wider">{h.label}</span>
        </span>
      ))}
    </div>
  );
}
