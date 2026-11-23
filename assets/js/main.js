/* Pro Spray Hampshire – homepage behaviour (preview only; Elementor replaces all of this natively) */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var closeBtn = document.getElementById('navClose');
  var scrim = document.getElementById('scrim');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    scrim.classList.toggle('is-on', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setNav(true); });
  closeBtn.addEventListener('click', function () { setNav(false); });
  scrim.addEventListener('click', function () { setNav(false); });
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    if (a.matches('.nav__item--has > .nav__link')) return; // parent link only toggles its submenu on mobile
    a.addEventListener('click', function () { setNav(false); });
  });
  nav.querySelectorAll('.nav__item--has > .nav__link').forEach(function (l) {
    l.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        e.preventDefault();
        l.parentElement.classList.toggle('is-open');
      }
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  /* ---------- Video reels (load on demand) ---------- */
  document.querySelectorAll('.reel').forEach(function (reel) {
    var v = reel.querySelector('video');
    var b = reel.querySelector('.reel__play');
    b.addEventListener('click', function () {
      v.setAttribute('controls', '');
      reel.classList.add('is-playing');
      v.play();
    });
  });

  /* ---------- Gallery ---------- */
  var P = 'assets/img/';
  var items = [];
  function add(cat, alt, files) { files.forEach(function (f, i) { items.push({ cat: cat, src: P + f + '.jpg', alt: alt }); }); }
  function seq(prefix, n) { var a = []; for (var i = 1; i <= n; i++) a.push(prefix + '-' + (i < 10 ? '0' : '') + i); return a; }

  // Interleave so "All" shows a good mix first
  var veh = []
    .concat(seq('veh-red-kia', 2), seq('veh-blue-bmw', 4), seq('veh-blue-puma', 4), seq('veh-red-mokka', 4), seq('veh-mazda-cx30', 3), seq('veh-blue-bonnet', 3));
  var doors = ['mix2-03', 'mix2-05', 'mix2-01', 'mix2-08', 'mix-03', 'mix-04', 'mix-05', 'mix-07', 'mix2-02', 'mix-08', 'mix2-09'];
  var garage = ['root-garage-house', 'mix2-13', 'mix2-14', 'mix2-07', 'mix2-10'];
  var boxes = ['mix2-04', 'mix2-06', 'mix2-15', 'mix2-16'];
  var clad = ['root-commercial', 'com-cladding-01', 'com-cladding-02', 'com-cladding-03', 'com-cladding-04', 'mix-01', 'mix-02', 'mix-06', 'mix2-11', 'mix2-12'];
  var inter = seq('int-door', 10);

  add('vehicles', 'Car bodywork and bumper repair by Pro Spray Hampshire', veh);
  add('doors', 'Sprayed UPVC door or window in Hampshire', doors);
  add('garage', 'Sprayed garage door or gate in Hampshire', garage);
  add('boxes', 'Sprayed gas or electric meter box', boxes);
  add('cladding', 'Sprayed cladding on a commercial or residential building', clad);
  add('interior', 'Interior door refinished by Pro Spray Hampshire', inter);

  // Order for the "All" tab: round-robin by category
  var cats = ['vehicles', 'doors', 'garage', 'cladding', 'boxes', 'interior'];
  var buckets = {};
  cats.forEach(function (c) { buckets[c] = items.filter(function (x) { return x.cat === c; }); });
  var ordered = [], more = true, idx = 0;
  while (more) {
    more = false;
    cats.forEach(function (c) { if (buckets[c][idx]) { ordered.push(buckets[c][idx]); more = true; } });
    idx++;
  }

  var grid = document.getElementById('grid');
  var moreBtn = document.getElementById('gridMore');
  var LIMIT = 12, active = 'all', expanded = false;

  ordered.forEach(function (it, i) {
    var b = document.createElement('button');
    b.className = 'grid__item';
    b.type = 'button';
    b.dataset.cat = it.cat;
    b.dataset.i = i;
    b.setAttribute('aria-label', 'View photo: ' + it.alt);
    var img = document.createElement('img');
    img.src = it.src; img.alt = it.alt; img.loading = 'lazy'; img.decoding = 'async';
    b.appendChild(img);
    grid.appendChild(b);
  });
  var nodes = Array.prototype.slice.call(grid.children);

  function render() {
    var shown = 0, matches = 0;
    nodes.forEach(function (n) {
      var ok = active === 'all' || n.dataset.cat === active;
      if (ok) matches++;
      var vis = ok && (expanded || shown < LIMIT);
      if (vis) shown++;
      n.hidden = !vis;
    });
    moreBtn.parentElement.hidden = expanded || matches <= LIMIT;
  }
  document.querySelectorAll('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      active = b.dataset.f; expanded = false; render();
    });
  });
  moreBtn.addEventListener('click', function () { expanded = true; render(); });
  render();

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var current = 0;
  function visibleNodes() { return nodes.filter(function (n) { return !n.hidden; }); }
  function open(n) {
    var list = visibleNodes(); current = list.indexOf(n);
    show(); lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox__close').focus();
  }
  function show() { var list = visibleNodes(); var n = list[current]; lbImg.src = n.querySelector('img').src; lbImg.alt = n.querySelector('img').alt; }
  function step(d) { var list = visibleNodes(); current = (current + d + list.length) % list.length; show(); }
  function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
  grid.addEventListener('click', function (e) { var n = e.target.closest('.grid__item'); if (n) open(n); });
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lightbox__next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ---------- Form (preview only) ---------- */
  var form = document.getElementById('quoteForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Request sent. We will call you soon.';
    btn.disabled = true;
  });
})();
