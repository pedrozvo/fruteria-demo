const fs=require('fs');let h=fs.readFileSync('../index.html','utf8');
h=h.replace(/<article class="card card--icon">\s*<svg class="fruit"[^>]*><circle cx="32" cy="34" r="24"[\s\S]*?<\/article>/,
`<article class="card card--icon">
        <img class="card__thumb" src="assets/img/estante-naranjas.webp" alt="Naranjas frescas apiladas en el estante de la frutería" loading="lazy" width="1600" height="1200" style="object-position: 40% 85%">
        <h3>Naranjas</h3>
      </article>`);
const g=`
    <div class="gallery" aria-label="Galería del local">
      <h3>Un vistazo al local</h3>
      <ul class="gallery__track">
        <li><button type="button" class="gallery__item" data-full="assets/img/estante-manzanas.webp" data-alt="Estante con manzanas rojas y verdes y limones en la frutería">
          <img src="assets/img/estante-manzanas.webp" alt="Estante con manzanas rojas y verdes y limones en la frutería" loading="lazy" width="1600" height="1200" style="object-position:50% 70%"><span class="sr-only">Ampliar imagen</span></button></li>
        <li><button type="button" class="gallery__item" data-full="assets/img/estante-ensaladas.webp" data-alt="Mesa con cebollines, rabanitos, pepinos y espinacas frescas">
          <img src="assets/img/estante-ensaladas.webp" alt="Mesa con cebollines, rabanitos, pepinos y espinacas frescas" loading="lazy" width="1200" height="1600" style="object-position:50% 62%"><span class="sr-only">Ampliar imagen</span></button></li>
      </ul>
    </div>
    <dialog class="lightbox" aria-label="Imagen ampliada"><button type="button" class="lightbox__close" aria-label="Cerrar">×</button><img alt=""></dialog>`;
h=h.replace(/(<\/div>\s*<\/div>\s*<\/section>\s*<section class="section section--green")/,`</div>${g}\n  </div>\n</section>\n\n<section class="section section--green"`);
fs.writeFileSync('../index.html',h);
let c=fs.readFileSync('../assets/css/style.css','utf8');
c+=`
.card__thumb{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.gallery{margin-top:3rem}
.gallery h3{font-size:1.6rem;margin-bottom:1rem}
.gallery__track{list-style:none;padding:0 0 .75rem;display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.gallery__track li{flex:0 0 82%;scroll-snap-align:start;max-width:420px}
.gallery__item{display:block;width:100%;padding:0;border:0;border-radius:16px;overflow:hidden;cursor:zoom-in;background:none}
.gallery__item img{width:100%;aspect-ratio:4/3;object-fit:cover}
.lightbox{border:0;padding:0;background:transparent;max-width:96vw;max-height:96vh;overflow:visible}
.lightbox::backdrop{background:rgba(0,0,0,.85)}
.lightbox img{max-width:96vw;max-height:90vh;object-fit:contain;border-radius:8px}
.lightbox__close{position:absolute;top:-2.5rem;right:0;width:44px;height:44px;border:0;border-radius:50%;background:#fff;color:var(--deep);font-size:1.8rem;line-height:1;cursor:pointer}
`;
fs.writeFileSync('../assets/css/style.css',c);
let j=fs.readFileSync('../assets/js/main.js','utf8');
j=j.replace(/\}\)\(\);\s*$/,`
  var box = document.querySelector('.lightbox');
  if (box) {
    var big = box.querySelector('img');
    document.querySelectorAll('.gallery__item').forEach(function (b) {
      b.addEventListener('click', function () {
        big.src = b.dataset.full; big.alt = b.dataset.alt; box.showModal();
      });
    });
    box.querySelector('.lightbox__close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target === big) box.close(); });
  }
})();
`);
fs.writeFileSync('../assets/js/main.js',j);
