// Statik matnlar uchun uz/ru lug'at. data-i18n="key" atributiga ega
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
  },
};

const LANG_STORAGE_KEY = "site-lang";
const DEFAULT_LANG = "uz";

function getCurrentLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANG;
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
