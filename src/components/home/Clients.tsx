import clients from "../../../content/clients.json";
import { container } from "../ui/styles";

export function Clients({ title }: { title: string }) {
  return (
    <section aria-labelledby="clients-title" className="border-y border-border">
      <div className={`${container} py-8 lg:py-10`}>
        <h2 id="clients-title" className="mb-5 text-center text-xs font-semibold tracking-[0.2em] text-muted">
          {title}
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
          {clients.items.map((name) => (
            <li key={name} className="font-display text-lg font-semibold whitespace-nowrap text-muted uppercase sm:text-xl">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
