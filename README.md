# MarSel Marketing — agentlik sayti

Kichik va o‘rta biznes egasini **bepul marketing auditga** yozilishga olib
keladigan sayt. Ariza Telegram'ga tushadi.

- Stek: **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, hosting — **Vercel**.
- Tillar: `/uz` (asosiy), `/ru`, `/en`.
- Bu branch (`agency-site`) shaxsiy CV saytidan (`claude/personal-website-plan-bbxqkz`) butunlay alohida.

## Ishga tushirish

```bash
npm ci
cp .env.example .env.local   # qiymatlarni to'ldiring (1-bosqichda shart emas)
npm run dev                  # http://localhost:3000  ->  /uz ga yo'naltiradi
npm run build && npm start   # production build tekshiruvi
npm run lint
```

Node.js 20.9+ kerak.

## Tuzilma

```
content/                  MATNLAR — kodga tegmasdan tahrirlanadi
  contacts.json           telefon, email, ijtimoiy tarmoqlar, Yandex xarita (tilsiz)
  clients.json            mijozlar lentasi (matnli logotiplar)
  pricing.json            paket narxlari va reklama byudjeti (USD) — bitta joyda
  uz|ru|en/common.json    header, footer, forma matnlari, 404, sahifa title/description
  uz|ru|en/home.json      bosh sahifa bloklari (hero, muammolar, xizmatlar, paket tarkibi, FAQ...)
  uz|ru|en/cases.json     keyslar (bosh sahifada "featured": true bo'lgani chiqadi)
src/app/[lang]/           sahifalar (har biri 3 tilda statik generatsiya qilinadi)
src/app/api/lead/         POST /api/lead — ariza -> Telegram
src/app/globals.css       TOKENLAR (ranglar, shriftlar)
src/components/home/      bosh sahifa bloklari
src/components/           Header, Footer, Logo, LeadForm, til almashtirgich
src/proxy.ts              tilsiz manzillarni (/, /cases) /uz/... ga yo'naltiradi
```

## Matnni tahrirlash

1. Kerakli tilning faylini oching, masalan `content/uz/home.json`.
2. Faqat qo‘shtirnoq ichidagi matnni o‘zgartiring, kalitlarni (chap tomon) o‘zgartirmang.
3. Sarlavhada `*yulduzcha*` ichidagi so‘zlar qizil (accent) rangda chiqadi, `\n` — yangi qator.
4. Uchala tildagi fayl **bir xil tuzilmada** bo‘lishi shart — kalit yetishmasa, build xato beradi.
5. O‘zbekcha imlo: `o‘`, `g‘` — U+2018 (‘) belgisi bilan; tutuq belgisi — ’ (U+2019).
6. Commit + push → Vercel avtomatik qayta deploy qiladi.

**Narxni o‘zgartirish:** `content/pricing.json` dagi `price` / `adBudgetFrom`.
Paket tarkibi (post, Reels soni) — har tilning `home.json` → `pricing.features`.

Aniqlanmagan ma'lumotlar matnda `[TASDIQLASH]`, rasm o‘rinlari `[RASM]` deb belgilangan.

## Ranglar va shriftlar

Hex qiymatlar faqat `src/app/globals.css` (`:root`) da va CSS ishlamaydigan joylar
(favicon, OG rasm) uchun `src/lib/tokens.ts` da. Komponentlar faqat
`bg-surface`, `text-accent`, `text-muted` kabi semantik sinflardan foydalanadi.

Hozir **referens palitrasi** faol (`<html data-palette="ref">`):

| Token | Referens (faol) | C brend |
|---|---|---|
| `--bg` | #FFFFFF | #FFFFFF |
| `--text` | #111111 | #0E1330 Siyoh |
| `--surface` (katta kartalar) | #1C1C1C | #0E1330 Siyoh |
| `--accent` | #DC2F2A qizil | #2346FF Kobalt |
| `--accent-2` | = accent | #FF5A4E Marjon |
| `--subtle` (och fon) | text 5% | #F2F4FA Tuman |

**C brend palitrasiga qaytish:** `src/app/[lang]/layout.tsx` da `data-palette="ref"` ni
`data-palette="c"` ga almashtiring — boshqa hech narsa o‘zgarmaydi.
Logotip ranglari (`--logo-*`) palitradan qat'i nazar o‘zgarmaydi.

Shriftlar: **Oswald** (sarlavha, raqamlar — lotin + kirill), **DM Sans** (matn; kirill
glifi **Onest** dan), **Sora** — faqat "marsel." wordmark uchun.

## Ariza formasi

Forma `POST /api/lead` ga yuboradi, u Telegram Bot API `sendMessage` orqali
`TELEGRAM_CHAT_ID` chatiga xabar jo‘natadi (ism, telefon, Instagram, xizmat/paket, til,
sahifa, UTM). Himoya: honeypot maydon + IP bo‘yicha daqiqasiga 3 ta ariza.
Xatoda foydalanuvchiga Telegram havolasi ko‘rsatiladi. Env sozlanmagan bo‘lsa API 503 qaytaradi.

## Muhit o‘zgaruvchilari

Ro‘yxat va izohlar — `.env.example`. Tokenlar faqat Vercel'da saqlanadi.
