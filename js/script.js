document.addEventListener('DOMContentLoaded', function () {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navMenu a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  var header = document.getElementById('siteHeader');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('navMenu');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you. Lubowa Sempa will respond within 48 hours.');
      contactForm.reset();
    });
  }

  var reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    var grid = document.querySelector('.reviews-grid');
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = reviewForm.name.value.trim();
      var rating = parseInt(reviewForm.rating.value, 10);
      var text = reviewForm.review.value.trim();
      if (!name || !rating || !text) return;

      var card = document.createElement('div');
      card.className = 'review-card';
      var stars = '';
      for (var i = 0; i < 5; i++) stars += i < rating ? '★' : '☆';
      card.innerHTML = '<div class="stars">' + stars + '</div>' +
        '<p></p>' +
        '<span class="reviewer">— ' + name + '</span>';
      card.querySelector('p').textContent = text;
      grid.appendChild(card);
      reviewForm.reset();
      alert('Thank you. Your review has been posted.');
    });
  }
});
/* Close mobile menu when viewport grows */
window.addEventListener('resize', function () {
  if (window.innerWidth > 900) {
    var m = document.getElementById('navMenu') || document.querySelector('nav ul');
    var t = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
    if (m) m.classList.remove('open');
    if (t) { t.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); }
  }
});

/* --- Get in touch: open Tawk.to chat directly --- */
(function () {
  function openTawk() {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
      return true;
    }
    return false;
  }

  document.querySelectorAll('.get-in-touch').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // Try immediately
      if (openTawk()) return;
      // Tawk may not be loaded yet on first click — wait briefly, then fall back
      setTimeout(function () {
        if (!openTawk()) {
          window.location.href = 'contact.html';
        }
      }, 700);
    });
  });
})();
