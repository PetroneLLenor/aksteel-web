/* Proud "Projekty": editorální alternující layout. Každý projekt = řádek,
   fotka na jedné straně, vedle ní info (kód, počet, místo pro budoucí text).
   Strany se střídají (vlevo / vpravo). Klik kdekoli na projekt = lightbox
   s celým projektem.
   Data dodává js/projekty-data.js (generuje WEB 04/scripts/web_hero.py). */
(function () {
  "use strict";

  var data = window.PROJEKTY || [];
  var root = document.getElementById("projekty-list");
  if (!root || !data.length) return;

  function pl(n) {
    if (n === 1) return "1 fotka";
    if (n >= 2 && n <= 4) return n + " fotky";
    return n + " fotek";
  }

  data.forEach(function (projekt) {
    var block = document.createElement("article");
    block.className = "projekt";

    var media = document.createElement("figure");
    media.className = "projekt__media";
    media.setAttribute("data-photos",
      JSON.stringify(projekt.fotky.map(function (f) { return f.f; })));
    var lead = document.createElement("img");
    lead.src = projekt.fotky[0].w;
    lead.alt = "Realizace AK Steel " + projekt.kod;
    lead.loading = "lazy";
    media.appendChild(lead);

    var info = document.createElement("div");
    info.className = "projekt__info";
    var index = document.createElement("div");
    index.className = "projekt__index";
    index.textContent = projekt.kod;
    info.appendChild(index);
    var meta = document.createElement("div");
    meta.className = "projekt__meta";
    meta.textContent = pl(projekt.fotky.length);
    info.appendChild(meta);

    block.appendChild(media);
    block.appendChild(info);
    root.appendChild(block);
  });
})();
