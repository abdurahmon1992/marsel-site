// Yorug'/qorong'i mavzu (dark mode) boshqaruvi.
// Boshlang'ich mavzu <head> dagi inline skript orqali darhol qo'llaniladi
// (miltillashning oldini olish uchun); bu fayl esa tugma mantiqini ulaydi.
(function () {
  const THEME_KEY = "site-theme";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function storedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function currentTheme() {
    return storedTheme() || (systemPrefersDark() ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0f1115" : "#ffffff");
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      const icon = btn.querySelector(".theme-toggle-icon");
      if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  function initThemeToggle() {
    applyTheme(currentTheme());

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
      });
    });

    // Tizim mavzusi o'zgarsa va foydalanuvchi qo'lda tanlamagan bo'lsa — kuzatib boramiz.
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!storedTheme()) applyTheme(e.matches ? "dark" : "light");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initThemeToggle);
})();
