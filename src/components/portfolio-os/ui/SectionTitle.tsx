export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="hidden h-px w-10 bg-gold/60 sm:block" aria-hidden />
      <span className="text-gold/80" aria-hidden>
        ✦
      </span>
      <h2 className="gold-title text-center text-[clamp(14px,2.8vw,22px)]">
        {children}
      </h2>
      <span className="text-gold/80" aria-hidden>
        ✦
      </span>
      <span className="hidden h-px w-10 bg-gold/60 sm:block" aria-hidden />
    </div>
  );
}
