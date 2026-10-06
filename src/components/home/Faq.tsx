import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

type FaqItem = { q: string; a: string };
// Javobi bo'sh savollar (tasdiqlanmagan) ko'rsatilmaydi.
export const visibleFaq = (t: HomeDict["faq"]) => (t.items as FaqItem[]).filter((i) => i.a.trim());

export function Faq({ t }: { t: HomeDict["faq"] }) {
  const items = visibleFaq(t);
  if (!items.length) return null;
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <h2 className={sectionTitle}>
          <Accent text={t.title} />
        </h2>
        <div className="border-t border-line">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
