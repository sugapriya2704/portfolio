document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- BOOT SEQUENCE ---------- */
  const bootScreen = document.getElementById('bootScreen');
  const bootLog = document.getElementById('bootLog');
  const bootLines = [
    'INIT SYSTEM...',
    'LOADING MODULES: SENSORS.....OK',
    'LOADING MODULES: EMBEDDED_CORE..OK',
    'CONNECTING IoT NETWORK.....OK',
    'MOUNTING PORTFOLIO/USR/SUGAPRIYA',
    'BOOT COMPLETE ✓'
  ];

  function hideBoot() {
    bootScreen.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => bootScreen.remove(), 600);
  }

  if (reduceMotion) {
    hideBoot();
  } else {
    document.body.style.overflow = 'hidden';
    let delay = 0;
    bootLines.forEach((text, i) => {
      delay += 260;
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'line' + (text.includes('OK') || text.includes('✓') ? ' ok' : '');
        span.style.animationDelay = '0s';
        span.textContent = text;
        bootLog.appendChild(span);
      }, delay);
    });
    setTimeout(hideBoot, delay + 500);
  }

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
    toggleBackToTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- ACTIVE SECTION HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal], .project');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(t => revealObserver.observe(t));

  /* ---------- TYPEWRITER TAGLINE ---------- */
  const typedEl = document.getElementById('typedText');
  const fullText = 'Building real-world IoT systems and data-driven solutions';
  if (reduceMotion) {
    typedEl.textContent = fullText;
  } else {
    let i = 0;
    (function type() {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(type, 35);
      }
    })();
  }

  /* ---------- COPY TO CLIPBOARD ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied: ' + value);
      } catch (err) {
        showToast('Copy failed — please copy manually');
      }
    });
  });

  /* ---------- BACK TO TOP ---------- */
  const toTop = document.getElementById('toTop');
  function toggleBackToTop() {
    toTop.classList.toggle('visible', window.scrollY > 500);
  }
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});
