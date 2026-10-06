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
};

// 4:3 ramka (aspect bilan o'zgartirish mumkin). fit="contain" — logotiplar uchun: och fonda, kesilmaydi.
// Manba eni ramkadan kichik bo'lsa — och fonda, o'z o'lchamidan kattalashtirilmaydi (scale-down), xiralashmaydi.
export function CaseImage({ image, sizes, frameWidth, className = "", eager = false, aspect = "aspect-[4/3]" }: Props) {
  const tooSmall = !!image.width && image.width < frameWidth;
  const contain = image.fit === "contain" || tooSmall;
  return (
    <div className={`relative ${aspect} overflow-hidden ${contain ? "bg-subtle" : "bg-border"} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={image.fit === "contain" ? "object-contain p-6 sm:p-8" : contain ? "object-scale-down" : "object-cover"}
      />
    </div>
  );
}
