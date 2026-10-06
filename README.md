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

**Raqamsiz keyslar (strategiya):** `kind: "strategy"` — bosh sahifa kartochkalariga chiqmaydi,
`result.value` da matn (masalan, «Bozor tahlili»). `task` — «Vazifa» bandi («Oldin» o‘rnida), `resultText` —
natija matni, `related` — boshqa keysga havola, `period` — loyiha davri. Bosh sahifadagi «Yirik kompaniyalar»
qatori: `home.json → case.enterprise`.

**Nishon va maxsus rasmlar:** keysda `badge` (masalan, «Hozir ishlayapmiz») kartochkada va keys
sahifasida qizil nishon bo‘lib chiqadi. Rasmda `"bg": "dark"` — qora fon (qora fonli muqovalar),
`"wide": true` — galereyada to‘liq enda, asl nisbatda. Mijozlar lentasida (`clients.json`)
`{"name": "...", "logo": "/logos/<slug>.webp"}` — rasmli logotip (`name` alt matn bo‘ladi; logo
bo‘lmasa nom matn bo‘lib chiqadi). Logotiplar `public/logos/` da: ~240 px balandlik, shaffof fon.

**Yashirin bloklar:** «Mijozlar fikri» (`home.json → testimonials.items`) va FAQ
(`home.json → faq.items`) bo‘sh bo‘lsa, saytda umuman chiqmaydi. Tasdiqlangan
matnlarni shu ro‘yxatlarga qo‘shing.

**Narxni o‘zgartirish:** `content/pricing.json` dagi `price` / `adBudgetFrom`.
Paket tarkibi (post, Reels soni) — har tilning `home.json` → `pricing.features`.


## Ranglar va shriftlar

Sayt va logotip — bitta **C brend** (kobalt + marjon). Kayfiyat: ochiq, yengil, vazmin.
Hex qiymatlar faqat `src/app/globals.css` (`:root`) da va CSS ishlamaydigan joylar (favicon, OG rasm)
uchun `src/lib/tokens.ts` da. Komponentlar faqat `bg-surface`, `text-accent`, `border-line` kabi
semantik sinflardan foydalanadi.

| Token | Qiymat | Qayerda |
|---|---|---|
| `--bg` | #FFFFFF | sahifa foni |
| `--surface` | #F3F5FA | kartochkalar, bo‘lim fonlari |
| `--surface-2` | #EEF2FF | chiplar, nishonlar, forma bloki foni |
| `--line` | #E3E7F1 | chegaralar, ajratgichlar |
| `--text` | #0E1330 | matn; footer foni (saytdagi yagona to‘q blok) |
| `--muted` | #5A6180 | ikkinchi darajali matn |
| `--accent` | #2346FF | tugmalar, havolalar, katta raqamlar |
| `--accent-hover` | #1A36D6 | tugma hover |
| `--accent-2` | #FF5A4E | **faqat dekor** (logodagi nuqta, nishon nuqtasi) — matn/tugma uchun emas |

Kontrast (WCAG AA): accent/oq 6.19, oq matn accent tugmada 6.19, muted/surface 5.57, text/surface 16.7.

**Shrift:** bitta oila — **Manrope** (`next/font`, lotin + kirill): sarlavhalar 600/700 oddiy registrda,
matn 400/500. Ruscha sahifalar ham bir xil ko‘rinadi. **Sora** — faqat "marsel." wordmark uchun.
Sarlavhadagi `*so‘z*` faqat hero, «Natija — raqamda» va audit blokida kobalt rangda chiqadi
(`<Accent highlight />`), boshqa sarlavhalarda oddiy matn.

**Komponentlar:** tugma — radius 10px, 600 vazn, katta harf emas; ikkilamchi tugma — kobalt matn,
1px chegara. Kartochkalar — radius 16px, 1px chegara, deyarli soyasiz. Animatsiya — faqat yengil
paydo bo‘lish (10px, ease-out); `prefers-reduced-motion` da o‘chadi.

