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

// Detailed pet profiles
const modal = document.querySelector("#pet-modal");
let lastFocusedPetButton;

const petProfiles = {
  Sunny: {
    glance: "Dog · 3 years · Small · Maltese–Poodle mix · Female",
    personality: "Playful, affectionate, and happiest when there is a person nearby to share the day with.",
    energy: "High",
    goodWith: "Children · Dogs",
    care: "Daily walks, play, and time to practise good manners.",
    health: "Routine wellness care is up to date.",
    home: "An active home ready for companionship and outdoor time.",
    status: "Available for adoption",
  },
  Miso: {
    glance: "Cat · 2 years · Medium · Domestic shorthair · Female",
    personality: "A gentle observer who takes a little time to settle, then seeks out sunny windows and quiet company.",
    energy: "Low to moderate",
    goodWith: "Calm adults and patient older children",
    care: "A predictable routine, cosy resting spots, and gentle play.",
    health: "Routine wellness care is up to date.",
    home: "A calm, patient home where she can settle in at her own pace.",
    status: "Available for adoption",
  },
  Maple: {
    glance: "Rabbit · 8 months · Small · English Spot mix · Female",
    personality: "Curious, soft-natured, and full of charming hops once she feels comfortable in her space.",
    energy: "Moderate",
    goodWith: "Patient adults and respectful older children",
    care: "Room to hop, daily enrichment, and fresh greens as part of her routine.",
    health: "Routine wellness care is up to date.",
    home: "A quiet home with a safe, roomy rabbit setup.",
    status: "Available for adoption",
  },
  Bowie: {
    glance: "Dog · 6 months · Small · Pomeranian–Spitz mix · Male",
    personality: "Easy-going and people-focused, Bowie is happiest close to his favourite humans.",
    energy: "Moderate",
    goodWith: "Children and adults who enjoy a steady companion",
    care: "Short daily walks, gentle play, and plenty of together time.",
    health: "Routine wellness care is up to date.",
    home: "A caring home looking for a friendly young dog to grow with.",
    status: "Available for adoption",
  },
  Pepper: {
    glance: "Cat · 2 years · Medium · Domestic shorthair tabby · Male",
    personality: "A warm cuddle companion with a playful streak and a talent for making a home feel lived in.",
    energy: "Moderate",
    goodWith: "Adults and calm households",
    care: "Interactive play, cosy resting spots, and a regular routine.",
    health: "Routine wellness care is up to date.",
    home: "A loving home with time for affection and play.",
    status: "Available for adoption",
  },
  Clover: {
    glance: "Rabbit · 12 months · Small · Netherland Dwarf mix · Female",
    personality: "Calm, sweet, and happiest when exploring at a gentle pace with fresh greens nearby.",
    energy: "Low to moderate",
    goodWith: "Patient adults and respectful older children",
    care: "A safe rabbit enclosure, daily enrichment, and fresh greens.",
    health: "Routine wellness care is up to date.",
    home: "A peaceful home with room for a well-planned rabbit habitat.",
    status: "Available for adoption",
  },
};

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedPetButton?.focus();
};

document.querySelectorAll("[data-pet]").forEach((button) => {
  button.addEventListener("click", () => {
    const petName = button.dataset.pet;
    const profile = petProfiles[petName];
    const card = button.closest(".pet-card");
    const image = card?.querySelector("img");

    if (!profile || !modal) return;

    lastFocusedPetButton = button;
    modal.querySelector("[data-pet-name]").textContent = petName;
    modal.querySelector("[data-profile-glance]").textContent = profile.glance;
    modal.querySelector("[data-profile-image]").src = image?.src || "";
    modal.querySelector("[data-profile-image]").alt = image?.alt || `${petName} ready for adoption`;
    modal.querySelector("[data-profile-type]").textContent = card?.querySelector(".pet-type")?.textContent || "";
    modal.querySelector("[data-profile-personality]").textContent = profile.personality;
    modal.querySelector("[data-profile-energy]").textContent = profile.energy;
    modal.querySelector("[data-profile-good-with]").textContent = profile.goodWith;
    modal.querySelector("[data-profile-care]").textContent = profile.care;
    modal.querySelector("[data-profile-health]").textContent = profile.health;
    modal.querySelector("[data-profile-home]").textContent = profile.home;
    modal.querySelector("[data-profile-status]").textContent = profile.status;

    const contactLink = modal.querySelector("[data-profile-contact]");
    contactLink.href = `contact.html?topic=Adoption&pet=${encodeURIComponent(petName)}#contact-form`;
    contactLink.innerHTML = `I’m interested in ${petName} <span>→</span>`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close")?.focus();
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

  if (event.key === "Tab" && modal?.classList.contains("is-open")) {
    const focusable = [...modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// Contact form feedback
const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const enquiry = new URLSearchParams(window.location.search);
  const topic = enquiry.get("topic");
  const pet = enquiry.get("pet");

  if (topic && [...contactForm.elements.topic.options].some((option) => option.value === topic)) {
    contactForm.elements.topic.value = topic;
  }

  if (pet) {
    contactForm.elements.message.value = `I’m interested in learning more about ${pet}.`;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value.trim() || "there";
    const status = form.querySelector(".form-status");

    status.textContent = `Thanks, ${name}! Your message is ready for our team.`;
    form.reset();
  });
}

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

// Guide the volunteer CTA to the existing form with the relevant path selected.
document.querySelectorAll("[data-volunteer-cta]").forEach((cta) => {
  cta.addEventListener("click", (event) => {
    event.preventDefault();

    const form = document.querySelector("[data-involvement-form]");
    const pathField = form?.elements.path;
    const formSection = document.querySelector("#interest-form");

    if (pathField) {
      pathField.value = "Volunteering";
    }

    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#interest-form");
  });
});
