# Sprint 3 — Shaxsiy yordamchi: vazifalar va eslatmalar

**Maqsad:** AI assistent botni ko'p foydalanuvchili **shaxsiy yordamchiga**
aylantirish. Har bir foydalanuvchi (Telegram chat) o'zining vazifalari va
eslatmalarini tabiiy tilda yuritadi; muddati kelganda bot eslatib turadi.

Bot ochiq — har kim yozishi mumkin, lekin vazifalar har bir foydalanuvchi
uchun alohida (chat_id bo'yicha ajratilgan).

---

## Bajarilgan ishlar

- [x] `assistant_tasks` jadvali (`lib/db.js`) — matn, muddat (`due_at`),
      `done`, `notified`, chat bo'yicha
- [x] Vazifa mantiqi va vaqt formatlash — `lib/tasks.js`
- [x] Tabiiy til bilan boshqarish — webhook LLM orqali niyatni aniqlaydi
      (add / list / complete / delete / chat) va JSON action qaytaradi
- [x] Vaqtli eslatmalarni yetkazuvchi endpoint — `api/assistant/cron.js`
      (tashqi cron xizmati yoki Vercel Pro Cron chaqiradi)

## Qanday ishlaydi

1. Foydalanuvchi botga tabiiy tilda yozadi. Masalan:
   - «Ertaga soat 9da shifokorga qo'ng'iroq qilishimni eslat» → vazifa + eslatma
   - «Vazifalarim» → ochiq vazifalar ro'yxati
   - «1-chisini bajardim» → o'sha vazifa yopiladi
   - Boshqa har qanday savol → oddiy suhbat javobi
2. Webhook (`api/assistant/webhook.js`) LLM'ga foydalanuvchi xabari, hozirgi
   vaqt va ochiq vazifalar ro'yxatini beradi; LLM **JSON action** qaytaradi.
   Vazifa amallari kodda aniq bajariladi (LLM javobiga ishonilmaydi —
   xatoliksiz bo'lishi uchun), faqat oddiy suhbat javobi LLM'dan olinadi.
3. `assistant_tasks` da `due_at` bo'lgan vazifalar — eslatma.
   `api/assistant/cron.js` muddati kelganlarini topib Telegram'ga yuboradi va
   `notified = true` qiladi. Bu endpoint tashqi cron xizmati (yoki Vercel Pro
   Cron) tomonidan muntazam chaqirilishi kerak (pastga qarang).

> **Vaqt zonasi:** eslatmalar `ASSISTANT_TZ` (default `Asia/Tashkent`, UTC+5)
> bo'yicha ko'rsatiladi.

---

## Sozlash

### 1. Env o'zgaruvchilar (Vercel)
Sprint 2 ustiga qo'shimcha:

| O'zgaruvchi | Izoh |
| --- | --- |
| `ASSISTANT_TZ` | Ixtiyoriy, default `Asia/Tashkent` |
| `CRON_SECRET` | Ixtiyoriy — faqat Vercel **Pro** Cron ishlatilsa kerak |

### 2. Eslatma yetkazishni sozlash

Eslatmalar `api/assistant/cron.js` endpoint muntazam (masalan har daqiqada)
chaqirilganda yuboriladi. `vercel.json` **qo'shilmagan**, chunki Vercel
**Hobby** (bepul) tarifida cron kuniga faqat bir marta ishlashga ruxsat beradi
va bu deploy'ni buzadi.

**Tavsiya etilgan yo'l (Hobby uchun) — tashqi bepul cron xizmati:**
[cron-job.org](https://cron-job.org) (yoki shunga o'xshash) da har daqiqada
quyidagi manzilni chaqiradigan vazifa yarating:
```
https://<domen>/api/assistant/cron?secret=<SETUP_SECRET>
```

**Muqobil (Vercel Pro tarifida):** loyihaga `vercel.json` qo'shing va
`CRON_SECRET` env'ni sozlang:
```json
{ "crons": [ { "path": "/api/assistant/cron", "schedule": "* * * * *" } ] }
```

> Vazifa ro'yxati (qo'shish/ko'rish/yopish) tarifdan qat'i nazar darhol
> ishlaydi — faqat aktiv eslatma yuborilishi shu cron chaqiruviga bog'liq.

---

## Sinash

1. Botga `/start` → yordamchi imkoniyatlari ko'rsatiladi.
2. «Bugun soat 15:30da onamga qo'ng'iroq qilishimni eslat» deb yozing → bot
   vazifani qo'shadi va eslatma vaqtini tasdiqlaydi.
3. «Vazifalarim» → ro'yxatda ko'rinadi.
4. Muddat kelganda (cron ishlab tursa) → «⏰ Eslatma…» xabari keladi.
5. «1-chisini bajardim» → vazifa yopiladi.

---

## Keyingi mumkin bo'lgan yaxshilanishlar
- [ ] Takrorlanuvchi eslatmalar (har kuni/hafta)
- [ ] Vazifani tahrirlash, muddatni o'zgartirish
- [ ] Har foydalanuvchi uchun shaxsiy vaqt zonasi
- [ ] Ovozli xabarlarni matnga aylantirish
