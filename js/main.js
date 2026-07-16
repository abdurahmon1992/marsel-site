// Bosh sahifa (index.html) uchun render va UI mantiqi.
// data/content.js dagi SITE_CONTENT asosida barcha bo'limlarni joriy
// tilga mos qilib chizadi.

function currentLang() {
  return getCurrentLang();
}

function localized(value, lang) {
  if (value && typeof value === "object") {
    return value[lang] || value[DEFAULT_LANG] || "";
  }
  return value;
}

function renderProfile() {
  const lang = currentLang();
  const { profile, contact } = SITE_CONTENT;

  document.querySelectorAll("[data-field='name']").forEach((el) => {
    el.textContent = profile.name;
  });
  document.querySelectorAll("[data-field='title']").forEach((el) => {
    el.textContent = profile.title[lang];
  });
  document.querySelectorAll("[data-field='bio']").forEach((el) => {
    el.textContent = profile.bio[lang];
  });
  document.querySelectorAll("[data-field='relocation']").forEach((el) => {
    el.textContent = profile.relocation[lang];
  });
  document.querySelectorAll("[data-field='photo']").forEach((el) => {
    el.style.backgroundImage = `url('${profile.photo}')`;
  });

  document.querySelectorAll("[data-field='email']").forEach((el) => {
    el.textContent = contact.email;
    if (el.tagName === "A") el.href = `mailto:${contact.email}`;
  });
  document.querySelectorAll("[data-field='phone']").forEach((el) => {
    el.textContent = contact.phone;
    if (el.tagName === "A") el.href = `tel:${contact.phone.replace(/\s+/g, "")}`;
  });
  document.querySelectorAll("[data-field='location']").forEach((el) => {
    el.textContent = contact.location[lang];
  });

  const socialsEl = document.getElementById("social-links");
  if (socialsEl) {
    socialsEl.innerHTML = contact.socials
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
      .join("");
  }
}

function renderHighlights() {
  const lang = currentLang();
  const el = document.getElementById("highlights-strip");
  if (!el || !SITE_CONTENT.highlights) return;

  el.innerHTML = SITE_CONTENT.highlights
    .map(
      (item) => `
      <div class="highlight">
        <div class="highlight-value">${item.value}</div>
        <div class="highlight-label">${item.label[lang]}</div>
      </div>`
    )
    .join("");
}

function renderExperience() {
  const lang = currentLang();
  const el = document.getElementById("experience-list");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.experience
    .map(
      (item) => `
      <div class="timeline-item reveal">
        <div class="timeline-period">${item.period[lang]}</div>
        <div class="timeline-role">${item.role[lang]}</div>
        <div class="timeline-company">${item.company}</div>
        <p class="timeline-desc">${item.description[lang]}</p>
      </div>`
    )
    .join("");

  observeReveal();
}

function renderEducation() {
  const lang = currentLang();
  const el = document.getElementById("education-list");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.education
    .map(
      (item) => `
      <div class="timeline-item reveal">
        <div class="timeline-period">${item.period[lang]}</div>
        <div class="timeline-role">${item.degree[lang]}</div>
        <div class="timeline-company">${localized(item.institution, lang)}</div>
      </div>`
    )
    .join("");

  observeReveal();
}

function renderServices() {
  const lang = currentLang();
  const el = document.getElementById("services-grid");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.competencies
    .map(
      (item) => `
      <div class="card reveal">
        <div class="card-icon">${iconGlyph(item.icon)}</div>
        <h3>${item.title[lang]}</h3>
        <p>${item.description[lang]}</p>
      </div>`
    )
    .join("");

  observeReveal();
}

function renderSkills() {
  const lang = currentLang();
  const langEl = document.getElementById("language-list");
  const tagsEl = document.getElementById("skills-tags");
  if (!langEl || !tagsEl) return;

  langEl.innerHTML = SITE_CONTENT.skills.languages
    .map(
      (item) => `
      <div class="language-row reveal">
        <span class="language-name">${item.name[lang]}</span>
        <span class="language-level">${item.level[lang]}</span>
      </div>`
    )
    .join("");

  tagsEl.innerHTML = SITE_CONTENT.skills.tags
    .map((tag) => `<span class="tag">${tag[lang]}</span>`)
    .join("");

  observeReveal();
}

function renderProjects() {
  const lang = currentLang();
  const el = document.getElementById("projects-grid");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.achievements
    .map(
      (item) => `
      <div class="stat-card reveal">
        <div class="stat-metric">${item.metric}</div>
        <h3>${item.title[lang]}</h3>
        <p>${item.description[lang]}</p>
        <div class="stat-company">${item.company}</div>
      </div>`
    )
    .join("");

  observeReveal();
}

function renderRecommendations() {
  const lang = currentLang();
  const el = document.getElementById("recommendations-grid");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.recommendations
    .map(
      (item) => `
      <div class="card reveal">
        <h3>${item.name}</h3>
        <p>${item.role[lang]} — ${item.company}</p>
      </div>`
    )
    .join("");

  observeReveal();
}

function iconGlyph(name) {
  const glyphs = {
    target: "&#127919;",
    share: "&#128172;",
    megaphone: "&#128226;",
    sparkle: "&#10024;",
  };
  return glyphs[name] || "&#9679;";
}

function renderAll() {
  renderProfile();
  renderHighlights();
  renderExperience();
  renderEducation();
  renderServices();
  renderSkills();
  renderProjects();
  renderRecommendations();
}

function observeReveal() {
  const items = document.querySelectorAll(".reveal:not(.is-visible)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => header.classList.remove("nav-open"));
  });
}

// Skroll paytida joriy bo'limga mos navigatsiya havolasini yoritadi.
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initMobileNav();
  initScrollSpy();
});

document.addEventListener("langchange", renderAll);
