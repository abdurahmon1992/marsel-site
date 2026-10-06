"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; title: string; loadingLabel: string; className?: string };

// iframe faqat blok ekranga yaqinlashganda qo'shiladi — sahifa yuklanishiga (Lighthouse) ta'sir qilmaydi.
export function YandexMap({ src, title, loadingLabel, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-bg ${className}`}>
      {visible ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-sm text-muted">{loadingLabel}</span>
      )}
    </div>
  );
}
