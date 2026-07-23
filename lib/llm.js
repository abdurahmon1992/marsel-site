// LLM mijozi — Gemini (Google) YOKI Claude (Anthropic).
// Provayder LLM_PROVIDER env orqali tanlanadi: 'gemini' (default) yoki 'claude'.
// Kalitlar faqat env orqali. Webhook faqat generate() ni chaqiradi — provayder
// almashsa ham qolgan kod o'zgarmaydi.
//
//   Gemini: GEMINI_API_KEY, GEMINI_MODEL (default gemini-2.0-flash)
//   Claude: ANTHROPIC_API_KEY, ANTHROPIC_MODEL (default claude-haiku-4-5-20251001)

const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash';
const DEFAULT_CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 1024;

// history: [{ role: 'user'|'model', text: '...' }, ...] — eng eski birinchi.
// Qaytaradi: assistant javob matni (string).
export async function generate(opts) {
  const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();
  if (provider === 'claude' || provider === 'anthropic') {
    return generateClaude(opts);
  }
  return generateGemini(opts);
}

// ---------------------------------------------------------------------------
// Gemini (Google Generative Language API)
// ---------------------------------------------------------------------------
async function generateGemini({ systemPrompt, history = [], userMessage }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY sozlanmagan');
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  const contents = [
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const body = {
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: MAX_TOKENS },
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
    const reason = (cand && cand.finishReason) || 'unknown';
    throw new Error(`Gemini bo'sh javob qaytardi (finishReason: ${reason})`);
  }
  return text;
}

// ---------------------------------------------------------------------------
// Claude (Anthropic Messages API)
// ---------------------------------------------------------------------------
async function generateClaude({ systemPrompt, history = [], userMessage }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY sozlanmagan');
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_CLAUDE_MODEL;

  // Anthropic 'assistant' rolini ishlatadi (Gemini'dagi 'model' emas).
  const messages = [
    ...history.map((m) => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.text,
    })),
    { role: 'user', content: userMessage },
  ];

  const body = { model, max_tokens: MAX_TOKENS, temperature: 0.7, messages };
  if (systemPrompt && systemPrompt.trim()) body.system = systemPrompt;

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const errText = await r.text().catch(() => '');
    throw new Error(`Claude API xatosi (${r.status}): ${errText.slice(0, 300)}`);
  }

  const data = await r.json();
  const blocks = Array.isArray(data.content) ? data.content : [];
  const text = blocks.map((b) => (b.type === 'text' ? b.text : '')).join('').trim();
  if (!text) {
    const reason = data.stop_reason || 'unknown';
    throw new Error(`Claude bo'sh javob qaytardi (stop_reason: ${reason})`);
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
