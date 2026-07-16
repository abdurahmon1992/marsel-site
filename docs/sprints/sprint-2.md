# Sprint 2 — Maqsad va vazifalar CRUD (backend + frontend)

**Maqsad:** Maqsadlar (goals) va vazifalar (tasks) uchun to'liq CRUD backend va
frontend. Test uchun namuna ma'lumotlar avtomatik qo'shiladi.

> Eslatma: dizayn ZIP fayli hali kelmagani uchun frontend joriy dark-theme
> uslubida "ishlaydigan baza" sifatida qurildi. Dizayn kelgach, xuddi shu API
> ustiga aniq UI (yoki Next.js komponentlari) ulanadi.

---

## Ma'lumotlar modeli

**goals**
| Ustun | Tur | Izoh |
| --- | --- | --- |
| id | serial PK | |
| title | text | majburiy |
| description | text | ixtiyoriy |
| status | text | `active` \| `done` \| `archived` |
| owner_tg_id | bigint | egasi Telegram ID |
| created_at / updated_at | timestamptz | |

**tasks**
| Ustun | Tur | Izoh |
| --- | --- | --- |
| id | serial PK | |
| goal_id | int FK → goals(id) ON DELETE CASCADE | ixtiyoriy |
| title | text | majburiy |
| description | text | ixtiyoriy |
| status | text | `todo` \| `in_progress` \| `done` |
| priority | text | `low` \| `medium` \| `high` |
| due_date | date | ixtiyoriy |
| created_at / updated_at | timestamptz | |

Jadvallar birinchi murojaatda avtomatik yaratiladi (`lib/db.js` → `ensureSchema`),
va bo'sh bo'lsa test uchun 3 maqsad + 7 vazifa bilan to'ldiriladi.

---

## API (barchasi sessiya cookie'sini talab qiladi — 401 aks holda)

### Maqsadlar
| Metod | Yo'l | Tavsif |
| --- | --- | --- |
| GET | `/api/goals` | ro'yxat (+ `task_count`, `done_count`) |
| POST | `/api/goals` | yaratish `{ title, description?, status? }` |
| GET | `/api/goals/:id` | bitta maqsad + `tasks[]` |
| PUT | `/api/goals/:id` | yangilash |
| DELETE | `/api/goals/:id` | o'chirish (vazifalari kaskad) |

### Vazifalar
| Metod | Yo'l | Tavsif |
| --- | --- | --- |
| GET | `/api/tasks` | ro'yxat (`?goalId=` bilan filtr) |
| POST | `/api/tasks` | yaratish `{ title, goal_id?, description?, status?, priority?, due_date? }` |
| GET | `/api/tasks/:id` | bitta vazifa |
| PUT | `/api/tasks/:id` | yangilash |
| DELETE | `/api/tasks/:id` | o'chirish |

---

## Frontend
- `boshqaruv.html` — maqsadlar va vazifalarni ko'rish, qo'shish, tahrirlash,
  o'chirish, holatini belgilash. Middleware bilan himoyalangan (sessiya shart).

---

## Next.js migratsiyasi (kelishilishi kerak)
Joriy stack — statik HTML + Vercel serverless funksiyalari. Yuqoridagi backend
API o'zgarishsiz Next.js Route Handler'lari sifatida ham ishlatilishi mumkin.
To'liq Next.js (App Router) migratsiyasi alohida vazifa sifatida rejalashtiriladi
— tasdiqlangach boshlanadi.

## Ochiq savollar
- [ ] Dizayn ZIP / Figma havolasi (aniq UI uchun)
- [ ] "Barcha sahifalar" — goals/tasks'dan tashqari yana qaysi entity'lar?
- [ ] Next.js: to'liq migratsiya qilinsinmi?
