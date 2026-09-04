function TitleGem() {
  return (
    <span
      className="gem inline-block h-2.5 w-2.5 rotate-45 bg-accent"
      aria-hidden
    />
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="hidden h-0.5 w-12 bg-gradient-to-r from-transparent to-gold/70 sm:block"
        aria-hidden
      />
      <TitleGem />
      <h2 className="dungeon-title text-center text-[clamp(26px,5vw,44px)]">
        {children}
      </h2>
      <TitleGem />
      <span
        className="hidden h-0.5 w-12 bg-gradient-to-l from-transparent to-gold/70 sm:block"
        aria-hidden
      />
    </div>
  );
}
