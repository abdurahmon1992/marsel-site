# Sprint 2 — AI assistent boti (bilim bazasi + system prompt + Gemini)

**Maqsad:** Telegram'da ishlaydigan AI assistent bot yaratish. Bot bizning
bilim bazamiz va biz yozgan ko'rsatma (system prompt) asosida javob beradi.
Provayder sifatida **Google Gemini API** ishlatiladi.

Bu Sprint 1'dagi login botidan **mustaqil**: assistent uchun BotFather'da
alohida bot ochiladi, u har qanday foydalanuvchiga ochiq.

---

## Bajarilgan ishlar

- [x] Bilim bazasi (knowledge base) — `kb_entries` jadvali + CRUD API
      (`/api/admin/kb`)
- [x] System prompt sozlamasi — `bot_config` jadvali + API (`/api/admin/config`)
- [x] Boshqaruv paneli UI — `admin.html` (egaga himoyalangan)
- [x] Suhbat tarixi konteksti — `assistant_messages` jadvali (oxirgi 10 xabar)
- [x] LLM mijozi — `lib/llm.js` (Gemini yoki Claude, `LLM_PROVIDER` orqali)
- [x] Assistent bot webhook — `POST /api/assistant/webhook`
- [x] Webhook ro'yxatga oluvchi — `GET /api/assistant/set-webhook`

### Qismlar → kodga moslik (slayd bo'yicha)
| Vazifa | Fayl |
| --- | --- |
| 1. Bilim bazasini to'ldirish | `admin.html` + `api/admin/kb.js` + `kb_entries` |
| 2. System prompt orqali sozlash | `admin.html` + `api/admin/config.js` + `bot_config` |
| 3. Gemini/Claude API'ni ulash | `lib/llm.js` |
| 4. Telegram'da javob berish | `api/assistant/webhook.js` |

---

## Qanday ishlaydi

1. Foydalanuvchi assistent botiga Telegram'da xabar yozadi.
2. `api/assistant/webhook.js`:
   - `bot_config`'dan **system prompt**ni,
   - `kb_entries`'dan **bilim bazasi**ni,
   - shu chat uchun **oxirgi 10 xabar**ni oladi;
   - system prompt + bilim bazasini birlashtirib, Gemini'ga yuboradi;
   - javobni foydalanuvchiga qaytaradi va suhbat tarixiga yozadi.
3. Egasi `/admin.html` orqali bilim bazasi va system prompt'ni istalgan vaqtda
   yangilaydi — o'zgarish darhol kuchga kiradi (deploy shart emas).

> **Xavfsizlik eslatmasi:** `/api/*` yo'llari Edge middleware bilan
> himoyalanmagan. Shuning uchun `/api/admin/*` endpointlari sessiyani o'zi
> tekshiradi (`lib/authGuard.js` → `requireOwner`): faqat `ALLOWED_TELEGRAM_ID`
> egasi kirishi mumkin. `admin.html` esa oddiy sahifa bo'lgani uchun
> middleware avtomatik himoyalaydi.

---

## Sozlash (bir martalik)

### 1. Assistent bot yaratish
BotFather (`@BotFather`) da **yangi** bot oching (`/newbot`) va tokenni oling.
Bu login botidan alohida bot bo'lishi kerak.

### 2. LLM provayder kaliti
- **Gemini** (default): https://aistudio.google.com/app/apikey — kalit yarating
  (bepul tarif bor).
- **Claude**: https://console.anthropic.com — API kalit yarating.

### 3. Vercel Environment Variables
Sprint 1 o'zgaruvchilariga qo'shimcha:

| O'zgaruvchi | Izoh |
| --- | --- |
| `ASSISTANT_BOT_TOKEN` | Assistent botining BotFather tokeni |
| `ASSISTANT_WEBHOOK_SECRET` | Tasodifiy satr (`openssl rand -hex 16`) |
| `LLM_PROVIDER` | `gemini` (default) yoki `claude` |
| `GEMINI_API_KEY` | Gemini tanlansa — Google AI Studio kaliti |
| `GEMINI_MODEL` | Ixtiyoriy, default `gemini-2.0-flash` |
| `ANTHROPIC_API_KEY` | Claude tanlansa — Anthropic kaliti |
| `ANTHROPIC_MODEL` | Ixtiyoriy, default `claude-haiku-4-5-20251001` |

> Provayderni almashtirish: `LLM_PROVIDER` ni `claude` ga o'zgartiring va mos
> kalitni kiriting. Kod o'zgartirish shart emas — qayta deploy kifoya.

### 4. Webhookni ro'yxatdan o'tkazish
Deploy tugagach, brauzerda bir marta oching:
```
https://<domen>/api/assistant/set-webhook?secret=<SETUP_SECRET>
```
Javobda `"ok": true` ko'rinsa — assistent bot ulandi.

### 5. Bilim bazasi va system prompt'ni kiritish
Saytga egangiz sifatida kiring (Telegram login), so'ng `/admin.html` sahifasini
oching. System prompt va bilim bazasi yozuvlarini kiriting.

---

## Sinash

1. Assistent botga Telegram'da `/start` yozing — tanishtiruv javobi keladi.
2. Bilim bazasidagi biror ma'lumot bo'yicha savol bering — bot shu asosda javob
   berishi kerak.
3. Bilim bazasida bo'lmagan narsani so'rang — bot buni ochiq aytishi kerak
   (system prompt shunga ko'ra sozlangan bo'lsa).

---

## Keyingi mumkin bo'lgan yaxshilanishlar
- [ ] Bilim bazasi bo'yicha embedding/semantik qidiruv (hozir barcha yozuvlar
      to'liq yuboriladi — juda katta bo'lganda bo'lib yuborish kerak bo'ladi)
- [ ] Suhbat tarixini vaqti-vaqti bilan tozalash (retention)
- [ ] Rasm/hujjatlarni qabul qilish
