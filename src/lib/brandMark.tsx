import { tokens } from "./tokens";

// marsel belgisi (OG rasm va ikonkalar uchun; CSS o'zgaruvchilari ishlamaydigan joylar)
export function BrandMarkSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path
        fill={tokens.logoMark}
        d="M11 2h18a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H17.5L9 38.5V31.6A9 9 0 0 1 2 23V11a9 9 0 0 1 9-9Z"
      />
      <path
        d="M9.5 23.5 16 17l5 3.5 6.5-7"
        fill="none"
        stroke={tokens.white}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30.8" cy="10.2" r="3" fill={tokens.logoDot} />
    </svg>
  );
}
