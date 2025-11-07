// Highlight current nav link based on <html data-page="...">
(function () {
  const page = document.documentElement.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('[data-link="'+page+'"]').forEach(a => a.classList.add('active'));
})();

// Current year in footer
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
