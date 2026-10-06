import Image from "next/image";
import type { CaseImage as Img } from "@/lib/i18n";

type Props = {
  image: Img;
  sizes: string;
  /** Ramkaning desktopdagi taxminiy eni (CSS px). Manba undan tor bo'lsa — cho'zilib xiralashmasin, contain. */
  frameWidth: number;
  className?: string;
  eager?: boolean;
  aspect?: string;
  /** Kartochka ichida (chetma-chet) — o'z radiusisiz */
  flush?: boolean;
};

// 4:3 ramka (aspect bilan o'zgartirish mumkin). fit="contain" — logotiplar uchun: och fonda, kesilmaydi.
// Manba eni ramkadan kichik bo'lsa — och fonda, o'z o'lchamidan kattalashtirilmaydi (scale-down), xiralashmaydi.
export function CaseImage({ image, sizes, frameWidth, className = "", eager = false, aspect = "aspect-[4/3]", flush = false }: Props) {
  const tooSmall = !!image.width && image.width < frameWidth;
  const contain = image.fit === "contain" || tooSmall;
  const bg = image.bg === "dark" ? "bg-media-dark" : contain ? "bg-surface" : "bg-line";
  // wide: asl nisbatda (kesilmaydi), ramka nisbati rasm o'lchamidan olinadi
  const ratio = image.wide && image.width && image.height ? { aspectRatio: `${image.width} / ${image.height}` } : undefined;
  return (
    <div style={ratio} className={`relative ${ratio ? "" : aspect} overflow-hidden ${flush ? "" : "rounded-2xl"} ${bg} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={image.fit === "contain" ? `object-contain ${image.bg === "dark" ? "" : "p-6 sm:p-8"}` : contain ? "object-scale-down" : "object-cover"}
      />
    </div>
  );
}
