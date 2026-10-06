import pricing from "../../../content/pricing.json";
import type { HomeDict } from "@/lib/i18n";
import { SelectService } from "../SelectService";
import { Accent } from "../ui/Accent";
import { btnPrimary, btnSecondary, cardContainer, dot, panel, sectionTitle } from "../ui/styles";

type PlanId = keyof HomeDict["pricing"]["features"];

export function Pricing({ t }: { t: HomeDict["pricing"] }) {
  return (
    <section id="pricing" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={panel}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className={sectionTitle}>
            <Accent text={t.title} />
          </h2>
          <p className="max-w-sm text-sm text-muted">{t.note}</p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
          {pricing.plans.map((plan) => {
            const popular = plan.popular;
            const features = t.features[plan.id as PlanId] ?? [];
            return (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-bg p-6 sm:p-7 ${
                  popular ? "border-[1.5px] border-accent" : "border border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg">{plan.name}</h3>
                  {popular && (
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-accent">{t.popular}</span>
                  )}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {pricing.currency}
                    {plan.price}
                  </span>
                  <span className="text-muted">{t.perMonth}</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t.adBudget.replace("{amount}", `${pricing.currency}${plan.adBudgetFrom}`)}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-[15px]">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span aria-hidden="true" className={dot} />
                      {f}
                    </li>
                  ))}
                </ul>
                <SelectService value={plan.name} source={`pricing_${plan.id}`} className={`mt-8 w-full ${popular ? btnPrimary : btnSecondary}`}>
                  {t.cta}
                </SelectService>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