## Ariza formasi

Forma `POST /api/lead` ga yuboradi, u Telegram Bot API `sendMessage` orqali
`TELEGRAM_CHAT_ID` chatiga xabar jo‘natadi (ism, telefon, Instagram, xizmat/paket, til,
sahifa, UTM). Himoya: honeypot maydon + IP bo‘yicha daqiqasiga 3 ta ariza.
Xatoda foydalanuvchiga Telegram havolasi ko‘rsatiladi. Env sozlanmagan bo‘lsa API 503 qaytaradi.

## SEO

- Har til uchun alohida `title` / `description` — `content/<til>/common.json → meta` (bosh sahifa) va
  `pages.*` (ichki sahifalar). Keys sahifalari sarlavhasi `cases.json → title/summary` dan olinadi.
- `hreflang` uz / ru / en + `x-default` (= uz), `canonical` — har sahifada avtomatik.
- `sitemap.xml` (barcha sahifalar va keyslar, 3 tilda, hreflang bilan) va `robots.txt` — `src/app/sitemap.ts`,
  `src/app/robots.ts`. Preview deploylar (`VERCEL_ENV=preview`) indekslanmaydi.
- OG rasmlar (1200×630, har til) — `src/app/[lang]/opengraph-image.tsx`, matni `common.json → og`.
  Shrift: `assets/og/` (Manrope va Sora, OFL).
- Favicon va apple-icon — `src/app/icon.tsx`, `src/app/apple-icon.tsx` (marsel belgisi).
- schema.org (JSON-LD): `LocalBusiness` (har sahifada), `Service` ×4 (bosh sahifa, SMM paketlari narxi bilan),
  `CreativeWork` (har keys) — `src/lib/schema.ts`. Manzil va koordinatalar — `content/contacts.json`
  (`geo` taxminiy — Yandex xaritadan aniq qiymatni kiriting).

## Analitika va cookie roziligi

- GA4, Meta Pixel, Yandex Metrika — ID'lar env'da (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
  `NEXT_PUBLIC_YM_ID`). ID bo‘sh bo‘lsa skript yuklanmaydi; hammasi bo‘sh bo‘lsa banner ham chiqmaydi.
- Skriptlar faqat cookie bannerida «Roziman» bosilgandan keyin yuklanadi («Faqat zarur» — yuklanmaydi).
  Tanlov `marsel_consent` cookie'sida (1 yil). Footer'dagi «Cookie sozlamalari» — bannerni qayta ochadi.
- Hodisalar (`src/lib/analytics.ts`): `lead_submit` (Pixel'da standart `Lead`), `cta_click`, `phone_click`,
  `telegram_click`, `lang_switch`. GA4 — `gtag event`, Pixel — `trackCustom`, Metrika — `reachGoal`
  (Metrika'da shu nomlar bilan maqsadlar yarating).
- Yangi elementga hodisa qo‘shish: `data-track="phone_click"` yoki `data-cta="manba-nomi"` atributi.

## Muhit o‘zgaruvchilari

Ro‘yxat va izohlar — `.env.example`. Tokenlar faqat Vercel'da saqlanadi.

| O‘zgaruvchi | Majburiy | Izoh |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ha | asosiy domen (canonical, sitemap, OG, schema) |
| `TELEGRAM_BOT_TOKEN` | ha | @MarSelMarketingBot tokeni |
| `TELEGRAM_CHAT_ID` | ha | arizalar tushadigan chat |
| `NEXT_PUBLIC_GA4_ID` | yo‘q | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | yo‘q | Pixel ID (raqam) |
| `NEXT_PUBLIC_YM_ID` | yo‘q | Metrika hisoblagich raqami |

`NEXT_PUBLIC_*` qiymatlar build vaqtida qo‘shiladi — o‘zgartirgach Vercel'da **Redeploy** qiling.
