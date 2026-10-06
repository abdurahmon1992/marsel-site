import { Fragment } from "react";

/**
 * Kontentdagi belgilashni chizadi: "\n" -> yangi qator, *so'z* -> rangli.
 * Vazminlik uchun rang faqat `highlight` berilgan joylarda (hero va bitta-ikkita bo'lim) —
 * boshqa sarlavhalarda yulduzchalar shunchaki olib tashlanadi.
 */
export function Accent({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(/(\*[^*]+\*)/g).map((part, j) =>
        part.startsWith("*") && part.endsWith("*") ? (
          highlight ? (
            <span key={j} className="text-accent">
              {part.slice(1, -1)}
            </span>
          ) : (
            <Fragment key={j}>{part.slice(1, -1)}</Fragment>
          )
        ) : (
          <Fragment key={j}>{part}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

/** Meta teglar va aria uchun belgilarsiz matn. */
export const plain = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");
