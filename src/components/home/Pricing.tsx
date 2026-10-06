import pricing from "../../../content/pricing.json";
import type { HomeDict } from "@/lib/i18n";
import { SelectService } from "../SelectService";
import { Accent } from "../ui/Accent";
import { cardContainer, darkCard, sectionTitle } from "../ui/styles";

type PlanId = keyof HomeDict["pricing"]["features"];

export function Pricing({ t }: { t: HomeDict["pricing"] }) {
  return (
    <section id="pricing" className={`${cardContainer} py-3 lg:py-4`}>
      <div className={darkCard}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className={sectionTitle}>
            <Accent text={t.title} />
          </h2>
          <p className="max-w-sm text-sm text-on-surface-muted">{t.note}</p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14">
          {pricing.plans.map((plan) => {
            const popular = plan.popular;
            const features = t.features[plan.id as PlanId] ?? [];
            return (
              <li
                key={plan.id}
                className={`relative flex flex-col p-6 sm:p-8 ${
                  popular ? "bg-bg text-text" : "border border-surface-border bg-surface-raised"
                }`}
              >
                {popular && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-on-accent uppercase">
                    {t.popular}
                  </span>
                )}
                <h3 className="text-2xl uppercase">{plan.name}</h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">
                    {pricing.currency}
                    {plan.price}
                  </span>
                  <span className={popular ? "text-muted" : "text-on-surface-muted"}>{t.perMonth}</span>
                </p>
                <p className={`mt-2 text-sm ${popular ? "text-muted" : "text-on-surface-muted"}`}>
                  {t.adBudget.replace("{amount}", `${pricing.currency}${plan.adBudgetFrom}`)}
                </p>
                <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${popular ? "border-border" : "border-surface-border"}`}>
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-2 shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <SelectService
                  value={plan.name}
                  source={`pricing_${plan.id}`}
                  className={`mt-8 inline-flex h-12 items-center justify-center text-sm font-semibold tracking-wide uppercase transition-colors ${
                    popular
                      ? "bg-accent text-on-accent hover:bg-accent-hover"
                      : "border border-on-surface text-on-surface hover:bg-on-surface hover:text-surface"
                  }`}
                >
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
