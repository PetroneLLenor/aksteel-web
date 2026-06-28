/* Hamburger menu: otevře/zavře fullscreen overlay. */
(function () {
  "use strict";

  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var closeBtn = document.getElementById("menu-close");
  if (!toggle || !menu) return;

  function open() {
    menu.classList.add("open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }
  function close() {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  toggle.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);

  // klik na ztmavené pozadí (mimo panel) zavře
  menu.addEventListener("click", function (e) {
    if (e.target === menu) close();
  });

  // klik na položku (skok na sekci) menu zavře
  var links = menu.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", close);
  }

  // Esc zavře
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
