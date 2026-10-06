import { isValidLocalPhone } from "@/lib/phone";

// POST /api/lead — saytdagi arizani Telegram'ga yuboradi.
// Kalitlar faqat env'da: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.

const LIMIT = 3; // IP bo'yicha daqiqasiga
const WINDOW_MS = 60_000;
// Instansiya xotirasida: serverless'da taxminiy limit (har instansiya alohida hisoblaydi).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return false;
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot to'ldirilgan bo'lsa — bot. Muvaffaqiyat deb javob beramiz, lekin yubormaymiz.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const name = str(body.name, 100);
  const phone = str(body.phone, 20);
  if (!name || !phone.startsWith("+998") || !isValidLocalPhone(phone.slice(4))) {
    return Response.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("lead: TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const utm = body.utm && typeof body.utm === "object" ? (body.utm as Record<string, unknown>) : {};
  const utmLine = Object.entries(utm)
    .map(([k, v]) => `${k.replace("utm_", "")}=${str(v, 200)}`)
    .filter((s) => !s.endsWith("="))
    .join(", ");

  const rows: [string, string][] = [
    ["👤 Ism", name],
    ["📞 Telefon", phone],
    ["🏷 Soha", str(body.niche, 100)],
    ["🔗 Instagram/sayt", str(body.instagram, 200)],
    ["🛠 Xizmat", str(body.service, 80)],
    ["💬 Izoh", str(body.comment, 1000)],
    ["🌐 Til", str(body.lang, 5)],
    ["📄 Sahifa", str(body.page, 200)],
    ["📊 UTM", utmLine],
  ];
  const text = [
    "<b>🔥 Yangi ariza — bepul audit</b>",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `<b>${k}:</b> ${escape(v)}`),
  ].join("\n");

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(4000),
    });
    if (!tg.ok) {
      console.error("lead: Telegram xatosi", tg.status, await tg.text());
      return Response.json({ ok: false, error: "telegram" }, { status: 502 });
    }
  } catch (e) {
    console.error("lead: Telegram'ga ulanib bo'lmadi", e);
    return Response.json({ ok: false, error: "telegram" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
