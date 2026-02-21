// Mobile menu toggle
(() => {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("#navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
})();

// Gallery search + copy button (works only on gallery.html)
(() => {
  const search = document.getElementById("artSearch");
  const items = document.querySelectorAll(".artwork");
  if (search && items.length) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      items.forEach((el) => {
        const title = el.dataset.title || "";
        const year = el.dataset.year || "";
        const match = !q || title.includes(q) || year.includes(q);
        el.style.display = match ? "" : "none";
      });
    });
  }

  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Kopirano ✓";
        setTimeout(() => (btn.textContent = old), 1200);
      } catch {
        // fallback
        prompt("Kopiraj tekst:", text);
      }
    });
  });
})();
