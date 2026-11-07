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

  // Algunos navegadores bloquean el autoplay: reintentar sin ruido.
  var v = document.querySelector('.hero video');
  if (v && v.paused) v.play().catch(function () {});

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
