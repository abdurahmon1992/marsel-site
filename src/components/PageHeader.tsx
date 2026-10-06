import Link from "next/link";
import { Accent } from "./ui/Accent";
import { container } from "./ui/styles";

type Props = { title: string; intro?: string; back?: { href: string; label: string }; eyebrow?: string };

export function PageHeader({ title, intro, back, eyebrow }: Props) {
  return (
    <header className={`${container} pt-12 pb-10 lg:pt-20 lg:pb-14`}>
      {back && (
        <Link href={back.href} className="text-sm font-semibold tracking-wide uppercase hover:text-accent">
          ← {back.label}
        </Link>
      )}
      {eyebrow && <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>}
      <h1 className={`text-4xl break-words hyphens-auto min-[400px]:text-5xl sm:text-6xl lg:text-7xl ${back || eyebrow ? "mt-4" : ""}`}>
        <Accent text={title} />
      </h1>
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
    </header>
  );
}
