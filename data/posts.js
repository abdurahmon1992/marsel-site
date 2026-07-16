// Blog postlari ro'yxati. Yangi post qo'shish uchun:
// 1) blog/posts/ ichiga har til uchun .md fayl yozing (faqat matn, frontmatter kerak emas):
//    <slug>.md (uz), <slug>.ru.md (ru), <slug>.en.md (en)
// 2) shu faylga mos yozuv ushbu ro'yxatga qo'shing.
// file — obyekt: { uz, ru, en }. Biror til uchun fayl bo'lmasa, blog.js uz'ga qaytadi.
const BLOG_POSTS = [
  {
    slug: "treyd-marketing-savdo-nuqtasida-galaba",
    title: {
      uz: "Treyd-marketing: savdo nuqtasida qanday g'alaba qozoniladi",
      ru: "Трейд-маркетинг: как побеждать в точке продаж",
      en: "Trade marketing: how to win at the point of sale",
    },
    date: "2026-07-10",
    excerpt: {
      uz: "Javonlar uchun kurash, planogrammalar, POSM va promo-mexanikalar — sotuvni oshiradigan treyd-marketing asoslari.",
      ru: "Борьба за полку, планограммы, POSM и промо-механики — основы трейд-маркетинга, которые растят продажи.",
      en: "The battle for the shelf, planograms, POSM and promo mechanics — the trade-marketing fundamentals that grow sales.",
    },
    file: {
      uz: "posts/treyd-marketing-savdo-nuqtasida-galaba.md",
      ru: "posts/treyd-marketing-savdo-nuqtasida-galaba.ru.md",
      en: "posts/treyd-marketing-savdo-nuqtasida-galaba.en.md",
    },
  },
  {
    slug: "raqamli-marketing-trendlari-2026",
    title: {
      uz: "2026-yilda raqamli marketing trendlari",
      ru: "Тренды цифрового маркетинга в 2026 году",
      en: "Digital marketing trends in 2026",
    },
    date: "2026-06-15",
    excerpt: {
      uz: "Ushbu yilda brendlar e'tibor qaratishi kerak bo'lgan asosiy raqamli marketing tendensiyalari haqida.",
      ru: "Об основных тенденциях цифрового маркетинга, на которые брендам стоит обратить внимание в этом году.",
      en: "The key digital-marketing trends brands should pay attention to this year.",
    },
    file: {
      uz: "posts/raqamli-marketing-trendlari-2026.md",
      ru: "posts/raqamli-marketing-trendlari-2026.ru.md",
      en: "posts/raqamli-marketing-trendlari-2026.en.md",
    },
  },
  {
    slug: "smm-strategiyasi-qanday-quriladi",
    title: {
      uz: "SMM strategiyasi qanday quriladi?",
      ru: "Как построить SMM-стратегию?",
      en: "How to build an SMM strategy?",
    },
    date: "2026-05-02",
    excerpt: {
      uz: "Ijtimoiy tarmoqlar uchun samarali kontent strategiyasini bosqichma-bosqich qurish yo'llari.",
      ru: "Пошаговый подход к построению эффективной контент-стратегии для социальных сетей.",
      en: "A step-by-step approach to building an effective content strategy for social media.",
    },
    file: {
      uz: "posts/smm-strategiyasi-qanday-quriladi.md",
      ru: "posts/smm-strategiyasi-qanday-quriladi.ru.md",
      en: "posts/smm-strategiyasi-qanday-quriladi.en.md",
    },
  },
];
