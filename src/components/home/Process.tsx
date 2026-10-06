import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

export function Process({ t }: { t: HomeDict["process"] }) {
  return (
    <section id="process" className="py-16 lg:py-24">
      <div className={container}>
        <h2 className={sectionTitle}>
          <Accent text={t.title} />
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col rounded-2xl border border-line bg-bg p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {step.tag && (
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-accent">{step.tag}</span>
                )}
              </div>
              <h3 className="mt-5 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
