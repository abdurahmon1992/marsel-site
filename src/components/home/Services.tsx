import type { HomeDict } from "@/lib/i18n";
import { SelectService } from "../SelectService";
import { Accent } from "../ui/Accent";
import { cardContainer, darkCard, sectionTitle } from "../ui/styles";

export function Services({ t }: { t: HomeDict["services"] }) {
  return (
    <section id="services" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={darkCard}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className={sectionTitle}>
              <Accent text={t.title} />
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.items.map((s) => (
                <li key={s.id} className="border border-surface-border px-3 py-1.5 text-sm text-on-surface-muted">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          <ul className="divide-y divide-surface-border border-y border-surface-border">
            {t.items.map((s) => (
              <li key={s.id} className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="flex items-center gap-3 text-2xl uppercase sm:text-3xl">
                    <span aria-hidden="true" className="size-2.5 shrink-0 bg-accent" />
                    {s.name}
                  </h3>
                  <SelectService
                    value={s.name}
                    source={`service_${s.id}`}
                    className="mt-1 shrink-0 text-sm font-semibold whitespace-nowrap text-on-surface underline-offset-4 hover:text-accent hover:underline"
                  >
                    {t.labels.more} →
                  </SelectService>
                </div>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
                  <dt className="text-on-surface-muted">{t.labels.for}</dt>
                  <dd>{s.for}</dd>
                  <dt className="text-on-surface-muted">{t.labels.includes}</dt>
                  <dd>{s.includes}</dd>
                  <dt className="text-on-surface-muted">{t.labels.result}</dt>
                  <dd>{s.result}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-8 border-t border-surface-border pt-10 md:grid-cols-2 lg:mt-16">
          {t.columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-xl uppercase">{c.title}</h3>
              <p className="mt-3 text-on-surface-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
