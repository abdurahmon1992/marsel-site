import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container } from "../ui/styles";
import { SelectService } from "../SelectService";
import { WavyLines } from "./WavyLines";

export function Hero({ t }: { t: HomeDict["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <WavyLines className="pointer-events-none absolute -top-10 -right-40 h-[340px] w-[640px] opacity-40 sm:opacity-60 lg:top-0 lg:-right-24 lg:h-full lg:w-[58%] lg:opacity-100 [mask-image:linear-gradient(to_left,black_55%,transparent)]" />
      <div className={`${container} relative pt-36 pb-14 sm:pt-40 lg:pt-28 lg:pb-24`}>
        <h1 className="max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          <Accent text={t.title} />
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{t.subtitle}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <SelectService
            source="hero"
            className="inline-flex h-14 items-center justify-center bg-accent px-8 text-sm font-semibold tracking-wide text-on-accent uppercase transition-colors hover:bg-accent-hover"
          >
            {t.primary}
          </SelectService>
          <a href="#cases" className="text-sm font-semibold tracking-wide uppercase underline-offset-4 hover:text-accent hover:underline">
            {t.secondary} →
          </a>
        </div>

        <dl className="mt-14 grid max-w-3xl gap-3 border-t border-border pt-6 sm:grid-cols-3 sm:gap-8">
          {t.stats.map((s) => (
            <div key={s.label} className="flex flex-row-reverse items-baseline justify-end gap-3 sm:flex-col-reverse sm:items-start sm:gap-0">
              <dt className="text-sm text-muted sm:mt-1">{s.label}</dt>
              <dd className="font-display text-2xl font-bold whitespace-nowrap sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
