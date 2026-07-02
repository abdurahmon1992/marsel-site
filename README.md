# Shaxsiy sayt

Marketing faoliyati uchun shaxsiy portfolio + blog sayti. Build vositalarisiz,
oddiy HTML/CSS/JS asosida qurilgan, GitHub Pages orqali bevosita joylashtirish
mumkin.

## Tuzilma

```
index.html          Bosh sahifa: Men haqimda, Mehnat faoliyatim, Xizmatlar,
                     Loyihalarim, Blog (so'nggi postlar), Bog'lanish
css/style.css        Uslublar
js/i18n.js           uz/ru til almashtirish
js/main.js           Bosh sahifa kontentini data/content.js dan chizadi
js/blog.js           Blog ro'yxati va postni Markdown'dan render qiladi
data/content.js      Bio, tajriba, xizmatlar, loyihalar, kontakt ma'lumotlari
data/posts.js        Blog postlari ro'yxati (sarlavha, sana, qisqacha tavsif)
blog/index.html      Barcha postlar ro'yxati
blog/post.html        Bitta post sahifasi (?slug=... orqali)
blog/posts/*.md       Post matnlari (Markdown)
assets/img/           Rasmlar (profil, loyihalar)
```

## Kontentni tahrirlash

1. **Shaxsiy ma'lumotlar, tajriba, xizmatlar, loyihalar, kontakt** —
   `data/content.js` faylini oching va o'z ma'lumotlaringiz bilan almashtiring.
   Har bir matn `{ uz: "...", ru: "..." }` shaklida ikkala tilda yozilishi kerak.
2. **Rasmlar** — `assets/img/` papkasiga rasmlaringizni qo'shing (talab
   qilinadigan fayl nomlari uchun shu papkadagi `README.md`ga qarang).
3. **Yangi blog posti qo'shish**:
   - `blog/posts/` ichiga yangi `.md` fayl yozing (faqat post matni,
     sarlavha/sana kerak emas — ular ro'yxatda alohida beriladi).
   - `data/posts.js` ro'yxatiga yangi yozuv qo'shing: `slug`, `title` (uz/ru),
     `date`, `excerpt` (uz/ru) va `file` (yozgan `.md` faylga nisbiy yo'l).

   > Eslatma: hozirgi tuzilmada bitta `.md` fayl faqat bitta tilda matn
   > saqlaydi (metadata ikki tilda bo'lsa ham). To'liq ikki tilli post matni
   > kerak bo'lsa, har til uchun alohida `.md` fayl yaratib, `data/posts.js`da
   > `file` maydonini joriy tilga qarab tanlaydigan qilib kengaytirish mumkin.

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
