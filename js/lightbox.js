/* Lightbox: klik na fotku v projektu ji zvětší (plná verze).
   Listování ‹ › / šipky / swipe v rámci JEDNOHO projektu. Zavře ×, Esc,
   nebo klik mimo fotku. */
(function () {
  "use strict";

  var overlay, imgEl, counterEl, list = [], idx = 0;

  function build() {
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML =
      '<button class="lightbox__close" aria-label="Zavřít">×</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Předchozí">‹</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__next" aria-label="Další">›</button>' +
      '<div class="lightbox__counter"></div>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector(".lightbox__img");
    counterEl = overlay.querySelector(".lightbox__counter");
    overlay.querySelector(".lightbox__close").addEventListener("click", close);
    overlay.querySelector(".lightbox__prev").addEventListener("click", function (e) {
      e.stopPropagation(); show(idx - 1);
    });
    overlay.querySelector(".lightbox__next").addEventListener("click", function (e) {
      e.stopPropagation(); show(idx + 1);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
  }

  function show(i) {
    if (!list.length) return;
    idx = (i + list.length) % list.length;
    imgEl.src = list[idx];
    counterEl.textContent = (idx + 1) + " / " + list.length;
  }

  function open(photos, start) {
    if (!overlay) build();
    list = photos;
    document.body.classList.add("menu-open");   // zamkne scroll na pozadi
    overlay.classList.add("open");
    show(start);
  }

  function close() {
    overlay.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  // klik kdekoli na projekt otevre cely projekt (plne verze fotek)
  document.addEventListener("click", function (e) {
    var proj = e.target.closest(".projekt");
    if (!proj) return;
    var media = proj.querySelector("[data-photos]");
    if (!media) return;
    var photos;
    try { photos = JSON.parse(media.getAttribute("data-photos") || "[]"); }
    catch (err) { photos = []; }
    if (photos.length) open(photos, 0);
  });

  // klavesnice
  document.addEventListener("keydown", function (e) {
    if (!overlay || !overlay.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });

  // swipe na mobilu
  var sx = 0;
  document.addEventListener("touchstart", function (e) {
    if (overlay && overlay.classList.contains("open")) sx = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (!overlay || !overlay.classList.contains("open")) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
