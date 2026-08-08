const body = document.body;
const rail = document.querySelector("#rail");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-panel");
const statusTitle = document.querySelector("#status-title");
const panels = [...document.querySelectorAll(".panel")];

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

menu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setMenu(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

rail.addEventListener(
  "wheel",
  (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      rail.scrollLeft += event.deltaY;
    }
  },
  { passive: false }
);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      statusTitle.textContent = visible.target.dataset.section || "Neon Rebels";
    }
  },
  {
    root: rail,
    threshold: [0.45, 0.65, 0.85],
  }
);

panels.forEach((panel) => observer.observe(panel));
