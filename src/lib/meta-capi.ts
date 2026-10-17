import { createHash } from "node:crypto";
import { tracking } from "./site";

// Meta Conversions API — arizani server orqali Meta'ga yuborish.
// Brauzer Pixel'i iPhone/reklama bloklovchilarda yo'qolishi mumkin; server signali yo'qolmaydi.
// Pixel bilan bir xil event_id yuboriladi — Meta ikkalasini bitta ariza deb sanaydi.
// Kalit faqat env'da: META_CAPI_TOKEN (Events Manager → Настройки → Conversions API → маркер доступа).
// Ixtiyoriy: META_TEST_EVENT_CODE (Events Manager → «Тестирование событий» uchun), META_GRAPH_VERSION.

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export type LeadSignal = {
  eventId: string;
  phone: string; // +998XXXXXXXXX
  name: string;
  url: string;
  ip: string;
  userAgent: string;
  fbp?: string;
  fbc?: string;
};

export async function sendLeadToMeta(lead: LeadSignal) {
  const token = process.env.META_CAPI_TOKEN;
  const pixel = tracking.metaPixel;
  if (!token || !pixel) {
    console.warn("meta-capi: META_CAPI_TOKEN yoki pixel yo'q — o'tkazib yuborildi");
    return;
  }

  const firstName = lead.name.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const userData: Record<string, unknown> = {
    ph: [sha256(lead.phone.replace(/\D/g, ""))],
    country: [sha256("uz")],
    client_user_agent: lead.userAgent,
  };
  if (firstName) userData.fn = [sha256(firstName)];
  if (lead.ip && lead.ip !== "unknown") userData.client_ip_address = lead.ip;
  if (lead.fbp) userData.fbp = lead.fbp;
  if (lead.fbc) userData.fbc = lead.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.url,
        user_data: userData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const version = process.env.META_GRAPH_VERSION || "v23.0";
  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });
    const out = (await res.text()).slice(0, 300);
    if (!res.ok) console.error("meta-capi: xato", res.status, out);
    else console.log("meta-capi: ok", lead.eventId, out);
  } catch (e) {
    console.error("meta-capi: ulanib bo'lmadi", e);
  }
}
