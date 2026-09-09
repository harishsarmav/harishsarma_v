document.addEventListener("DOMContentLoaded", function () {

  const nav = document.getElementById("hs-nav");
  const toggle = document.querySelector(".hs-menu-toggle");
  const menu = document.getElementById("hs-menu");
  const theme = document.querySelector(".hs-theme-toggle");
  const root = document.documentElement;


  /* =====================================================
     THEME
     ===================================================== */

  if (localStorage.getItem("hs-theme") === "dark") {
    root.classList.add("hs-dark");
  }

  if (theme) {

    const updateIcon = () => {
      theme.textContent =
        root.classList.contains("hs-dark")
          ? "☀"
          : "☾";
    };

    updateIcon();

    theme.addEventListener("click", () => {

      root.classList.toggle("hs-dark");

      localStorage.setItem(
        "hs-theme",
        root.classList.contains("hs-dark")
          ? "dark"
          : "light"
      );

      updateIcon();
    });
  }


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  if (toggle && menu) {

    toggle.addEventListener("click", () => {

      const open = menu.classList.toggle("open");

      toggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );
    });


    menu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });

    });
  }


  /* =====================================================
     NAV SCROLL EFFECT
     ===================================================== */

  const updateNav = () => {

    if (!nav) return;

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  };

  window.addEventListener(
    "scroll",
    updateNav,
    { passive: true }
  );

  updateNav();


  /* =====================================================
     MOUSE SPOTLIGHT
     ===================================================== */

  let mouseX = 50;
  let mouseY = 30;

  document.addEventListener("mousemove", (event) => {

    mouseX =
      (event.clientX / window.innerWidth) * 100;

    mouseY =
      (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
      "--mouse-x",
      mouseX + "%"
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      mouseY + "%"
    );

  });


  /* =====================================================
     CARD TILT
     ===================================================== */

  const cards = document.querySelectorAll(
    ".hs-current-card, .hs-project-card"
  );

  cards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth < 900) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -3;

      const rotateY =
        ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =====================================================
     REVEAL SECTIONS
     ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".hs-section-heading, .hs-current-card, .hs-project-card, .hs-note, .hs-cta"
    );


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "hs-visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    observer.observe(element);
  });

});