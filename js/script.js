// Discount Donny — site logic
// This file reads data/deals.json and renders it. You should never need to
// edit this file to add or change deals — just edit data/deals.json.

let ALL_DEALS = [];
let activeCategory = "All";
let activeQuery = "";

const grid = document.getElementById("deal-grid");
const filtersEl = document.getElementById("filters");
const resultsLabel = document.getElementById("results-label");
const ticker = document.getElementById("ticker");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

document.getElementById("year").textContent = new Date().getFullYear();

fetch("data/deals.json")
  .then((res) => {
    if (!res.ok) throw new Error("Could not load deals.json");
    return res.json();
  })
  .then((deals) => {
    ALL_DEALS = deals;
    buildFilters(deals);
    updateTicker(deals);
    render();
  })
  .catch((err) => {
    grid.innerHTML = `<p class="empty-state">Couldn't load deals right now. (${err.message})</p>`;
  });

function buildFilters(deals) {
  const categories = ["All", ...new Set(deals.map((d) => d.category))];
  filtersEl.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn${cat === "All" ? " active" : ""}" data-cat="${cat}">${cat}</button>`
    )
    .join("");

  filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      filtersEl
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
  });
}

function updateTicker(deals) {
  const today = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  ticker.innerHTML = `<strong>${deals.length}</strong> deals live &middot; updated ${today}`;
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  activeQuery = searchInput.value.trim().toLowerCase();
  render();
});

function render() {
  let deals = ALL_DEALS.slice();

  if (activeCategory !== "All") {
    deals = deals.filter((d) => d.category === activeCategory);
  }

  if (activeQuery) {
    deals = deals.filter((d) =>
      [d.title, d.store, d.category, d.description]
        .join(" ")
        .toLowerCase()
        .includes(activeQuery)
    );
  }

  // Featured deals first, then newest
  deals.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  resultsLabel.textContent =
    activeCategory === "All" ? "Today's deals" : activeCategory + " deals";

  if (deals.length === 0) {
    grid.innerHTML = `<p class="empty-state">No deals match that search yet. Try another term or check back soon.</p>`;
    return;
  }

  grid.innerHTML = deals.map(dealCard).join("");
}

function dealCard(deal) {
  const stamp = deal.featured
    ? `<span class="stamp">Donny's Pick</span>`
    : "";
  const wasPrice = deal.wasPrice
    ? `<span class="deal-was">${escapeHtml(deal.wasPrice)}</span>`
    : "";
  const badge = deal.discount
    ? `<span class="discount-badge">${escapeHtml(deal.discount)}</span>`
    : "";

  return `
    <a class="deal-card" href="${escapeAttr(deal.link)}" target="_blank" rel="noopener sponsored">
      ${badge}
      ${stamp}
      <div class="deal-card-top">
        <p class="deal-store">${escapeHtml(deal.store)}</p>
        <h3 class="deal-title">${escapeHtml(deal.title)}</h3>
        <div class="deal-price-row">
          <span class="deal-price">${escapeHtml(deal.price)}</span>
          ${wasPrice}
        </div>
      </div>
      <div class="deal-card-bottom">
        <p class="deal-desc">${escapeHtml(deal.description)}</p>
        <span class="deal-cta">Get this deal</span>
      </div>
    </a>
  `;
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function escapeAttr(str) {
  return escapeHtml(str);
}
