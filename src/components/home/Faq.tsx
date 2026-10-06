import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

export function Faq({ t }: { t: HomeDict["faq"] }) {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <h2 className={sectionTitle}>
          <Accent text={t.title} />
        </h2>
        <div className="border-t-2 border-text">
          {t.items.map((item) => (
            <details key={item.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center bg-subtle text-xl leading-none transition-transform group-open:rotate-45 group-open:bg-accent group-open:text-on-accent"
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
