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
  uz|ru|en/cases.json     keyslar (Oldin -> Nima qildik -> Natija), /cases va bosh sahifa
  uz|ru|en/privacy.json   maxfiylik siyosati matni
src/app/[lang]/(site)/    asosiy sayt: bosh sahifa, /cases, /cases/[slug], /privacy, 404
src/app/[lang]/(landing)/ reklama lendingi /audit (menyusiz header, to'liq forma)
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

**Keyslar** (`content/<til>/cases.json`): har keysda `kind` (`numeric` — bosh sahifada
raqamli kartochka, birinchi 4 tasi; `branding`), `tags` (`/cases` filtri: `smm`, `target`,
`branding`), `result` (katta raqam), `before` / `done` / `metrics`. `branding.name`
to‘ldirilsa, keys bosh sahifadagi «Brending» qatorida chiqadi. Bo‘sh maydonlar (`""`, `[]`)
saytda ko‘rsatilmaydi. Raqamlarni faqat tasdiqlangan manbadan yozing.

**Keys rasmlari:** fayllar `public/cases/` papkasida (`.webp`). `cases.json` da:
`cover` — kartochka muqovasi, `gallery` — keys sahifasidagi galereya, `beforeAfter` — «Oldin / Keyin»
yonma-yon (Peri). Har rasmda `src`, `alt` (har tilning faylida o‘z tilida) va `fit`:
`cover` — 4:3 ramkani to‘ldiradi, `contain` — logotiplar uchun, och fonda kesilmaydi.
Manba eni ramka enidan kichik bo‘lsa (kartochka ~400 px, bosh sahifa ~600 px), `cover` o‘rniga
avtomatik och fonda o‘z o‘lchamida chiqadi — cho‘zilib xiralashmaydi. Sifat uchun ≥ 800 px rasm tavsiya etiladi.
Fayl hali yuklanmagan bo‘lsa, sayt rasmsiz tipografik kartochkani ko‘rsatadi; fayl qo‘shilgach
keyingi deployda rasm avtomatik chiqadi.

**Nishon va maxsus rasmlar:** keysda `badge` (masalan, «Hozir ishlayapmiz») kartochkada va keys
sahifasida qizil nishon bo‘lib chiqadi. Rasmda `"bg": "dark"` — qora fon (qora fonli muqovalar),
`"wide": true` — galereyada to‘liq enda, asl nisbatda. Mijozlar lentasida (`clients.json`)
`{"name": "...", "logo": "/cases/...webp"}` — rasmli logotip.

**Yashirin bloklar:** «Mijozlar fikri» (`home.json → testimonials.items`) va FAQ
(`home.json → faq.items`) bo‘sh bo‘lsa, saytda umuman chiqmaydi. Tasdiqlangan
matnlarni shu ro‘yxatlarga qo‘shing.

**Narxni o‘zgartirish:** `content/pricing.json` dagi `price` / `adBudgetFrom`.
Paket tarkibi (post, Reels soni) — har tilning `home.json` → `pricing.features`.


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
