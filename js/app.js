// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-nav");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

// Keep the footer year current.
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Shared branded footer decoration, using the paw mark from logo-pawsitive-futures2.svg.
const footerPawMarkup = `
  <svg class="footer-paw-sprite" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <g id="footer-brand-paw">
        <path d="M80.88,82.49c12.8-1.5,25.1,5.1,31.8,15.9s5.9,21-4.5,26.8c-10.5,5.8-16.9-5.3-27.4-1.9s-12.9,6.9-21.2-.2c-16.2-13.8,4.7-38.5,21.4-40.5h0l-.1-.1Z" />
        <path d="M67.28,49.99c9.9-2.2,15.4,18,7.2,20.6s-16.3-18.6-7.2-20.6Z" />
        <path d="M99.78,50.09c6.8-1.4,8.2,5.8,7,11-1.2,5.2-7.2,12.9-12.4,8.6-5.6-4.7-1-18.3,5.4-19.6Z" />
        <path d="M43.38,67.99c9.2-1.5,18.2,15.1,10,18.5-10.1,4.1-20.7-16.7-10-18.5Z" />
        <path d="M124.78,67.99c13.4-1.9,4.1,22.2-7.4,18.6-8.4-2.6-.8-17.5,7.4-18.6Z" />
      </g>
    </defs>
  </svg>
  <svg class="footer-paw footer-paw-middle" aria-hidden="true" viewBox="35 42 100 90"><use href="#footer-brand-paw" /></svg>
  <svg class="footer-paw footer-paw-right" aria-hidden="true" viewBox="35 42 100 90"><use href="#footer-brand-paw" /></svg>
  <svg class="footer-paw footer-paw-lower" aria-hidden="true" viewBox="35 42 100 90"><use href="#footer-brand-paw" /></svg>
  <svg class="footer-paw footer-paw-left" aria-hidden="true" viewBox="35 42 100 90"><use href="#footer-brand-paw" /></svg>
`;

document.querySelectorAll(".site-footer").forEach((footer) => {
  footer.insertAdjacentHTML("afterbegin", footerPawMarkup);
});

// Pet search and filtering
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".pet-card");
const resultCount = document.querySelector("[data-result-count]");
const resultLabel = document.querySelector("[data-result-label]");
const petSearch = document.querySelector("[data-pet-search]");
const searchForm = document.querySelector("[data-pet-search-form]");
const searchClear = document.querySelector("[data-search-clear]");
const noResults = document.querySelector("[data-no-results]");

let activeFilter = "all";

const updatePets = () => {
  const query = petSearch?.value.trim().toLowerCase() || "";
  let count = 0;

  cards.forEach((card) => {
    const matchesType =
      activeFilter === "all" || card.dataset.type === activeFilter;
    const searchableText = card.textContent.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const show = matchesType && matchesSearch;

    card.hidden = !show;

    if (show) {
      count += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = count;
  }

  if (resultLabel) {
    resultLabel.textContent =
      count === 1 ? "featured friend shown" : "featured friends shown";
  }

  if (noResults) {
    noResults.hidden = count !== 0;
  }

  if (searchClear) {
    searchClear.hidden = !query;
  }
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;

    filters.forEach((button) => {
      button.classList.toggle("is-active", button === filter);
    });

    updatePets();
  });
});

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

petSearch?.addEventListener("input", updatePets);

searchClear?.addEventListener("click", () => {
  petSearch.value = "";
  petSearch.focus();
  updatePets();
});

if (petSearch) {
  const queryFromUrl = new URLSearchParams(window.location.search).get("q");

  if (queryFromUrl) {
    petSearch.value = queryFromUrl;
  }

  updatePets();
}

// Pet interest modal
const modal = document.querySelector("#pet-modal");

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll("[data-pet]").forEach((button) => {
  button.addEventListener("click", () => {
    const petName = document.querySelector("[data-pet-name]");

    if (petName) {
      petName.textContent = button.dataset.pet;
    }

    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector(".modal-close")?.focus();
    }
  });
});

document.querySelector(".modal-close")?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Contact form feedback
document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim() || "there";
    const status = form.querySelector(".form-status");

    status.textContent = `Thanks, ${name}! Your message is ready for our team.`;
    form.reset();
  });

// Get Involved form feedback
document
  .querySelector("[data-involvement-form]")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim() || "there";
    const path = form.elements.path.value.toLowerCase();
    const status = form.querySelector(".form-status");

    status.textContent =
      `Thanks, ${name}! Your ${path} interest is ready for our team.`;
    form.reset();
  });
