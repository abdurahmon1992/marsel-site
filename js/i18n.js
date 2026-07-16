// Statik matnlar uchun uz/ru/en lug'at. data-i18n="key" atributiga ega
// elementlar shu lug'atdagi qiymat bilan almashtiriladi.
const I18N = {
  uz: {
    "nav.about": "Men haqimda",
    "nav.experience": "Mehnat faoliyatim",
    "nav.education": "Ta'lim",
    "nav.services": "Kasbiy yo'nalishlar",
    "nav.skills": "Ko'nikmalar",
    "nav.projects": "Yutuqlarim",
    "nav.blog": "Blog",
    "nav.recommendations": "Tavsiyalar",
    "nav.contact": "Bog'lanish",

    "hero.eyebrow": "Onlayn rezyume",
    "hero.cta.contact": "Bog'lanish",
    "hero.cta.projects": "Yutuqlarni ko'rish",
    "hero.cta.download": "PDF yuklab olish",

    "experience.label": "Tajriba",
    "experience.title": "Mehnat faoliyatim",

    "education.label": "Ta'lim",
    "education.title": "Ta'lim va malaka oshirish",

    "services.label": "Ekspertiza",
    "services.title": "Kasbiy yo'nalishlarim",

    "skills.label": "Ko'nikmalar",
    "skills.title": "Ko'nikmalar va tillar",

    "projects.label": "Natijalar",
    "projects.title": "Yutuqlarim",

    "blog.label": "Blog",
    "blog.title": "So'nggi maqolalar",
    "blog.viewAll": "Barcha postlarni ko'rish",
    "blog.back": "Blogga qaytish",

    "recommendations.label": "Tavsiyalar",
    "recommendations.title": "Kim tavsiya beradi",

    "contact.label": "Aloqa",
    "contact.title": "Bog'lanish uchun ma'lumotlar",
    "contact.email": "Email",
    "contact.phone": "Telefon",
    "contact.location": "Manzil",

    "footer.rights": "Barcha huquqlar himoyalangan.",

    "a11y.theme": "Mavzuni almashtirish",
  },
  ru: {
    "nav.about": "Обо мне",
    "nav.experience": "Опыт работы",
    "nav.education": "Образование",
    "nav.services": "Экспертиза",
    "nav.skills": "Навыки",
    "nav.projects": "Достижения",
    "nav.blog": "Блог",
    "nav.recommendations": "Рекомендации",
    "nav.contact": "Контакты",

    "hero.eyebrow": "Онлайн-резюме",
    "hero.cta.contact": "Связаться",
    "hero.cta.projects": "Смотреть достижения",
    "hero.cta.download": "Скачать PDF",

    "experience.label": "Опыт",
    "experience.title": "Опыт работы",

    "education.label": "Образование",
    "education.title": "Образование и курсы",

    "services.label": "Экспертиза",
    "services.title": "Мои профессиональные направления",

    "skills.label": "Навыки",
    "skills.title": "Навыки и языки",

    "projects.label": "Результаты",
    "projects.title": "Достижения",

    "blog.label": "Блог",
    "blog.title": "Последние статьи",
    "blog.viewAll": "Смотреть все посты",
    "blog.back": "Назад в блог",

    "recommendations.label": "Рекомендации",
    "recommendations.title": "Кто рекомендует",

    "contact.label": "Контакты",
    "contact.title": "Контактная информация",
    "contact.email": "Email",
    "contact.phone": "Телефон",
    "contact.location": "Адрес",

    "footer.rights": "Все права защищены.",

    "a11y.theme": "Переключить тему",
  },
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.services": "Expertise",
    "nav.skills": "Skills",
    "nav.projects": "Achievements",
    "nav.blog": "Blog",
    "nav.recommendations": "References",
    "nav.contact": "Contact",

    "hero.eyebrow": "Online résumé",
    "hero.cta.contact": "Get in touch",
    "hero.cta.projects": "See achievements",
    "hero.cta.download": "Download PDF",

    "experience.label": "Experience",
    "experience.title": "Work experience",

    "education.label": "Education",
    "education.title": "Education & courses",

    "services.label": "Expertise",
    "services.title": "My areas of expertise",

    "skills.label": "Skills",
    "skills.title": "Skills & languages",

    "projects.label": "Results",
    "projects.title": "Achievements",

    "blog.label": "Blog",
    "blog.title": "Latest articles",
    "blog.viewAll": "View all posts",
    "blog.back": "Back to blog",

    "recommendations.label": "References",
    "recommendations.title": "Who recommends me",

    "contact.label": "Contact",
    "contact.title": "Contact details",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",

    "footer.rights": "All rights reserved.",

    "a11y.theme": "Toggle theme",
  },
};

const LANG_STORAGE_KEY = "site-lang";
const DEFAULT_LANG = "uz";
const SUPPORTED_LANGS = ["uz", "ru", "en"];

function getCurrentLang() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
}

function setCurrentLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyLang(lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const dict = I18N[lang] || I18N[DEFAULT_LANG];
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // aria-label tarjimalari
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const dict = I18N[lang] || I18N[DEFAULT_LANG];
    if (dict[key]) {
      el.setAttribute("aria-label", dict[key]);
    }
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function initLangSwitch() {
  const lang = getCurrentLang();
  applyLang(lang);

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => setCurrentLang(btn.dataset.lang));
  });
}

document.addEventListener("DOMContentLoaded", initLangSwitch);
