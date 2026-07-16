// Sayt kontenti — barcha matnlar { uz, ru, en } shaklida.
// Manba: foydalanuvchining hh.uz'dan eksport qilingan rezyumesi (CV).
const SITE_CONTENT = {
  profile: {
    name: "Abdurahmon Abdurahmonov",
    title: {
      uz: "Marketing direktori (CMO)",
      ru: "Директор по маркетингу (CMO)",
      en: "Chief Marketing Officer (CMO)",
    },
    bio: {
      uz: "9 yildan ortiq tajribaga ega marketolog, FMCG va digital sohalarida ishlagan. Kuchli tomonlarim — natijaga yo'nalganlik, tizimli yondashuv, nostandart fikrlash va yuqori darajadagi kommunikatsiya ko'nikmalari. Stressga chidamliman, nostabil va inqirozli vaziyatlarda vazmin qarorlar qabul qilaman. Trade va digital marketing mexanikasini chuqur tushunaman, jamoalarni boshqarish, mahsulot chiqarish va biznes maqsadlariga erishish tajribasiga egaman.",
      ru: "Маркетолог с более чем 9-летним опытом в FMCG и digital. Сильные стороны — результативность, системный подход, нестандартное мышление и отличные навыки коммуникации. Обладаю высокой стрессоустойчивостью, развиваю навыки принятия взвешенных решений в нестабильных и кризисных ситуациях. Глубоко понимаю механику трейд- и digital-маркетинга, умею управлять командами, запускать продукты и достигать бизнес-целей.",
      en: "Marketing professional with 9+ years of experience across FMCG and digital. My strengths are a results-driven mindset, a systematic approach, out-of-the-box thinking and strong communication skills. I stay composed under pressure and make balanced decisions in unstable and crisis situations. I have a deep understanding of trade- and digital-marketing mechanics, and hands-on experience leading teams, launching products and delivering on business goals.",
    },
    location: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан", en: "Tashkent, Uzbekistan" },
    relocation: {
      uz: "Ko'chishga tayyor: Ozarbayjon, Gruziya, Qozog'iston, Rossiya va boshqa mintaqalar — xizmat safarlariga ham tayyor",
      ru: "Готов к переезду: Азербайджан, Грузия, Казахстан, Россия и другие регионы — готов к командировкам",
      en: "Open to relocation: Azerbaijan, Georgia, Kazakhstan, Russia and other regions — ready for business trips",
    },
    photo: "assets/img/profile.jpg",
  },

  experience: [
    {
      period: { uz: "2025 sentabr — hozirgi kunga qadar", ru: "Сентябрь 2025 — по настоящее время", en: "September 2025 — present" },
      role: { uz: "Marketing bo'limi boshlig'i", ru: "Глава маркетинга", en: "Head of Marketing" },
      company: "EPCO — avtomobil biznesi (avtokomponentlar)",
      description: {
        uz: "EPCO uchun $400 ming+ byudjetli 2026-yil marketing strategiyasini shakllantirdim (mavjud kanallarda 20-25% sotuv o'sishi maqsadida). Brend pozitsiyasi, auditoriya yadrosi va Tone of Voice'ni belgilab, offline/digital/e-commerce uchun 360° kommunikatsiya platformasini ishlab chiqdim. ENOC Drivers Club va EPCO Master Club sodiqlik dasturlarini loyihalashtirdim (takroriy xaridlar 10-15% o'sish salohiyati bilan). 3 kishilik jamoani boshqardim.",
        ru: "Сформировал маркетинговую стратегию EPCO на 2026 год с бюджетом свыше $400 тыс. и целевым ростом продаж в действующих каналах на 20–25%. Определил позиционирование бренда, ядро ЦА и Tone of Voice, разработал 360°-платформу коммуникаций для офлайна, digital и e-commerce. Спроектировал программы лояльности ENOC Drivers Club и EPCO Master Club (рост повторных покупок на 10–15%). Руководил командой из 3 специалистов.",
        en: "Built EPCO's 2026 marketing strategy with a $400K+ budget, targeting 20–25% sales growth in existing channels. Defined brand positioning, the core audience and Tone of Voice, and developed a 360° communications platform for offline, digital and e-commerce. Designed the ENOC Drivers Club and EPCO Master Club loyalty programs (with 10–15% repeat-purchase growth potential). Managed a team of 3.",
      },
    },
    {
      period: { uz: "2024 fevral — 2025 sentabr", ru: "Февраль 2024 — Сентябрь 2025", en: "February 2024 — September 2025" },
      role: { uz: "Marketing direktori", ru: "Директор по маркетингу", en: "Marketing Director" },
      company: "Candy Gold — qandolat mahsulotlari",
      description: {
        uz: "5 ta savdo markasi uchun uch yillik strategiyani ishlab chiqib, amalga oshirdim. Jamoani 2 kishidan 5 kishigacha kengaytirdim, hisobot muddatini 3 haftadan 1 haftagacha qisqartirdim. Marketing byudjetini (450 mln so'm) optimallashtirib, samarasiz faoliyatlarni chiqarib tashlash orqali xarajatlarni 14% ga qisqartirdim. Nillo liniyasini (6 SKU) ishga tushirib, sotuvni 270 mln so'mgacha oshirdim.",
        ru: "Разработал и реализовал трёхлетнюю стратегию для 5 торговых марок. Увеличил команду с 2 до 5 человек, сократил срок отчётности с 3 недель до 1 недели. Оптимизировал маркетинговый бюджет (450 млн сумов), исключив неэффективные активности — сократил расходы на 14%. Запустил линейку Nillo (6 SKU), обеспечив рост продаж до 270 млн сумов.",
        en: "Developed and delivered a three-year strategy for 5 brands. Grew the team from 2 to 5 people and cut the reporting cycle from 3 weeks to 1. Optimized the marketing budget (450M UZS) by dropping ineffective activities, reducing spend by 14%. Launched the Nillo line (6 SKUs), driving sales up to 270M UZS.",
      },
    },
    {
      period: { uz: "2022 avgust — 2024 oktabr", ru: "Август 2022 — Октябрь 2024", en: "August 2022 — October 2024" },
      role: { uz: "Sonietar va boshqaruvchi hamkor", ru: "Сооснователь и управляющий партнёр", en: "Co-founder & Managing Partner" },
      company: "Marsel Marketing — marketing agentligi",
      description: {
        uz: "FMCG, qurilish va e-commerce sohalaridagi asosiy mijozlar bilan agentlik rivojini boshqardim. SMM kampaniyalari, targeting va kreativlarni ishlab chiqdim, jamoani 7 mutaxassisgacha kengaytirdim. Bo'yoq ishlab chiqaruvchisi uchun Reels-seriyasi 180,000+ ko'rish va +8% sotuv keltirdi; qurilish kompaniyasi uchun 4 oyda 5,000+ obunachi va 1,500+ lid (Bitrix24) jalb qildim.",
        ru: "Руководил развитием агентства и ключевыми клиентами в FMCG, строительстве и e-commerce. Разработал SMM-кампании, таргетинг и креативы, расширил команду до 7 специалистов. Для производителя красок Reels-серия набрала 180 000+ просмотров и дала +8% продаж; для застройщика привлёк 5 000+ подписчиков и 1 500+ лидов в Bitrix24 за 4 месяца.",
        en: "Led the agency's growth and key clients across FMCG, construction and e-commerce. Built SMM campaigns, targeting and creatives, and grew the team to 7 specialists. For a paint manufacturer, a Reels series reached 180,000+ views and delivered +8% sales; for a developer, I generated 5,000+ followers and 1,500+ leads in Bitrix24 within 4 months.",
      },
    },
    {
      period: { uz: "2020 aprel — 2022 avgust", ru: "Апрель 2020 — Август 2022", en: "April 2020 — August 2022" },
      role: { uz: "Treyd-marketing va R&D menejeri", ru: "Менеджер по трейд-маркетингу и R&D", en: "Trade Marketing & R&D Manager" },
      company: "OOO Candy Gold — qandolat mahsulotlari",
      description: {
        uz: "Treyd-strategiya, kalendarlar va ijro nazoratini yuritdim. 60 dan ortiq xodimni o'qitib, ijro darajasini 83% gacha oshirdim. 12 ta hududda POSM va jihozlarni joylashtirdim. R&D yo'nalishida mahsulot yaxshilash strategiyasini ishlab chiqib, yangi mahsulot chiqarishlarida ishtirok etdim.",
        ru: "Вёл разработку трейд-стратегии, календарей и контроль исполнения. Обучил и мотивировал 60+ сотрудников, повысив выполнение до 83%. Разместил POSM и оборудование по 12 регионам. В рамках R&D разрабатывал стратегию улучшения продукта и участвовал в запуске новинок.",
        en: "Ran trade strategy, activity calendars and execution control. Trained and motivated 60+ employees, lifting execution to 83%. Deployed POSM and equipment across 12 regions. Within R&D, developed the product-improvement strategy and took part in new product launches.",
      },
    },
    {
      period: { uz: "2019 fevral — 2020 mart", ru: "Февраль 2019 — Март 2020", en: "February 2019 — March 2020" },
      role: { uz: "Katta treyd-marketing mutaxassisi", ru: "Старший специалист по трейд-маркетингу", en: "Senior Trade Marketing Specialist" },
      company: "LLC CRAFERS — qandolat mahsulotlari",
      description: {
        uz: "Savdo nuqtalarida treyd-faoliyat va BTL-kampaniyalarni rejalashtirdim, POSM yaratdim va raqobatchilar tahlilini o'tkazdim. \"Crafers Arch\" treyd-formatini ishga tushirib, asosiy savdo nuqtalarida +6% sotuvga erishdim. \"Antaliyaga sayohat\" sodiqlik aksiyasi orqali o'rtacha chekni 14% ga oshirdim.",
        ru: "Планировал трейд-активности и BTL-кампании в торговых точках, создавал POSM и проводил конкурентный анализ. Запустил трейд-формат «Crafers Arch», что обеспечило +6% продаж в ключевых точках. Акция лояльности «Antaliyaga sayohat» дала +14% к среднему чеку.",
        en: "Planned trade activities and BTL campaigns at points of sale, created POSM and ran competitor analysis. Launched the \"Crafers Arch\" trade format, delivering +6% sales in key outlets. The \"Trip to Antalya\" loyalty promo raised the average check by 14%.",
      },
    },
    {
      period: { uz: "2017 noyabr — 2018 noyabr", ru: "Ноябрь 2017 — Ноябрь 2018", en: "November 2017 — November 2018" },
      role: { uz: "Treyd-marketing mutaxassisi", ru: "Специалист по трейд-маркетингу", en: "Trade Marketing Specialist" },
      company: "RC Cola International Uzbekistan-JV LLC \"FAMILY GROUP\"",
      description: {
        uz: "Raqobatchilar tahlili va ulgurji mijozlar uchun treyd-aksiyalar ishlab chiqishda ishtirok etib, yildan-yilga 33% sotuv o'sishiga erishdim. Toshkent bo'ylab 13 nafar merchandayzerdan iborat jamoani boshqardim, hisobot muddatini 30 kundan onlayn-rejimga tushirdim. 9,000+ savdo nuqtasi tahlili asosida 700+ sovutish jihozini joylashtirishni muvofiqlashtirdim.",
        ru: "Участвовал в анализе конкурентов и разработке трейд-акций для оптовых клиентов, обеспечив прирост продаж на 33% к аналогичному периоду. Руководил командой из 13 мерчендайзеров по Ташкенту, сократив цикл отчётов с 30 дней до онлайн-режима. Координировал размещение 700+ единиц холодильного оборудования на основе анализа 9 000+ точек продаж.",
        en: "Contributed to competitor analysis and trade promos for wholesale clients, delivering +33% sales year-over-year. Led a team of 13 merchandisers across Tashkent and moved the reporting cycle from 30 days to real-time. Coordinated the placement of 700+ coolers based on an analysis of 9,000+ points of sale.",
      },
    },
    {
      period: { uz: "2016 noyabr — 2017 oktabr", ru: "Ноябрь 2016 — Октябрь 2017", en: "November 2016 — October 2017" },
      role: { uz: "Xizmatlar sotuvi bo'yicha menejer", ru: "Менеджер по продажам услуг", en: "Services Sales Manager" },
      company: "JV LLC \"SOAR CHS INTERNATIONAL\" (TM «Hydrolife» distribyutori)",
      description: {
        uz: "B2B sotuvlar bilan shug'ullandim, sotuv ko'rsatkichlarini muntazam tahlil qildim va oylik hisobotlar tayyorladim. Hamkorlar uchun taqdimot va takliflar ishlab chiqdim.",
        ru: "Занимался B2B продажами, регулярно анализировал показатели продаж и готовил ежемесячные отчёты. Разрабатывал презентации и предложения для партнёров.",
        en: "Handled B2B sales, regularly analyzed sales metrics and prepared monthly reports. Created presentations and proposals for partners.",
      },
    },
  ],

  education: [
    {
      period: { uz: "2027 (jarayonda)", ru: "2027 (в процессе)", en: "2027 (in progress)" },
      degree: { uz: "Magistratura — Business Administration, MBA", ru: "Магистратура — Business Administration, MBA", en: "Master's — Business Administration, MBA" },
      institution: "American University of Technology",
    },
    {
      period: { uz: "2016", ru: "2016", en: "2016" },
      degree: { uz: "Texnolog (qayta ishlash bo'yicha)", ru: "Технолог по переработке", en: "Processing Technologist" },
      institution: { uz: "Toshkent Davlat Agrar Universiteti", ru: "Ташкентский Государственный Аграрный Университет", en: "Tashkent State Agrarian University" },
    },
    {
      period: { uz: "2021", ru: "2021", en: "2021" },
      degree: { uz: "Marketing bo'yicha malaka oshirish kursi", ru: "Курс повышения квалификации по маркетингу", en: "Marketing professional development course" },
      institution: "Alfa Education",
    },
  ],

  competencies: [
    {
      title: { uz: "Treyd-marketing va savdo strategiyasi", ru: "Трейд-маркетинг и стратегия продаж", en: "Trade Marketing & Sales Strategy" },
      description: {
        uz: "Treyd-strategiya, BTL-kampaniyalar, POSM va planogrammalar, distribyutorlar orqali sotuvni rivojlantirish.",
        ru: "Трейд-стратегия, BTL-кампании, POSM и планограммы, развитие продаж через дистрибьюторов.",
        en: "Trade strategy, BTL campaigns, POSM and planograms, growing sales through distributors.",
      },
      icon: "target",
    },
    {
      title: { uz: "Raqamli marketing va SMM", ru: "Цифровой маркетинг и SMM", en: "Digital Marketing & SMM" },
      description: {
        uz: "Kontent-strategiya, targeting, brend pozitsiyasi va Tone of Voice, digital kampaniyalarni boshqarish.",
        ru: "Контент-стратегия, таргетинг, позиционирование бренда и Tone of Voice, управление digital-кампаниями.",
        en: "Content strategy, targeting, brand positioning and Tone of Voice, running digital campaigns.",
      },
      icon: "share",
    },
    {
      title: { uz: "Marketing analitikasi va ROI", ru: "Маркетинговая аналитика и ROI", en: "Marketing Analytics & ROI" },
      description: {
        uz: "Baseline, ROI, marja va LTV tahlili, unit-ekonomika hisob-kitoblari va muntazam hisobotlar tizimi.",
        ru: "Анализ baseline, ROI, маржи и LTV, расчёт unit-экономики и система регулярной отчётности.",
        en: "Baseline, ROI, margin and LTV analysis, unit-economics modeling and a regular reporting system.",
      },
      icon: "megaphone",
    },
    {
      title: { uz: "Jamoa boshqaruvi va o'qitish", ru: "Управление командой и обучение", en: "Team Management & Training" },
      description: {
        uz: "Jamoalarni shakllantirish va rivojlantirish, xodimlarni o'qitish, jarayonlarni sotuv va distribyutsiya bilan muvofiqlashtirish.",
        ru: "Формирование и развитие команд, обучение персонала, координация процессов с продажами и дистрибуцией.",
        en: "Building and developing teams, training staff, and aligning processes with sales and distribution.",
      },
      icon: "sparkle",
    },
  ],

  skills: {
    languages: [
      { name: { uz: "O'zbek", ru: "Узбекский", en: "Uzbek" }, level: { uz: "Ona tili", ru: "Родной", en: "Native" } },
      { name: { uz: "Ingliz", ru: "Английский", en: "English" }, level: { uz: "B2 — o'rta-yuqori", ru: "B2 — Средне-продвинутый", en: "B2 — Upper-Intermediate" } },
      { name: { uz: "Rus", ru: "Русский", en: "Russian" }, level: { uz: "C1 — yuqori", ru: "C1 — Продвинутый", en: "C1 — Advanced" } },
    ],
    tags: [
      { uz: "Treyd-marketing", ru: "Трейд-маркетинг", en: "Trade marketing" },
      { uz: "Sotuv analitikasi", ru: "Аналитика продаж", en: "Sales analytics" },
      { uz: "Promo samaradorligini baholash", ru: "Оценка эффективности промо", en: "Promo effectiveness evaluation" },
      { uz: "Sodiqlik dasturlarini ishlab chiqish", ru: "Разработка программ лояльности", en: "Loyalty program design" },
      { uz: "Planogramma yaratish", ru: "Создание планограмм", en: "Planogram creation" },
      { uz: "Promo-aksiyalarni tashkil etish", ru: "Организация промо акций", en: "Promo campaign organization" },
      { uz: "Promo-aksiyalarni o'tkazish", ru: "Проведение промо акций", en: "Promo campaign execution" },
      { uz: "Jamoani boshqarish", ru: "Управление командой", en: "Team management" },
      { uz: "Xodimlarni o'qitish", ru: "Обучение персонала", en: "Staff training" },
      { uz: "Sotuvni rejalashtirish", ru: "Планирование продаж", en: "Sales planning" },
      { uz: "Distribyutorlar orqali sotuv", ru: "Продажи через дистрибьюторов", en: "Distributor sales" },
      { uz: "Loyihalarni boshqarish", ru: "Управление проектами", en: "Project management" },
      { uz: "Taqdimot o'tkazish", ru: "Проведение презентаций", en: "Presentations" },
      { uz: "MS PowerPoint", ru: "MS PowerPoint", en: "MS PowerPoint" },
    ],
  },

  // Hero ostidagi "Raqamlarda" ko'rsatkichlar chizig'i.
  highlights: [
    { value: "9+", label: { uz: "yil marketing tajribasi", ru: "лет опыта в маркетинге", en: "years in marketing" } },
    { value: "$400K+", label: { uz: "boshqarilgan yillik byudjet", ru: "годовой бюджет под управлением", en: "annual budget managed" } },
    { value: "7", label: { uz: "kishilik jamoani boshqarish", ru: "человек под руководством", en: "people led in a team" } },
    { value: "+33%", label: { uz: "eng yuqori sotuv o'sishi", ru: "максимальный рост продаж", en: "peak sales growth" } },
  ],

  achievements: [
    {
      metric: "+270 mln so'm",
      title: { uz: "Nillo mahsulot liniyasi ishga tushirildi", ru: "Запуск линейки Nillo", en: "Nillo product line launched" },
      description: {
        uz: "Candy Gold'da 6 SKU'dan iborat yangi liniyani ishga tushirib, sotuvni 270 mln so'mgacha oshirdim.",
        ru: "Запустил линейку из 6 SKU в Candy Gold, обеспечив рост продаж до 270 млн сумов.",
        en: "Launched a new 6-SKU line at Candy Gold, driving sales up to 270M UZS.",
      },
      company: "Candy Gold",
    },
    {
      metric: "+33%",
      title: { uz: "Ulgurji sotuvda yillik o'sish", ru: "Годовой рост оптовых продаж", en: "Annual wholesale sales growth" },
      description: {
        uz: "RC Cola/Family Group'da treyd-aksiyalar orqali ulgurji mijozlar sotuvini yildan-yilga 33% ga oshirdim.",
        ru: "В RC Cola/Family Group обеспечил прирост оптовых продаж на 33% к аналогичному периоду за счёт трейд-акций.",
        en: "At RC Cola/Family Group, grew wholesale client sales by 33% year-over-year through trade promotions.",
      },
      company: "RC Cola / Family Group",
    },
    {
      metric: "180K+",
      title: { uz: "Reels-seriya ko'rishlari, +8% sotuv", ru: "Просмотры Reels-серии, +8% продаж", en: "Reels series views, +8% sales" },
      description: {
        uz: "Marsel Marketing'da bo'yoq ishlab chiqaruvchisi uchun Reels-seriyasi 180,000+ ko'rish va 30+ UGC-post keltirdi.",
        ru: "В Marsel Marketing Reels-серия для производителя красок набрала 180 000+ просмотров и 30+ UGC-постов.",
        en: "At Marsel Marketing, a Reels series for a paint manufacturer reached 180,000+ views and 30+ UGC posts.",
      },
      company: "Marsel Marketing",
    },
    {
      metric: "+6%",
      title: { uz: "\"Crafers Arch\" treyd-formati", ru: "Трейд-формат «Crafers Arch»", en: "\"Crafers Arch\" trade format" },
      description: {
        uz: "LLC CRAFERS'da yangi treyd-formatni ishga tushirib, asosiy savdo nuqtalarida sotuvni 6% ga oshirdim.",
        ru: "В LLC CRAFERS запустил новый трейд-формат, обеспечив +6% продаж в ключевых точках.",
        en: "At LLC CRAFERS, launched a new trade format, delivering +6% sales in key outlets.",
      },
      company: "LLC CRAFERS",
    },
    {
      metric: "700+",
      title: { uz: "Sovutish jihozlarini joylashtirish", ru: "Размещение холодильного оборудования", en: "Cooler equipment placement" },
      description: {
        uz: "9,000+ savdo nuqtasi tahlili asosida butun O'zbekiston bo'ylab 700+ sovutish jihozini joylashtirishni muvofiqlashtirdim.",
        ru: "На основе анализа 9 000+ точек продаж координировал размещение 700+ единиц холодильного оборудования по Узбекистану.",
        en: "Coordinated the placement of 700+ coolers across Uzbekistan based on an analysis of 9,000+ points of sale.",
      },
      company: "RC Cola / Family Group",
    },
  ],

  recommendations: [
    {
      name: "Shoxrux Nizomutdinov",
      role: { uz: "Vakil", ru: "Представитель", en: "Representative" },
      company: "RC Cola O'zbekistonda",
    },
    {
      name: "Izzatullaev Sardor",
      role: { uz: "Treyd-marketing menejeri", ru: "Трейд-маркетинг менеджер", en: "Trade Marketing Manager" },
      company: "Kolberg Group",
    },
    {
      name: "Li Sergey",
      role: { uz: "Key Account Manager", ru: "Key Account Manager", en: "Key Account Manager" },
      company: "Heineken",
    },
  ],

  contact: {
    email: "dilmurodabdurakhmonov.dh@gmail.com",
    phone: "+998 95 090 92 92",
    location: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан", en: "Tashkent, Uzbekistan" },
    // CV'da ijtimoiy tarmoq/LinkedIn havolalari ko'rsatilmagan.
    // O'z profil havolalaringizni shu yerga qo'shing.
    socials: [],
  },
};
