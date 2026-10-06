// O'zbekiston raqami: +998 XX XXX XX XX (mahalliy qism — 9 raqam)

/** Kiritilgan matndan mahalliy 9 raqamni ajratadi. */
export function parseLocalPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998") && (raw.trim().startsWith("+") || d.length > 9)) d = d.slice(3);
  return d.slice(0, 9);
}

/** "901234567" -> "+998 90 123 45 67" (qisman kiritilganda ham) */
export function formatLocalPhone(local: string): string {
  if (!local) return "";
  const parts = [local.slice(0, 2), local.slice(2, 5), local.slice(5, 7), local.slice(7, 9)].filter(Boolean);
  return `+998 ${parts.join(" ")}`;
}

export const isValidLocalPhone = (local: string) => /^\d{9}$/.test(local);
