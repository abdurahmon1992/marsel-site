import Image from "next/image";
import clients from "../../../content/clients.json";
import { logoImage } from "@/lib/i18n";
import { container, eyebrow } from "../ui/styles";

type Client = string | { name: string; logo?: string };

// Logotiplar bir xil balandlikda, kulrang (opacity .6); hover'da asl rangida.
export function Clients({ title }: { title: string }) {
  const items = (clients.items as Client[]).map((c) => {
    const name = typeof c === "string" ? c : c.name;
    const logo = typeof c === "string" || !c.logo ? null : logoImage(c.logo);
    return { name, logo };
  });

  return (
    <section aria-labelledby="clients-title" className="border-y border-line">
      <div className={`${container} py-8 lg:py-10`}>
        <h2 id="clients-title" className={`mb-6 text-center ${eyebrow}`}>
          {title}
        </h2>
        <ul className="grid grid-cols-3 place-items-center gap-x-3 gap-y-6 sm:gap-x-6 lg:grid-cols-9 lg:gap-x-6">
          {items.map(({ name, logo }) => (
            <li key={name} className="flex h-12 w-full items-center justify-center sm:h-14">
              {logo ? (
                <Image
                  src={logo.src}
                  alt={name}
                  width={logo.width}
                  height={logo.height}
                  sizes="160px"
                  className="h-9 w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12 sm:max-w-36"
                />
              ) : (
                <span className="text-center text-sm leading-tight font-semibold text-muted sm:text-base">{name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
