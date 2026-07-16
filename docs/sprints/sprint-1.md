# Sprint 1 — Telegram avtorizatsiyasi va backend asosi

**Maqsad:** Saytga faqat egasi (bitta Telegram foydalanuvchi) kira olishini
ta'minlash. Telegram bot + deep-link metodi orqali avtorizatsiya va serverless
backend asosini o'rnatish.

---

## Sprint 1 — 1-qism (ushbu yetkazma)

### Bajarilgan ishlar
- [x] Serverless backend asosi (`/api`) + Neon Postgres ulanishi (`lib/db.js`)
- [x] Telegram **deep-link** avtorizatsiya oqimi:
  - `POST /api/auth/start` — vaqtinchalik token + `t.me/<bot>?start=<token>` havolasi
  - `POST /api/telegram/webhook` — bot xabarini qabul qiladi, `from.id` ni
    ruxsat etilgan ID bilan solishtiradi
  - `GET /api/auth/poll` — token tasdiqlanganda imzolangan sessiya cookie beradi
  - `POST /api/auth/logout` — sessiyani tugatadi
- [x] JWT (jose) asosidagi sessiya boshqaruvi (`lib/session.js`)
- [x] Edge **middleware** — butun saytni yopadi, sessiyasiz foydalanuvchini
  `/login.html` ga yo'naltiradi
- [x] Kirish sahifasi (`login.html`) — mustaqil, Telegram tugmasi bilan
- [x] `/api/telegram/set-webhook` — webhookni ro'yxatdan o'tkazuvchi yordamchi
- [x] Maxfiy kalitlar faqat env orqali (`.env.example` hujjatlashtirilgan)

### Ruxsat modeli
- Ruxsat etilgan yagona foydalanuvchi: `ALLOWED_TELEGRAM_ID` (default `5946966965`)
- Boshqa har qanday Telegram ID → `rejected`, saytga kira olmaydi.

---

## Sozlash (bir martalik)

### 1. Telegram bot
BotFather (`@BotFather`) da bot yarating (`/newbot`), token va username oling.

### 2. Vercel Environment Variables
Vercel → Project → Settings → Environment Variables ga quyidagilarni kiriting:

| O'zgaruvchi | Izoh |
| --- | --- |
| `DATABASE_URL` | Neon Postgres ulanishi (Neon integratsiyasi avtomatik qo'shadi) |
| `TELEGRAM_BOT_TOKEN` | BotFather tokeni |
| `TELEGRAM_BOT_USERNAME` | Bot username (@ siz) |
| `ALLOWED_TELEGRAM_ID` | `5946966965` |
| `SESSION_SECRET` | `openssl rand -hex 32` |
| `TELEGRAM_WEBHOOK_SECRET` | tasodifiy satr |
| `SETUP_SECRET` | tasodifiy satr |

### 3. Webhookni ro'yxatdan o'tkazish
Deploy tugagach, brauzerda bir marta oching:
```
https://<domen>/api/telegram/set-webhook?secret=<SETUP_SECRET>
```
Javobda `"ok": true` ko'rinsa — webhook ulandi.

---

## Sprint 1 — keyingi qismlar (rejalashtirilgan)
- [ ] 2-qism: Sessiya davomiyligi, "logout" tugmasi UI'da, kirish jurnali
- [ ] 3-qism: Bir nechta ruxsat etilgan foydalanuvchilar / rollar
- [ ] Testlar va xatoliklarni kuzatish (monitoring)

---

## Xavfsizlik eslatmalari
- Hech qanday token/parol repozitoriyga yozilmaydi — barchasi Vercel env'da.
- Webhook `X-Telegram-Bot-Api-Secret-Token` header orqali himoyalangan.
- Sessiya cookie: `HttpOnly`, `Secure`, `SameSite=Lax`, 7 kun.
- Login tokenlari bir martalik va 10 daqiqada eskiradi.
