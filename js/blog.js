// Blog ro'yxati (blog/index.html) va bitta post sahifasi (blog/post.html) uchun
// render mantiqi. Postlar data/posts.js da ro'yxatlanadi, matn esa blog/posts/*.md
// fayllaridan marked.js orqali o'qiladi.

function sortedPosts() {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Ba'zi brauzerlarda "uz" lokali uchun ICU ma'lumotlari to'liq bo'lmasligi
// mumkin (Intl noto'g'ri chiqishi mumkin), shuning uchun oy nomlari qo'lda
// belgilanadi.
const MONTH_NAMES = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
};

function formatDate(dateStr, lang) {
  const date = new Date(dateStr);
  const months = MONTH_NAMES[lang] || MONTH_NAMES.uz;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function renderBlogList() {
  const el = document.getElementById("blog-list");
  if (!el) return;

  const lang = getCurrentLang();
  el.innerHTML = sortedPosts()
    .map(
      (post) => `
      <a class="blog-item" href="post.html?slug=${post.slug}">
        <div class="blog-item-main">
          <h3>${post.title[lang]}</h3>
          <p>${post.excerpt[lang]}</p>
        </div>
        <div class="blog-item-date">${formatDate(post.date, lang)}</div>
      </a>`
    )
    .join("");
}

function renderHomeBlogPreview() {
  const el = document.getElementById("blog-preview-list");
  if (!el) return;

  const lang = getCurrentLang();
  el.innerHTML = sortedPosts()
    .slice(0, 3)
    .map(
      (post) => `
      <a class="blog-item" href="blog/post.html?slug=${post.slug}">
        <div class="blog-item-main">
          <h3>${post.title[lang]}</h3>
          <p>${post.excerpt[lang]}</p>
        </div>
        <div class="blog-item-date">${formatDate(post.date, lang)}</div>
      </a>`
    )
    .join("");
}

async function renderBlogPost() {
  const el = document.getElementById("post-content");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    el.innerHTML = "<p>Post topilmadi.</p>";
    return;
  }

  const lang = getCurrentLang();
  document.title = post.title[lang];
  document.getElementById("post-title").textContent = post.title[lang];
  document.getElementById("post-date").textContent = formatDate(post.date, lang);

  try {
    const response = await fetch(post.file);
    const markdown = await response.text();
    el.innerHTML = marked.parse(markdown);
  } catch (err) {
    el.innerHTML = "<p>Postni yuklashda xatolik yuz berdi.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderBlogList();
  renderHomeBlogPreview();
  renderBlogPost();
});

document.addEventListener("langchange", () => {
  renderBlogList();
  renderHomeBlogPreview();
  renderBlogPost();
});
