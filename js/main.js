// Bosh sahifa (index.html) uchun render va UI mantiqi.
// data/content.js dagi SITE_CONTENT asosida experience/services/projects/contact
// bo'limlarini joriy tilga mos qilib chizadi.

function currentLang() {
  return getCurrentLang();
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

function renderServices() {
  const lang = currentLang();
  const el = document.getElementById("services-grid");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.services
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

function renderProjects() {
  const lang = currentLang();
  const el = document.getElementById("projects-grid");
  if (!el) return;

  el.innerHTML = SITE_CONTENT.projects
    .map(
      (item) => `
      <a class="project-card reveal" href="${item.link}">
        <div class="project-image" style="background-image:url('${item.image}');background-size:cover;background-position:center;"></div>
        <div class="project-body">
          <div class="project-tags">
            ${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
          <h3>${item.title[lang]}</h3>
          <p>${item.description[lang]}</p>
        </div>
      </a>`
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
  renderExperience();
  renderServices();
  renderProjects();
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

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initMobileNav();
});

document.addEventListener("langchange", renderAll);
