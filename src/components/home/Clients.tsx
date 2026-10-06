import Image from "next/image";
import clients from "../../../content/clients.json";
import { logoImage } from "@/lib/i18n";
import { container } from "../ui/styles";

type Client = string | { name: string; logo?: string };

export function Clients({ title }: { title: string }) {
  const items = (clients.items as Client[]).map((c) => {
    const name = typeof c === "string" ? c : c.name;
    const logo = typeof c === "string" || !c.logo ? null : logoImage(c.logo);
    return { name, logo };
  });

  return (
    <section aria-labelledby="clients-title" className="border-y border-border">
      <div className={`${container} py-8 lg:py-10`}>
        <h2 id="clients-title" className="mb-5 text-center text-xs font-semibold tracking-[0.2em] text-muted">
          {title}
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-10">
          {items.map(({ name, logo }) => (
            <li
              key={name}
              className="flex items-center gap-2 font-display text-lg font-semibold whitespace-nowrap text-muted uppercase sm:text-xl"
            >
              {logo && (
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className="size-9 object-contain grayscale"
                />
              )}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
