import Image from "next/image";
import type { CaseImage as Img } from "@/lib/i18n";

type Props = { image: Img; sizes: string; className?: string; eager?: boolean };

// 4:3 ramka. fit="contain" — logotiplar uchun: och fonda, kesilmaydi.
export function CaseImage({ image, sizes, className = "", eager = false }: Props) {
  const contain = image.fit === "contain";
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${contain ? "bg-subtle" : "bg-border"} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={contain ? "object-contain p-6 sm:p-8" : "object-cover"}
      />
    </div>
  );
}
