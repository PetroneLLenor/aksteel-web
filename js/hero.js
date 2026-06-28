/* Hero: fullscreen fotky se pomalu prolínají (crossfade) každých 20 s.
   Decentní pohyb — web "žije", ale nic netahá pozornost od fotek.
   Pool = úvodní fotka každého projektu; pořadí staticky vypsané (web
   nepotřebuje žádný backend). */
(function () {
  "use strict";

  // Seznam i poradi generuje WEB 04/scripts/web_hero.py (soubor hero-images.js).
  var HERO_IMAGES = window.HERO_IMAGES || [];

  var INTERVAL_MS = 20000;   // jak dlouho fotka zustane
  var FADE_MS = 1400;        // delka prolnuti

  var a = document.getElementById("hero-a");   // spodni vrstva
  var b = document.getElementById("hero-b");   // horni vrstva (prolina se pres spodni)
  if (!a || !b || HERO_IMAGES.length < 2) return;

  function zoom(el) {                // klasicky Ken Burns - restart na nove fotce
    el.classList.remove("hero__img--zoom");
    void el.offsetWidth;
    el.classList.add("hero__img--zoom");
  }

  // start na NÁHODNÉ fotce - každé načtení / každý divák jiná fáze
  var i = Math.floor(Math.random() * HERO_IMAGES.length);
  a.src = HERO_IMAGES[i];
  zoom(a);

  function step() {
    var n = (i + 1) % HERO_IMAGES.length;
    b.src = HERO_IMAGES[n];
    b.style.transition = "opacity " + FADE_MS + "ms ease";
    requestAnimationFrame(function () { b.style.opacity = "1"; });
    setTimeout(function () {
      a.src = HERO_IMAGES[n];        // spodni dorovna na novou fotku
      zoom(a);                       // nova fotka zacne pomalu najizdet (pod kryci vrstvou)
      b.style.transition = "none";   // horni vrstvu skryjeme bez problikuti
      b.style.opacity = "0";
      i = n;
    }, FADE_MS);
  }

  setInterval(step, INTERVAL_MS);
})();
