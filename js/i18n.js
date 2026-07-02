// Statik matnlar uchun uz/ru lug'at. data-i18n="key" atributiga ega
// elementlar shu lug'atdagi qiymat bilan almashtiriladi.
const I18N = {
  uz: {
    "nav.about": "Men haqimda",
    "nav.experience": "Mehnat faoliyatim",
    "nav.services": "Xizmatlar",
    "nav.projects": "Loyihalarim",
    "nav.blog": "Blog",
    "nav.contact": "Bog'lanish",

    "hero.eyebrow": "Portfolio",
    "hero.cta.contact": "Bog'lanish",
    "hero.cta.projects": "Loyihalarni ko'rish",

    "experience.label": "Tajriba",
    "experience.title": "Mehnat faoliyatim",

    "services.label": "Xizmatlar",
    "services.title": "Men ko'rsatadigan xizmatlar",

    "projects.label": "Portfolio",
    "projects.title": "Loyihalarim",

    "blog.label": "Blog",
    "blog.title": "So'nggi maqolalar",
    "blog.viewAll": "Barcha postlarni ko'rish",
    "blog.back": "Blogga qaytish",

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
    "nav.services": "Услуги",
    "nav.projects": "Проекты",
    "nav.blog": "Блог",
    "nav.contact": "Контакты",

    "hero.eyebrow": "Портфолио",
    "hero.cta.contact": "Связаться",
    "hero.cta.projects": "Смотреть проекты",

    "experience.label": "Опыт",
    "experience.title": "Опыт работы",

    "services.label": "Услуги",
    "services.title": "Услуги, которые я предоставляю",

    "projects.label": "Портфолио",
    "projects.title": "Мои проекты",

    "blog.label": "Блог",
    "blog.title": "Последние статьи",
    "blog.viewAll": "Смотреть все посты",
    "blog.back": "Назад в блог",

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
