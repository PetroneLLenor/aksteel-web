/* ============================================
   AK Steel — main.js
   Scroll reveal, lightbox, mobile menu
   ============================================ */

(function() {
  'use strict';

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Nav scroll state ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function updateNav() {
    const y = window.scrollY;
    if (y > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ---- Mobile menu ----
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = items[index].href;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    lightboxImg.src = items[currentIndex].href;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    lightboxImg.src = items[currentIndex].href;
  }

  items.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
