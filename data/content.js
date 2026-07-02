// Sayt kontenti — barcha matnlar { uz, ru } shaklida.
// O'z ma'lumotlaringiz bilan almashtirish uchun quyidagi qiymatlarni tahrirlang.
const SITE_CONTENT = {
  profile: {
    name: "Marsel Abdurahmonov",
    title: {
      uz: "Marketing mutaxassisi",
      ru: "Специалист по маркетингу",
    },
    bio: {
      uz: "Salom! Men raqamli marketing va brend rivojlantirish sohasida ishlayman. Ijtimoiy tarmoqlarda targ'ibot, reklama kampaniyalarini boshqarish va marketing strategiyasini ishlab chiqish bo'yicha tajribaga egaman. Har bir loyihada o'lchanadigan natijaga erishishga intilaman.",
      ru: "Здравствуйте! Я работаю в сфере цифрового маркетинга и развития бренда. Имею опыт продвижения в социальных сетях, управления рекламными кампаниями и разработки маркетинговой стратегии. В каждом проекте стремлюсь к измеримому результату.",
    },
    photo: "assets/img/profile.jpg", // O'z rasmingiz bilan almashtiring
  },

  experience: [
    {
      period: { uz: "2023 — hozirgi kunga qadar", ru: "2023 — по настоящее время" },
      role: { uz: "Marketing bo'limi boshlig'i", ru: "Руководитель отдела маркетинга" },
      company: "Example Company",
      description: {
        uz: "Kompaniyaning marketing strategiyasini ishlab chiqish va amalga oshirish, jamoa ishini boshqarish, byudjetni rejalashtirish.",
        ru: "Разработка и реализация маркетинговой стратегии компании, управление командой, планирование бюджета.",
      },
    },
    {
      period: { uz: "2021 — 2023", ru: "2021 — 2023" },
      role: { uz: "SMM mutaxassisi", ru: "SMM-специалист" },
      company: "Example Agency",
      description: {
        uz: "Ijtimoiy tarmoqlar uchun kontent strategiyasi, reklama kampaniyalarini yuritish, statistikani tahlil qilish.",
        ru: "Контент-стратегия для социальных сетей, ведение рекламных кампаний, анализ статистики.",
      },
    },
    {
      period: { uz: "2019 — 2021", ru: "2019 — 2021" },
      role: { uz: "Marketing assistenti", ru: "Ассистент маркетолога" },
      company: "Example LLC",
      description: {
        uz: "Marketing tadqiqotlari, raqobatchilar tahlili, marketing materiallarini tayyorlashda ishtirok.",
        ru: "Маркетинговые исследования, анализ конкурентов, участие в подготовке маркетинговых материалов.",
      },
    },
  ],

  services: [
    {
      title: { uz: "Raqamli marketing strategiyasi", ru: "Стратегия цифрового маркетинга" },
      description: {
        uz: "Biznesingiz uchun maqsadli va o'lchanadigan marketing strategiyasini ishlab chiqaman.",
        ru: "Разработаю целевую и измеримую маркетинговую стратегию для вашего бизнеса.",
      },
      icon: "target",
    },
    {
      title: { uz: "SMM va kontent boshqaruvi", ru: "SMM и управление контентом" },
      description: {
        uz: "Ijtimoiy tarmoqlarda brendingizni rivojlantirish, kontent reja va joylashtirish.",
        ru: "Развитие вашего бренда в социальных сетях, контент-план и публикации.",
      },
      icon: "share",
    },
    {
      title: { uz: "Reklama kampaniyalari", ru: "Рекламные кампании" },
      description: {
        uz: "Google Ads va ijtimoiy tarmoq reklamalarini sozlash, yuritish va tahlil qilish.",
        ru: "Настройка, ведение и анализ рекламы в Google Ads и социальных сетях.",
      },
      icon: "megaphone",
    },
    {
      title: { uz: "Brend rivojlantirish", ru: "Развитие бренда" },
      description: {
        uz: "Brend pozitsiyasi, vizual identifikatsiya va kommunikatsiya strategiyasi ustida ishlash.",
        ru: "Работа над позиционированием бренда, визуальной идентификацией и стратегией коммуникации.",
      },
      icon: "sparkle",
    },
  ],

  projects: [
    {
      title: { uz: "Brend qayta ishga tushirish", ru: "Ребрендинг компании" },
      description: {
        uz: "Mahalliy kompaniya uchun to'liq brend strategiyasi va ijtimoiy tarmoqlarda targ'ibot kampaniyasi.",
        ru: "Полная стратегия бренда и рекламная кампания в соцсетях для локальной компании.",
      },
      tags: ["Branding", "SMM"],
      image: "assets/img/project-1.jpg",
      link: "#",
    },
    {
      title: { uz: "Reklama kampaniyasi: +40% sotuv", ru: "Рекламная кампания: +40% продаж" },
      description: {
        uz: "3 oylik Google Ads va Instagram reklama kampaniyasi orqali sotuvlarni 40% ga oshirish.",
        ru: "Увеличение продаж на 40% за 3 месяца благодаря кампании в Google Ads и Instagram.",
      },
      tags: ["Reklama", "Analitika"],
      image: "assets/img/project-2.jpg",
      link: "#",
    },
    {
      title: { uz: "Kontent-marketing loyihasi", ru: "Проект контент-маркетинга" },
      description: {
        uz: "Blog va ijtimoiy tarmoqlar uchun kontent strategiyasini ishlab chiqish va amalga oshirish.",
        ru: "Разработка и реализация контент-стратегии для блога и социальных сетей.",
      },
      tags: ["Kontent", "Strategiya"],
      image: "assets/img/project-3.jpg",
      link: "#",
    },
  ],

  contact: {
    email: "you@example.com",
    phone: "+998 90 123 45 67",
    location: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан" },
    socials: [
      { label: "Telegram", url: "https://t.me/username" },
      { label: "LinkedIn", url: "https://linkedin.com/in/username" },
      { label: "Instagram", url: "https://instagram.com/username" },
    ],
  },
};
