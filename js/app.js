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
    var menu = document.getElementById('navLinks');
    if (menu) menu.classList.remove('open');
    var items = el.querySelectorAll('.fade-in');
    for (var i = 0; i < items.length; i++) {
      (function (item, delay) {
        setTimeout(function () {
          item.classList.add('show');
        }, delay);
      })(items[i], i * 70 + 50);
    }
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
    document.getElementById('navLinks').classList.toggle('open');
  });

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
