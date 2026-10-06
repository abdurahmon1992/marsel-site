"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { CloseIcon, MenuIcon } from "./icons";

type Props = {
  items: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  children?: ReactNode; // til almashtirgich
};

export function MobileNav({ items, openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        className="grid size-10 place-items-center rounded-[10px] text-text hover:bg-surface"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-soft"
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-lg font-semibold text-text hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-line px-2 pt-4 pb-2 md:hidden">{children}</div>
        </nav>
      </div>
    </div>
  );
}
