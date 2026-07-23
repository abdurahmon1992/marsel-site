// Gemini (Google Generative Language API) mijozi.
// Kalit faqat env orqali: GEMINI_API_KEY. Model: GEMINI_MODEL (default flash).
//
// Provayderni almashtirmoqchi bo'lsangiz — faqat shu fayldagi generate()
// funksiyasini o'zgartiring; qolgan kod (webhook) uni chaqiradi.

const DEFAULT_MODEL = 'gemini-2.0-flash';

// history: [{ role: 'user'|'model', text: '...' }, ...] — eng eski birinchi.
// Qaytaradi: assistant javob matni (string).
export async function generate({ systemPrompt, history = [], userMessage }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY sozlanmagan');
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const contents = [
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const body = {
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  };
  if (systemPrompt && systemPrompt.trim()) {
    body.system_instruction = { parts: [{ text: systemPrompt }] };
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const errText = await r.text().catch(() => '');
    throw new Error(`Gemini API xatosi (${r.status}): ${errText.slice(0, 300)}`);
  }

  const data = await r.json();
  const cand = data.candidates && data.candidates[0];
  const parts = cand && cand.content && cand.content.parts;
  const text = parts && parts.map((p) => p.text || '').join('').trim();
  if (!text) {
    // Xavfsizlik filtri yoki bo'sh javob holati.
    const reason = (cand && cand.finishReason) || 'unknown';
    throw new Error(`Gemini bo'sh javob qaytardi (finishReason: ${reason})`);
  }
  return text;
}

// Bilim bazasi yozuvlarini system prompt uchun matn blokiga aylantiradi.
export function buildKnowledgeBlock(entries) {
  if (!entries || entries.length === 0) return '';
  const items = entries
    .map((e, i) => `${i + 1}. ${e.title}\n${e.content}`)
    .join('\n\n');
  return (
    'Quyida bilim bazasi ma\'lumotlari keltirilgan. Foydalanuvchi savoliga ' +
    'ana shu ma\'lumotlar asosida javob ber. Agar javob bu yerda bo\'lmasa, ' +
    'buni ochiq ayt va o\'ylab topma.\n\n=== BILIM BAZASI ===\n' + items
  );
}
