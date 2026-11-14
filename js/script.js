// Change this to Coco Villa's WhatsApp number in international format.
// Example for Sri Lanka: 94771234567 (no + sign, spaces, or punctuation).
const WHATSAPP_NUMBER = "94760687716";

const CATEGORIES = ["All Books", "Literary Fiction", "Historical Fiction", "Mystery & Thriller", "Inspirational", "Memoir & Travel"];
const grid = document.getElementById("bookGrid");
const filters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("bookModal");
let activeCategory = "All Books";
let lastFocusedElement = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function coverMarkup(book, extraClass = "") {
  const safeTitle = escapeHTML(book.title);
  const safeImage = escapeHTML(book.image);
  return `<div class="cover-placeholder" hidden aria-label="Cover image unavailable for ${safeTitle}"><span>COCO VILLA · GUEST LIBRARY</span><strong>${safeTitle}</strong><span>${escapeHTML(book.author)}</span></div>
    <img class="${extraClass}" src="${safeImage}" alt="Cover of ${safeTitle}" loading="lazy" onerror="this.hidden=true; this.previousElementSibling.hidden=false;">`;
}
function renderFilters() {
  filters.innerHTML = CATEGORIES.map(category =>
    `<button type="button" class="filter-chip ${activeCategory === category ? "active" : ""}" data-category="${escapeHTML(category)}" aria-pressed="${activeCategory === category}">${escapeHTML(category)}</button>`
  ).join("");
}
function getFilteredBooks() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  return window.BOOKS.filter(book => {
    const matchesCategory = activeCategory === "All Books" || book.category === activeCategory;
    const matchesSearch = !query || `${book.title} ${book.author}`.toLocaleLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
}
function renderBooks() {
  const books = getFilteredBooks();
  resultsCount.textContent = `${books.length} ${books.length === 1 ? "book" : "books"} to explore`;
  grid.innerHTML = books.map((book, index) => `
    <article class="book-card" style="animation-delay:${Math.min(index * 45, 250)}ms">
      <div class="cover-frame">
        <div hidden>${""}</div>
        ${coverMarkup(book)}
      </div>
      <div class="book-info">
        <p class="book-category">${escapeHTML(book.category)}</p>
        <h3>${escapeHTML(book.title)}</h3>
        <p class="book-author">by ${escapeHTML(book.author)}</p>
        <p class="book-description">${escapeHTML(book.description)}</p>
        <button class="request-button" type="button" data-book-id="${escapeHTML(book.id)}">Request This Book ↗</button>
      </div>
    </article>`).join("");
  emptyState.hidden = books.length !== 0;
  grid.hidden = books.length === 0;
}
function openBook(book) {
  lastFocusedElement = document.activeElement;
  document.getElementById("modalCoverWrap").innerHTML = coverMarkup(book);
  document.getElementById("modalCoverWrap").querySelector(".cover-placeholder").hidden = true;
  document.getElementById("modalCategory").textContent = book.category;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = `by ${book.author}`;
  document.getElementById("modalDescription").textContent = book.description;
  const message = `Hello Coco Villa!\n\nI'm currently staying at Coco Villa and would love to borrow a book from your guest library.\n\nBook: ${book.title}\nAuthor: ${book.author}\n\nCould you please let me know if this book is available?\n\nThank you!`;
  const link = document.getElementById("whatsappLink");
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.setAttribute("aria-label", `Request ${book.title} via WhatsApp`);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}
filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters(); renderBooks();
});
searchInput.addEventListener("input", renderBooks);
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-book-id]");
  if (!button) return;
  const book = window.BOOKS.find(item => item.id === button.dataset.bookId);
  if (book) openBook(book);
});
document.getElementById("clearFilters").addEventListener("click", () => {
  activeCategory = "All Books"; searchInput.value = ""; renderFilters(); renderBooks();
});
document.getElementById("resetEmpty").addEventListener("click", () => {
  activeCategory = "All Books"; searchInput.value = ""; renderFilters(); renderBooks();
});
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && !modal.classList.contains("open")) {
    event.preventDefault(); searchInput.focus();
  }
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.addEventListener("click", event => {
  if (event.target.closest("a")) { mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); }
});
document.getElementById("year").textContent = new Date().getFullYear();
renderFilters();
renderBooks();
