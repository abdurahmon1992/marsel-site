// Hero fonidagi ingichka kobalt to'lqinlar (dekor, juda och).
export function WavyLines({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {lines.map((i) => {
        const y = 120 + i * 48;
        return (
          <path
            key={i}
            d={`M-60 ${y} C 120 ${y - 140}, 280 ${y + 150}, 440 ${y} S 690 ${y - 150}, 860 ${y + 30}`}
            fill="none"
            className="stroke-accent"
            strokeWidth={1}
            strokeOpacity={i % 3 === 0 ? 0.25 : 0.15}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
