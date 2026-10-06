import type { HomeDict } from "@/lib/i18n";
import { Accent } from "../ui/Accent";
import { container, sectionTitle } from "../ui/styles";

type Testimonial = { quote: string; name: string; role: string };

// Haqiqiy otzivlar kelguncha (items bo'sh) blok umuman chizilmaydi.
export function Testimonials({ t }: { t: HomeDict["testimonials"] }) {
  const items: Testimonial[] = t.items;
  if (!items.length) return null;
  return (
    <section className="overflow-hidden py-16 lg:py-24">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        <div>
          <h2 className={sectionTitle}>
            <Accent text={t.title} />
          </h2>
          <div className="mt-10 grid gap-5">
            {items.map((item, i) => (
              <figure key={i} className="border border-border bg-bg p-6 shadow-[0_12px_40px_-20px] shadow-text/25 sm:p-8">
                <span aria-hidden="true" className="block font-display text-6xl leading-[0.6] font-bold text-accent">
                  “
                </span>
                <blockquote className="mt-4 text-lg">{item.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted"> · {item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 inset-y-10 bg-accent [clip-path:polygon(30%_0,100%_0,70%_100%,0_100%)]"
          />
          <div className="absolute inset-6 grid place-items-center bg-subtle text-sm font-semibold tracking-widest text-muted grayscale">
            {t.imagePlaceholder}
          </div>
        </div>
      </div>
    </section>
  );
}
