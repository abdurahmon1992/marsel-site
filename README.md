# Onlayn rezyume — Abdurahmon Abdurahmonov

Marketing direktori (CMO) lavozimiga nomzod uchun onlayn rezyume sayti.
Kontent foydalanuvchining haqiqiy CV'siga (hh.uz eksporti) asoslangan. Build
vositalarisiz, oddiy HTML/CSS/JS asosida qurilgan, GitHub Pages orqali
bevosita joylashtirish mumkin.

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
