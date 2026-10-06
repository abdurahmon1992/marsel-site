import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { cardContainer, darkCard, sectionTitle } from "../ui/styles";

export function Problems({ t }: { t: HomeDict["problems"] }) {
  return (
    <section className={`${cardContainer} py-3 lg:py-4`}>
      <div className={`${darkCard} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
        <h2 className={sectionTitle}>
          <Accent text={t.title} />
        </h2>
        <ul className="divide-y divide-surface-border border-y border-surface-border">
          {t.items.map((item, i) => (
            <li key={item} className="flex items-baseline gap-5 py-5 text-lg sm:text-xl">
              <span className="font-display text-2xl leading-none font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
