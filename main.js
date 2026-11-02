// Chatham Mills · nav, mobile menu, and tenant filters
(function () {
  var nav = document.querySelector('.site-nav');
  var body = document.body;

  // Nav turns cream after a little scroll
  function onScroll() {
    if (!nav) return;
    var solid = window.scrollY > 40 && !body.classList.contains('menu-open');
    nav.classList.toggle('solid', solid);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.querySelector('.menubtn');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    onScroll();
  }
  if (btn) btn.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.querySelectorAll('.menu-panel a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });


  // Contact form: send people to our own thank-you page after FormSubmit delivers the email
  var next = document.getElementById('form-next');
  if (next && /^https?:/.test(location.protocol)) next.value = location.origin + '/thanks.html';

  // Send the contact form in the background so visitors always see what happened
  var form = document.querySelector('form[name="contact"]');
  var status = document.getElementById('form-status');
  if (form && status && window.fetch && form.action.indexOf('formsubmit.co/') > -1) {
    var btn = form.querySelector('button[type="submit"]');
    var btnText = btn ? btn.textContent : '';
    var fallback = 'We couldn\'t send your message. Please email info@boldnc.com or call 919-883-5502.';
    function show(msg, isError) {
      status.hidden = false;
      status.textContent = msg;
      status.style.color = isError ? '#A65338' : '#014B5C';
    }
    function reset() { if (btn) { btn.disabled = false; btn.textContent = btnText; } }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      show('Sending your message...', false);
      fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && (res.success === true || res.success === 'true')) {
            window.location.href = '/thanks.html';
          } else {
            show((res && res.message) ? res.message : fallback, true);
            reset();
          }
        })
        .catch(function () { show(fallback, true); reset(); });
    });
  }

  // Tenant directory filters (businesses page only)
  var filters = document.querySelectorAll('.fp[data-filter]');
  var rows = document.querySelectorAll('.trow[data-cat]');
  var countEl = document.getElementById('shown-count');
  if (filters.length && rows.length) {
    // Fill in the counts on each filter button
    filters.forEach(function (f) {
      var cat = f.getAttribute('data-filter');
      var n = 0;
      rows.forEach(function (r) { if (cat === 'All' || r.getAttribute('data-cat') === cat) n++; });
      var ct = f.querySelector('.ct');
      if (ct) ct.textContent = n;
    });
    var total = document.getElementById('total-count');
    if (total) total.textContent = rows.length;

    function apply(cat) {
      var shown = 0;
      rows.forEach(function (r) {
        var match = cat === 'All' || r.getAttribute('data-cat') === cat;
        r.hidden = !match;
        if (match) shown++;
      });
      filters.forEach(function (f) {
        var on = f.getAttribute('data-filter') === cat;
        f.classList.toggle('on', on);
        f.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (countEl) countEl.textContent = shown;
    }
    filters.forEach(function (f) {
      f.addEventListener('click', function () { apply(f.getAttribute('data-filter')); });
    });
    apply('All');
  }
})();
