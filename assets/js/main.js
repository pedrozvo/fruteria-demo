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

  // Video del hero: con prefers-reduced-motion deja solo el poster y avisa en consola;
  // en caso normal arranca silenciado, registra video.error?.code si ocurre error,
  // y si play() falla reintenta en el primer scroll o toque.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var video = document.querySelector('.hero video');
  if (video) {
    video.addEventListener('error', function () {
      if (video.error && video.error.code) {
        console.warn('Error en video del hero, code:', video.error.code);
      }
    });

    if (reduce) {
      video.removeAttribute('autoplay');
      video.pause();
      while (video.firstChild) {
        video.removeChild(video.firstChild);
      }
      video.removeAttribute('src');
      video.load();
      console.info('prefers-reduced-motion: reduce activo; se muestra solo el poster del hero.');
    } else {
      video.defaultMuted = true;
      video.muted = true;
      var retryEvents = ['scroll', 'touchstart', 'pointerdown', 'keydown', 'click'];
      var onFirstInteraction = function () {
        video.muted = true;
        var p = video.play();
        if (p && typeof p.then === 'function') {
          p.then(function () {
            retryEvents.forEach(function (ev) {
              window.removeEventListener(ev, onFirstInteraction);
            });
          }).catch(function () {
            if (video.error && video.error.code) {
              console.warn('Error al reintentar video del hero, code:', video.error.code);
            }
          });
        }
      };
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          if (video.error && video.error.code) {
            console.warn('Error inicial en video del hero, code:', video.error.code);
          }
          retryEvents.forEach(function (ev) {
            window.addEventListener(ev, onFirstInteraction, { once: true, passive: true });
          });
        });
      }
    }
  }

  // Lightbox de galería
  var box = document.querySelector('.lightbox');
  if (box) {
    var big = box.querySelector('img');
    var opener = null;
    document.querySelectorAll('.gallery__item').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b;
        big.src = b.dataset.full;
        big.alt = b.dataset.alt;
        box.showModal();
      });
    });
    box.querySelector('.lightbox__close').addEventListener('click', function () {
      box.close();
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target === big) box.close();
    });
    box.addEventListener('close', function () {
      if (opener) opener.focus();
    });
  }

  // Menú fijo: fondo translúcido al hacer scroll.
  var nav = document.querySelector('.nav');
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Abierto ahora / Cerrado, con la hora de Chile y el horario de la tabla.
  var estado = document.getElementById('estado');
  var rows = document.querySelectorAll('.hours tbody tr');
  function toMin(t) {
    var m = /(\d{1,2}):(\d{2})\s*([ap])\.?m/i.exec(t);
    if (!m) return null;
    var h = parseInt(m[1], 10) % 12 + (m[3].toLowerCase() === 'p' ? 12 : 0);
    return h * 60 + parseInt(m[2], 10);
  }
  try {
    var sched = [];
    rows.forEach(function (r, i) {
      var parts = r.querySelector('td').textContent.split(/[–-]/);
      sched[i] = [toMin(parts[0]), toMin(parts[1])];
    });
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (t) {
      return parts.filter(function (p) { return p.type === t; })[0].value;
    };
    var dayIdx = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'));
    var now = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
    var s = sched[dayIdx];
    if (estado && s && s[0] !== null && s[1] !== null) {
      var open = now >= s[0] && now < s[1];
      estado.textContent = open ? 'Abierto ahora' : 'Cerrado';
      estado.className = 'status ' + (open ? 'status--open' : 'status--closed');
      estado.hidden = false;
    }
  } catch (e) { /* sin indicador si el navegador no soporta Intl con zona horaria */ }

  // Aparición suave de las secciones con IntersectionObserver (desactivada con prefers-reduced-motion).
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section > .wrap').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
