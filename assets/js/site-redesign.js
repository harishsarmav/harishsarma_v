document.addEventListener("DOMContentLoaded", function () {

  const nav =
    document.getElementById("hs-nav");

  const menuButton =
    document.querySelector(".hs-menu-toggle");

  const menu =
    document.getElementById("hs-menu");

  const themeButton =
    document.querySelector(".hs-theme-toggle");

  const html =
    document.documentElement;


  /* ==========================================
     THEME
     ========================================== */

  const savedTheme =
    localStorage.getItem("hs-theme");

  if (savedTheme === "light") {

    html.classList.add("hs-light");

  }


  if (themeButton) {

    const updateThemeIcon = () => {

      themeButton.textContent =
        html.classList.contains("hs-light")
          ? "☾"
          : "☀";

    };

    updateThemeIcon();


    themeButton.addEventListener("click", () => {

      html.classList.toggle("hs-light");

      localStorage.setItem(
        "hs-theme",
        html.classList.contains("hs-light")
          ? "light"
          : "dark"
      );

      updateThemeIcon();

    });

  }


  /* ==========================================
     MOBILE MENU
     ========================================== */

  if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

      const open =
        menu.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

    });


    menu.querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          menu.classList.remove("open");

        });

      });

  }


  /* ==========================================
     NAV SCROLL
     ========================================== */

  window.addEventListener(
    "scroll",
    () => {

      if (!nav) return;

      nav.classList.toggle(
        "scrolled",
        window.scrollY > 15
      );

    },
    { passive: true }
  );


  /* ==========================================
     SCROLL REVEAL
     ========================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* ==========================================
     CARD MOUSE EFFECT
     ========================================== */

  const cards =
    document.querySelectorAll(
      ".creative-card, .project-card"
    );


  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth < 900)
          return;

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -4;

        const rotateY =
          ((x / rect.width) - .5) * 4;

        card.style.transform =
          `perspective(700px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

});