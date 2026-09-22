// Tunde Yakub — personal site
(function () {
  document.documentElement.classList.remove('no-js');

  // Live Porto clock in the nav
  var clock = document.getElementById('clock');
  var tz = document.getElementById('tz');
  function tick() {
    if (!clock) return;
    var now = new Date();
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'
      }).formatToParts(now);
      var h = '', m = '', name = '';
      parts.forEach(function (p) {
        if (p.type === 'hour') h = p.value;
        if (p.type === 'minute') m = p.value;
        if (p.type === 'timeZoneName') name = p.value;
      });
      clock.textContent = h + ':' + m;
      clock.setAttribute('datetime', now.toISOString());
      // Browsers report GMT+1 / GMT for Lisbon; map to the local names.
      if (tz) tz.textContent = /\+1/.test(name) ? 'WEST' : (name === 'GMT' ? 'WET' : name);
    } catch (e) {
      clock.textContent = now.toTimeString().slice(0, 5);
    }
  }
  tick();
  setInterval(tick, 30000);

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Reveal on scroll
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  var vh = window.innerHeight || document.documentElement.clientHeight;
  els.forEach(function (el, i) {
    // Anything already on screen at load shows straight away.
    if (el.getBoundingClientRect().top < vh) {
      el.classList.add('in');
      return;
    }
    el.style.transitionDelay = Math.min(i % 6, 5) * 40 + 'ms';
    io.observe(el);
  });
})();
