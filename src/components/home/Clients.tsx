import Image from "next/image";
import clients from "../../../content/clients.json";
import { logoImage } from "@/lib/i18n";
import { container } from "../ui/styles";

type Client = string | { name: string; logo?: string };

// Logotiplar bir xil balandlikda, kulrang; hover'da asl rangida. Logosi yo'qlar — Oswald matn.
export function Clients({ title }: { title: string }) {
  const items = (clients.items as Client[]).map((c) => {
    const name = typeof c === "string" ? c : c.name;
    const logo = typeof c === "string" || !c.logo ? null : logoImage(c.logo);
    return { name, logo };
  });

  return (
    <section aria-labelledby="clients-title" className="border-y border-border">
      <div className={`${container} py-8 lg:py-10`}>
        <h2 id="clients-title" className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted">
          {title}
        </h2>
        <ul className="grid grid-cols-3 place-items-center gap-x-4 gap-y-6 md:grid-cols-4 md:gap-y-8 lg:grid-cols-6">
          {items.map(({ name, logo }) => (
            <li key={name} className="flex h-12 items-center justify-center sm:h-14">
              {logo ? (
                <Image
                  src={logo.src}
                  alt={name}
                  width={logo.width}
                  height={logo.height}
                  sizes="160px"
                  className="h-11 w-auto max-w-24 object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12 sm:max-w-36"
                />
              ) : (
                <span className="text-center font-display text-base leading-tight font-semibold text-muted uppercase sm:text-lg sm:whitespace-nowrap">
                  {name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
