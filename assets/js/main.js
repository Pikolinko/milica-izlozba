// =========================================================
// MILICA NOVAKOVIĆ — MAIN.JS
// Mobile navigation + gallery search/copy + events filter
// =========================================================


// ---------------------------------------------------------
// 1. MOBILE MENU
// ---------------------------------------------------------

(() => {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("#navMenu");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  // Zatvori meni nakon klika na link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ESC zatvara mobilni meni
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
})();


// ---------------------------------------------------------
// 2. GALLERY SEARCH
// Radi samo na gallery.html
// ---------------------------------------------------------

(() => {
  const search = document.getElementById("artSearch");
  const items = document.querySelectorAll(".artwork");

  if (!search || !items.length) return;

  search.addEventListener("input", () => {
    const query = search.value
      .trim()
      .toLowerCase();

    items.forEach((item) => {
      const title = (
        item.dataset.title || ""
      ).toLowerCase();

      const year = (
        item.dataset.year || ""
      ).toLowerCase();

      const matches =
        !query ||
        title.includes(query) ||
        year.includes(query);

      item.style.display = matches ? "" : "none";
    });
  });
})();


// ---------------------------------------------------------
// 3. COPY DESCRIPTION BUTTONS
// Radi na gallery.html
// ---------------------------------------------------------

(() => {
  const copyButtons =
    document.querySelectorAll(".copy-btn");

  if (!copyButtons.length) return;

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const text =
        button.getAttribute("data-copy") || "";

      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);

        const oldText = button.textContent;

        button.textContent = "Kopirano ✓";

        setTimeout(() => {
          button.textContent = oldText;
        }, 1200);

      } catch (error) {

        // Fallback za browsere gde clipboard nije dozvoljen
        window.prompt(
          "Kopiraj tekst:",
          text
        );
      }
    });
  });
})();


// ---------------------------------------------------------
// 4. EVENTS FILTER
// Radi samo na events.html
// AKTUELNO | PREDSTOJEĆE | PRETHODNO
// ---------------------------------------------------------

(() => {
  const filterButtons =
    document.querySelectorAll(
      "[data-event-filter]"
    );

  const eventGroups =
    document.querySelectorAll(
      "[data-event-group]"
    );

  if (
    !filterButtons.length ||
    !eventGroups.length
  ) {
    return;
  }

  const showGroup = (filterName) => {

    // Prikaži samo izabranu grupu
    eventGroups.forEach((group) => {

      const groupName =
        group.dataset.eventGroup;

      const shouldShow =
        groupName === filterName;

      group.hidden = !shouldShow;
    });


    // Aktivno stanje dugmeta
    filterButtons.forEach((button) => {

      const isActive =
        button.dataset.eventFilter ===
        filterName;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });
  };


  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filterName =
          button.dataset.eventFilter;

        if (!filterName) return;

        showGroup(filterName);
      }
    );
  });


  // Podrazumevano prikaži AKTUELNO
  showGroup("current");
})();


// ---------------------------------------------------------
// 5. SMOOTH SCROLL ZA LINKOVE KA ELEMENTIMA NA ISTOJ STRANI
// ---------------------------------------------------------

(() => {
  const links =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  if (!links.length) return;

  links.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetId
          );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });
})();