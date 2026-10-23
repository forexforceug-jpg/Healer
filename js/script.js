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

/* --- Get in touch links: open Tawk, fallback to contact page --- */
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('a.get-in-touch');
  console.log('[get-in-touch] found', links.length, 'link(s)');

  links.forEach(function (link) {
    // Force the href to a safe no-op so it never navigates to itself
    link.setAttribute('href', 'javascript:void(0)');
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var tryOpen = function () {
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
          try { window.Tawk_API.maximize(); return true; } catch (err) { return false; }
        }
        return false;
      };

      if (tryOpen()) return;
      setTimeout(function () {
        if (!tryOpen()) {
          window.location.href = 'contact.html';
        }
      }, 900);
    });
  });
});
