import { notFound } from "next/navigation";

// /{lang}/<mavjud bo'lmagan yo'l> -> tilga mos 404 sahifasi
export default function CatchAll() {
  notFound();
}
