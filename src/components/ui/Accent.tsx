import { Fragment } from "react";

/**
 * Kontentdagi belgilashni chizadi: *so'z* -> accent rangda, "\n" -> yangi qator.
 * Masalan: "Instagram’ingiz chiroyli.\n*Endi sotsin.*"
 */
export function Accent({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(/(\*[^*]+\*)/g).map((part, j) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={j} className="text-accent">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={j}>{part}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

/** Meta teglar va aria uchun belgilarsiz matn. */
export const plain = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");
