type Props = { className?: string; withWordmark?: boolean };

// Belgi: kobalt chat pufakchasi ichida oq o'sish chizig'i va marjon nuqta.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path
        className="fill-accent"
        d="M11 2h18a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H17.5L9 38.5V31.6A9 9 0 0 1 2 23V11a9 9 0 0 1 9-9Z"
      />
      <path
        d="M9.5 23.5 16 17l5 3.5 6.5-7"
        fill="none"
        className="stroke-on-accent"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30.8" cy="10.2" r="3" className="fill-accent-2" />
    </svg>
  );
}

export function Logo({ className = "", withWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="size-8 shrink-0 sm:size-9" />
      {withWordmark && (
        <span className="font-display text-[1.4rem] leading-none font-bold tracking-tight text-text">
          marsel<span className="text-accent-2">.</span>
        </span>
      )}
    </span>
  );
}
