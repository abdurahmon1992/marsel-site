// Hero fonidagi qizil to'lqinsimon chiziqlar (dekor).
export function WavyLines({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {lines.map((i) => {
        const y = 90 + i * 40;
        return (
          <path
            key={i}
            d={`M-60 ${y} C 120 ${y - 150}, 280 ${y + 170}, 440 ${y} S 690 ${y - 160}, 860 ${y + 30}`}
            fill="none"
            className="stroke-accent"
            strokeWidth={i % 4 === 0 ? 3 : 1.5}
            strokeOpacity={i % 4 === 0 ? 1 : 0.35 + (i % 3) * 0.15}
          />
        );
      })}
    </svg>
  );
}
