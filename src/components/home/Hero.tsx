import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { btnPrimary, container, eyebrow, textLink } from "../ui/styles";
import { SelectService } from "../SelectService";
import { WavyLines } from "./WavyLines";

export function Hero({ t }: { t: HomeDict["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <WavyLines className="pointer-events-none absolute -top-16 -right-48 h-[320px] w-[620px] [mask-image:linear-gradient(to_left,black_50%,transparent)] lg:top-0 lg:-right-24 lg:h-full lg:w-[55%]" />
      <div className={`${container} relative pt-32 pb-14 sm:pt-36 lg:pt-24 lg:pb-20`}>
        <p className={`animate-rise mb-5 ${eyebrow}`}>{t.eyebrow}</p>
        <h1 className="animate-rise max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
          <Accent text={t.title} highlight />
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-base text-muted [animation-delay:60ms] sm:text-lg">{t.subtitle}</p>
        <div className="animate-rise mt-8 flex flex-col gap-4 [animation-delay:120ms] sm:flex-row sm:items-center sm:gap-6">
          <SelectService source="hero" className={`${btnPrimary} h-13 px-7`}>
            {t.primary}
          </SelectService>
          <a href="#cases" className={`${textLink} text-[15px]`}>
            {t.secondary} →
          </a>
        </div>

        <dl className="mt-14 grid max-w-3xl gap-3 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-row-reverse items-baseline justify-end gap-3 sm:flex-col-reverse sm:items-start sm:gap-0">
              <dt className="text-sm text-muted sm:mt-1">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight whitespace-nowrap text-accent sm:text-[1.75rem]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
