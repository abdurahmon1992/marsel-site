import Link from "next/link";
import { Accent } from "./ui/Accent";
import { container } from "./ui/styles";

type Props = { title: string; intro?: string; back?: { href: string; label: string }; eyebrow?: string };

export function PageHeader({ title, intro, back, eyebrow }: Props) {
  return (
    <header className={`${container} pt-12 pb-10 lg:pt-20 lg:pb-14`}>
      {back && (
        <Link href={back.href} className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
          ← {back.label}
        </Link>
      )}
      {eyebrow && <p className="mt-6 text-xs font-semibold tracking-[0.08em] text-muted uppercase">{eyebrow}</p>}
      <h1 className={`max-w-4xl text-[2rem] break-words hyphens-auto sm:text-4xl lg:text-5xl ${back || eyebrow ? "mt-3" : ""}`}>
        <Accent text={title} />
      </h1>
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
    </header>
  );
}
