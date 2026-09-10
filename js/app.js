(function () {
  var pages = ['home', 'about', 'projects', 'background', 'contact'];

  function go(id) {
    if (pages.indexOf(id) === -1) id = 'home';
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.remove('active');
    });
    var el = document.getElementById('page-' + id);
    if (!el) return;
    el.classList.add('active');
    window.scrollTo(0, 0);
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === id);
    });
    setMenu(false);
    var items = el.querySelectorAll('.fade-in');
    for (var i = 0; i < items.length; i++) {
      (function (item, delay) {
        setTimeout(function () {
          item.classList.add('show');
        }, delay);
      })(items[i], i * 70 + 50);
    }
  }

  function setMenu(open) {
    var menu = document.getElementById('navLinks');
    var burger = document.getElementById('burger');
    if (menu) menu.classList.toggle('open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function navigate(id) {
    if (pages.indexOf(id) === -1) id = 'home';
    location.hash = id === 'home' ? '' : id;
    go(id);
  }

  function getPageFromHash() {
    var hash = location.hash.replace(/^#\/?/, '');
    return hash || 'home';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-nav]');
    if (t) {
      e.preventDefault();
      navigate(t.getAttribute('data-nav'));
    }
  });

  window.addEventListener('hashchange', function () {
    go(getPageFromHash());
  });

  document.getElementById('burger').addEventListener('click', function () {
    var menu = document.getElementById('navLinks');
    setMenu(!(menu && menu.classList.contains('open')));
  });

  // Theme: dark for everyone, light only on an explicit choice
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var themeMeta = document.getElementById('theme-color');
  var THEME_COLOR = { light: '#F2F6FB', dark: '#07080D' };

  function storedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLOR[theme]);
    if (toggle) {
      toggle.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
      toggle.setAttribute('aria-label', theme === 'light' ? 'Dark mode' : 'Light mode');
    }
  }

  applyTheme(storedTheme() === 'light' ? 'light' : 'dark');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyTheme(next);
    });
  }

  // Email obfuscation
  var u = 'hello';
  var d = 'fantoine.com';
  var link = document.getElementById('email-link');
  var text = document.getElementById('email-text');
  if (link && text) {
    var addr = u + '@' + d;
    link.href = 'mailto:' + addr;
    text.textContent = addr;
  }
  var footerLink = document.getElementById('footer-email-link');
  if (footerLink) footerLink.href = 'mailto:' + u + '@' + d;

  go(getPageFromHash());
})();
