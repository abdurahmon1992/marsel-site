type Props = { className?: string; tone?: "dark" | "light" };

// Belgi: kobalt chat pufakchasi ichida oq o'sish chizig'i va marjon nuqta.
// Ranglar --logo-* tokenlaridan olinadi — sayt palitrasi o'zgarsa ham logotip o'zgarmaydi.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path
        className="fill-logo-mark"
        d="M11 2h18a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H17.5L9 38.5V31.6A9 9 0 0 1 2 23V11a9 9 0 0 1 9-9Z"
      />
      <path
        d="M9.5 23.5 16 17l5 3.5 6.5-7"
        fill="none"
        className="stroke-logo-line"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30.8" cy="10.2" r="3" className="fill-logo-dot" />
    </svg>
  );
}

/** tone="light" — qora fon ustida (oq wordmark). */
export function Logo({ className = "", tone = "dark" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="size-8 shrink-0 sm:size-9" />
      <span
        className={`font-logo text-[1.4rem] leading-none font-bold tracking-tight ${
          tone === "light" ? "text-on-surface" : "text-text"
        }`}
      >
        marsel<span className="text-logo-dot">.</span>
      </span>
    </span>
  );
}
