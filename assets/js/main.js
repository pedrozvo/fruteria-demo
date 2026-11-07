(function () {
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Video del hero: con movimiento reducido se queda el poster; en los demas
  // casos se intenta reproducir y, si el navegador lo bloquea, el poster sigue visible.
  var v = document.querySelector('.hero video');
  if (v) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      v.removeAttribute('autoplay');
      v.pause();
      // Con movimiento reducido el usuario puede iniciar el video a mano.
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero__toggle';
      btn.setAttribute('aria-label', 'Reproducir video de fondo');
      btn.textContent = '\u25B6';
      btn.addEventListener('click', function () {
        if (v.paused) {
          v.play().then(function () {
            btn.textContent = '\u275A\u275A';
            btn.setAttribute('aria-label', 'Pausar video de fondo');
          }).catch(function () {});
        } else {
          v.pause();
          btn.textContent = '\u25B6';
          btn.setAttribute('aria-label', 'Reproducir video de fondo');
        }
      });
      document.querySelector('.hero').appendChild(btn);
    } else {
      v.muted = true;
      var p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { v.pause(); v.load(); });
      }
    }
  }
  var box = document.querySelector('.lightbox');
  if (box) {
    var big = box.querySelector('img');
    var opener = null;
    document.querySelectorAll('.gallery__item').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b; big.src = b.dataset.full; big.alt = b.dataset.alt; box.showModal();
      });
    });
    box.querySelector('.lightbox__close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target === big) box.close(); });
    box.addEventListener('close', function () { if (opener) opener.focus(); });
  }
})();


