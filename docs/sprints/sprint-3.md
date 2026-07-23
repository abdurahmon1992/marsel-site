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
- [x] Vaqtli eslatmalarni yetkazuvchi cron — `api/assistant/cron.js`
- [x] Vercel Cron jadvali — `vercel.json`

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
3. `assistant_tasks` da `due_at` bo'lgan vazifalar — eslatma. Har daqiqada
   `api/assistant/cron.js` muddati kelganlarini topib Telegram'ga yuboradi va
   `notified = true` qiladi.

> **Vaqt zonasi:** eslatmalar `ASSISTANT_TZ` (default `Asia/Tashkent`, UTC+5)
> bo'yicha ko'rsatiladi.

---

## Sozlash

### 1. Env o'zgaruvchilar (Vercel)
Sprint 2 ustiga qo'shimcha:

| O'zgaruvchi | Izoh |
| --- | --- |
| `ASSISTANT_TZ` | Ixtiyoriy, default `Asia/Tashkent` |
| `CRON_SECRET` | Vercel Cron endpointini himoyalovchi tasodifiy kalit |

### 2. Eslatma cron'i
`vercel.json` da har daqiqalik cron sozlangan
(`/api/assistant/cron`).

> **⚠️ Vercel tarif eslatmasi:** Vercel **Hobby** tarifida cron kuniga bir
> marta ishlaydi — daqiqama-daqiqa eslatmalar uchun **Pro** tarif kerak.
> Muqobil: tashqi cron xizmati (masalan cron-job.org) har daqiqada quyidagi
> manzilni chaqirsin:
> ```
> https://<domen>/api/assistant/cron?secret=<SETUP_SECRET>
> ```

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
