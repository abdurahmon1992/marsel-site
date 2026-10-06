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
        <ol className="mt-10 grid gap-px overflow-hidden border-y-2 border-text bg-border sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-bg py-8 sm:px-6 lg:py-10 lg:first:pl-0">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-6xl leading-none font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.tag && (
                  <span className="bg-text px-2.5 py-1 text-xs font-semibold tracking-wide text-bg uppercase">
                    {step.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-6 text-2xl uppercase">{step.title}</h3>
              <p className="mt-3 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
