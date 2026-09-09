document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("hs-nav");
  const toggle = document.querySelector(".hs-menu-toggle");
  const menu = document.getElementById("hs-menu");
  const theme = document.querySelector(".hs-theme-toggle");
  const root = document.documentElement;

  if (localStorage.getItem("hs-theme") === "dark") root.classList.add("hs-dark");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
  }

  if (theme) {
    const updateIcon = () => theme.textContent = root.classList.contains("hs-dark") ? "☀" : "☾";
    updateIcon();
    theme.addEventListener("click", () => {
      root.classList.toggle("hs-dark");
      localStorage.setItem("hs-theme", root.classList.contains("hs-dark") ? "dark" : "light");
      updateIcon();
    });
  }

  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });
});
