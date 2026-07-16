# Onlayn rezyume — Abdurahmon Abdurahmonov

Marketing direktori (CMO) lavozimiga nomzod uchun onlayn rezyume sayti.
Kontent foydalanuvchining haqiqiy CV'siga (hh.uz eksporti) asoslangan.
Frontend oddiy HTML/CSS/JS; backend esa Vercel serverless funksiyalari va
Neon Postgres asosida ishlaydi.

## Imkoniyatlar

- **Uch til** — o'zbek / rus / ingliz (UZ/RU/EN), tanlov `localStorage` da saqlanadi.
- **Qorong'i rejim (dark mode)** — tizim sozlamasini avtomatik aniqlaydi, navigatsiyadagi
  🌙/☀️ tugmasi orqali qo'lda ham almashtiriladi.
- **PDF/chop etish** — hero'dagi "PDF yuklab olish" tugmasi brauzerning chop etish
  oynasini ochadi (chop etish uchun alohida `@media print` uslublari bor).
- **"Raqamlarda"** — hero ostida asosiy ko'rsatkichlar chizig'i.
- **SEO** — Open Graph / Twitter meta teglari, JSON-LD (`Person`), favicon va `robots.txt`.
- **Skroll bo'yicha faol navigatsiya** — joriy bo'lim navigatsiyada yoritiladi.

## Kirish himoyasi (Telegram avtorizatsiyasi)

Sayt **Telegram deep-link** avtorizatsiyasi bilan himoyalangan — unga faqat
ruxsat etilgan yagona Telegram foydalanuvchi kira oladi. To'liq oqim, sozlash
va env o'zgaruvchilari `docs/sprints/sprint-1.md` da hujjatlashtirilgan.

Muhim: barcha maxfiy kalitlar (bot tokeni, DB paroli, sessiya siri) faqat
Vercel Environment Variables da saqlanadi — repozitoriyda emas. Ishga tushirishdan
oldin Vercel'da env o'zgaruvchilarni kiritish shart, aks holda sayt qulflangan
holatda (faqat login sahifasi) qoladi.

## Tuzilma

```
index.html          Bosh sahifa: Men haqimda, Mehnat faoliyatim, Ta'lim,
                     Kasbiy yo'nalishlar, Ko'nikmalar va tillar, Yutuqlarim,
                     Blog, Tavsiyalar, Bog'lanish
css/style.css        Uslublar
js/i18n.js           uz/ru til almashtirish
js/main.js           Bosh sahifa kontentini data/content.js dan chizadi
js/blog.js           Blog ro'yxati va postni Markdown'dan render qiladi
data/content.js      Bio, tajriba, ta'lim, ko'nikmalar, yutuqlar, tavsiyalar,
                     kontakt ma'lumotlari — barchasi CV'dan olingan real kontent
data/posts.js        Blog postlari ro'yxati (sarlavha, sana, qisqacha tavsif)
blog/index.html      Barcha postlar ro'yxati
blog/post.html        Bitta post sahifasi (?slug=... orqali)
blog/posts/*.md       Post matnlari (Markdown)
assets/img/           Rasmlar (profil surati CV'dan olingan)
```

## Kontentni tahrirlash

1. **Shaxsiy ma'lumotlar, tajriba, ta'lim, ko'nikmalar, yutuqlar, tavsiyalar,
   kontakt** — `data/content.js` faylini oching va yangilang. Har bir matn
   `{ uz: "...", ru: "..." }` shaklida ikkala tilda yozilishi kerak.
2. **Ijtimoiy tarmoq havolalari** — CV'da ijtimoiy tarmoq/LinkedIn havolalari
   ko'rsatilmagan, shuning uchun `data/content.js` dagi `contact.socials`
   ro'yxati bo'sh. O'z profil havolalaringizni shu yerga
   `{ label: "LinkedIn", url: "https://..." }` shaklida qo'shing.
3. **Rasmlar** — profil surati CV'dan olingan holda joylashtirilgan
   (`assets/img/profile.jpg`). Yangilash uchun shu faylni almashtiring.
4. **Yangi blog posti qo'shish**:
   - `blog/posts/` ichiga har til uchun `.md` fayl yozing (faqat post matni):
     `<slug>.md` (uz), `<slug>.ru.md` (ru), `<slug>.en.md` (en).
   - `data/posts.js` ro'yxatiga yangi yozuv qo'shing: `slug`, `title` (uz/ru/en),
     `date`, `excerpt` (uz/ru/en) va `file` obyekti — `{ uz, ru, en }` fayl yo'llari.

   > Eslatma: biror til uchun fayl bo'lmasa, `blog.js` avtomatik ravishda
   > o'zbekcha (`DEFAULT_LANG`) versiyaga qaytadi.

## Lokal ishga tushirish

Fayllarni `fetch()` orqali o'qish (`blog.js`) brauzerlarda `file://` protokoli
bilan ishlamasligi mumkin, shuning uchun oddiy statik server orqali oching:

```bash
python3 -m http.server 8000
```

Keyin brauzerda `http://localhost:8000` manzilini oching.

## GitHub Pages'ga joylashtirish

1. O'zgarishlarni asosiy branch (`main`)ga qo'shing.
2. GitHub'da repozitoriy sozlamalariga o'ting: **Settings → Pages**.
3. **Source** bo'limida **Deploy from a branch** ni tanlang, branch sifatida
   `main` va papka sifatida `/ (root)` ni tanlang, so'ng **Save** tugmasini
   bosing.
4. Bir necha daqiqadan so'ng sayt `https://<username>.github.io/<repo-nomi>/`
   manzilida ochiladi.

Build qadami talab qilinmaydi — sayt to'liq statik fayllardan iborat.
