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
content/                 MATNLAR — kodga tegmasdan tahrirlanadi
  contacts.json          telefon, email, ijtimoiy tarmoqlar, Yandex xarita (tilsiz)
  uz|ru|en/common.json   header, footer, 404, sahifa title/description
  uz|ru|en/home.json     bosh sahifa bloklari
src/app/[lang]/          sahifalar (har biri 3 tilda statik generatsiya qilinadi)
src/app/globals.css      BREND TOKENLARI (ranglar, shriftlar)
src/components/          Header, Footer, Logo, til almashtirgich
src/lib/                 i18n, hreflang/canonical, tokenlar
src/proxy.ts             tilsiz manzillarni (/, /cases) /uz/... ga yo'naltiradi
```

## Matnni tahrirlash

1. Kerakli tilning faylini oching, masalan `content/uz/home.json`.
2. Faqat qo‘shtirnoq ichidagi matnni o‘zgartiring, kalitlarni (chap tomon) o‘zgartirmang.
3. Uchala tildagi fayl **bir xil tuzilmada** bo‘lishi shart — kalit yetishmasa, build xato beradi.
4. O‘zbekcha imlo: `o‘`, `g‘` — U+2018 (‘) belgisi bilan; tutuq belgisi — ’ (U+2019).
5. Commit + push → Vercel avtomatik qayta deploy qiladi.

Aniqlanmagan ma'lumotlar matnda `[TASDIQLASH]` deb belgilanadi — ularni
tasdiqlangan qiymatga almashtiring.

## Ranglar va shriftlar

Hex qiymatlar faqat `src/app/globals.css` (`:root`) da va CSS ishlamaydigan joylar
(favicon, OG rasm) uchun `src/lib/tokens.ts` da. Komponentlar faqat
`bg-accent`, `text-muted`, `bg-surface` kabi sinflardan foydalanadi.

| Token | Qiymat | Nomi |
|---|---|---|
| `--accent` | #2346FF | Kobalt |
| `--accent-2` | #FF5A4E | Marjon |
| `--text` | #0E1330 | Siyoh |
| `--surface` | #F2F4FA | Tuman |
| `--bg` | #FFFFFF | Oq |
| `--muted`, `--border` | `--text` va `--bg` aralashmasi | — |

Shriftlar: **Sora** (sarlavha, raqam), **DM Sans** (matn). Ikkalasida ham kirill
harflari yo‘q, shuning uchun `/ru` da kirill glifi avtomatik ravishda **Manrope** /
**Onest** dan olinadi (faqat kirill matn bo‘lgan sahifada yuklanadi).

## Muhit o‘zgaruvchilari

Ro‘yxat va izohlar — `.env.example`. Tokenlar faqat Vercel'da saqlanadi.
