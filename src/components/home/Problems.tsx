import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { cardContainer, panel, sectionTitle } from "../ui/styles";

export function Problems({ t }: { t: HomeDict["problems"] }) {
  return (
    <section className={`${cardContainer} py-3 lg:py-4`}>
      <div className={`${panel} grid gap-8 lg:grid-cols-2 lg:gap-16`}>
        <h2 className={sectionTitle}>
          <Accent text={t.title} />
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {t.items.map((item, i) => (
            <li key={item} className="flex items-baseline gap-4 py-4 text-base sm:text-lg">
              <span className="text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
