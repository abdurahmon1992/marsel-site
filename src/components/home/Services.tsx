import type { HomeDict } from "@/lib/i18n";
import { SelectService } from "../SelectService";
import { Accent } from "../ui/Accent";
import { cardContainer, dot, panel, sectionTitle, textLink } from "../ui/styles";

export function Services({ t }: { t: HomeDict["services"] }) {
  return (
    <section id="services" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={panel}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className={sectionTitle}>
              <Accent text={t.title} />
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.items.map((s) => (
                <li key={s.id} className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-muted">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-3">
            {t.items.map((s) => (
              <li key={s.id} className="rounded-2xl border border-line bg-bg p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="flex items-center gap-3 text-lg sm:text-xl">
                    <span aria-hidden="true" className={dot} />
                    {s.name}
                  </h3>
                  <SelectService value={s.name} source={`service_${s.id}`} className={`mt-0.5 shrink-0 text-sm whitespace-nowrap ${textLink}`}>
                    {t.labels.more} →
                  </SelectService>
                </div>
                <dl className="mt-4 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[8rem_1fr]">
                  <dt className="text-muted">{t.labels.for}</dt>
                  <dd>{s.for}</dd>
                  <dt className="mt-2 text-muted sm:mt-0">{t.labels.includes}</dt>
                  <dd>{s.includes}</dd>
                  <dt className="mt-2 text-muted sm:mt-0">{t.labels.result}</dt>
                  <dd>{s.result}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2 lg:mt-14">
          {t.columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-lg">{c.title}</h3>
              <p className="mt-2 text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
