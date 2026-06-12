/* ============================================================
   ABDELOUAHD PORTFOLIO — main.js
   Navigation · Typing effect · Marquee · Intersection Observer
   Count-up · Hero stagger
   Phase 1 & 2 core utilities
   ============================================================ */

'use strict';

/* ============================================================
   CONSTANTS / CONFIG
   ============================================================ */
const INTEGRATION = {
  CAL_URL:       'https://cal.com/abdelouahd-chergui-3mqd6u/discovery-call',
  WHATSAPP_URL:  'https://wa.me/213558074446?text=Bonjour%20Abdelouahd%2C%20je%20vous%20contacte%20suite%20%C3%A0%20la%20consultation%20de%20votre%20portfolio.%20J%27aimerais%20discuter%20d%27un%20projet%20de%20site%20web.',
};


const SCROLL_THRESHOLD = 30; // px before nav gets "is-scrolled"

/* ============================================================
   UTILITY: createObserver
   Returns a configured IntersectionObserver.
   options: { threshold, rootMargin, once }
   callback: (entry, observer) => void
   ============================================================ */
function createObserver(callback, options = {}) {
  const config = {
    threshold:   options.threshold  ?? 0.15,
    rootMargin:  options.rootMargin ?? '0px 0px -60px 0px',
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry, obs);
        if (options.once !== false) {
          obs.unobserve(entry.target);
        }
      }
    });
  }, config);

  return obs;
}

/* ============================================================
   UTILITY: observeAll
   Observes all elements matching selector with given observer.
   ============================================================ */
function observeAll(selector, observer, root = document) {
  root.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNavigation() {
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('navBurger');
  const mobile   = document.getElementById('navMobile');
  const mobileLinks = mobile ? mobile.querySelectorAll('.nav__mobile-link, .nav__mobile-cta') : [];

  if (!nav) return;

  // Scroll density effect
  let lastScrollY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > SCROLL_THRESHOLD) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    lastScrollY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init state

  // Burger / mobile menu toggle
  if (!burger || !mobile) return;

  // iOS Safari scroll lock: body overflow:hidden alone doesn't prevent scroll
  let savedScrollY = 0;

  const closeMobile = () => {
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    mobile.classList.remove('is-open');
    mobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow   = '';
    document.body.style.position   = '';
    document.body.style.top        = '';
    document.body.style.width      = '';
    window.scrollTo(0, savedScrollY);
  };

  const openMobile = () => {
    savedScrollY = window.scrollY;
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${savedScrollY}px`;
    document.body.style.width      = '100%';
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    mobile.classList.add('is-open');
    mobile.setAttribute('aria-hidden', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.contains('is-open');
    if (isOpen) { closeMobile(); } else { openMobile(); }
  });

  // Close on link click
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobile);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('is-open')) {
      closeMobile();
      burger.focus();
    }
  });

  // Close on outside click (but not nav itself)
  document.addEventListener('click', (e) => {
    if (
      burger.classList.contains('is-open') &&
      !mobile.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMobile();
    }
  });
}


/* ============================================================
   COUNT-UP ANIMATION
   Called once per element when it enters viewport.
   ============================================================ */
function animateCount(el, target, suffix, duration = 1800) {
  const start     = performance.now();
  const startVal  = 0;

  const ease = (t) => t < 0.5
    ? 4 * t * t * t
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // ease in-out cubic

  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = ease(progress);
    const value    = Math.round(startVal + (target - startVal) * eased);

    el.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = document.querySelectorAll('.results__number[data-target]');

  if (!counters.length) return;

  if (prefersReduced) {
    // Show final values immediately
    counters.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      el.textContent = target + suffix;
    });
    return;
  }

  const obs = createObserver(
    (entry) => {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, suffix);
    },
    { threshold: 0.5, once: true }
  );

  counters.forEach((el) => obs.observe(el));
}

/* ============================================================
   REVEAL ON SCROLL (Intersection Observer)
   ============================================================ */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all reveals visible immediately
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const obs = createObserver(
    (entry) => { entry.target.classList.add('is-visible'); },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px', once: true }
  );

  observeAll('.reveal', obs);
}

/* ============================================================
   HERO STAGGER ENTRANCE
   ============================================================ */
function initHeroStagger() {
  const container = document.querySelector('.hero__container');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  container.classList.add('hero-stagger');
}

/* ============================================================
   SMOOTH ANCHOR SCROLLING
   (native scroll-behavior: smooth already handles most cases,
    this adds offset for the sticky nav)
   ============================================================ */
function initAnchorScroll() {
  const navHeight = document.getElementById('nav')?.offsetHeight || 72;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      // Update URL without triggering scroll
      history.pushState(null, '', hash);
    });
  });
}

/* ============================================================
   ACTIVE NAV LINK (highlight current section)
   ============================================================ */
function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('is-active');
            }
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach((s) => obs.observe(s));
}

/* ============================================================
   FAQ ACCORDION
   One question open at a time. Full keyboard support.
   ============================================================ */
function initFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  const items    = list.querySelectorAll('.faq__item');
  const triggers = list.querySelectorAll('.faq__trigger');

  // Animate answer height using max-height transition (CSS handles it)
  const openItem = (trigger, answer) => {
    trigger.setAttribute('aria-expanded', 'true');
    answer.removeAttribute('hidden');
    // Force reflow so transition works from 0
    answer.offsetHeight; // eslint-disable-line no-unused-expressions
    answer.classList.add('is-open');
  };

  const closeItem = (trigger, answer) => {
    trigger.setAttribute('aria-expanded', 'false');
    answer.classList.remove('is-open');
    // Re-add hidden after transition for accessibility
    const onEnd = () => {
      if (!answer.classList.contains('is-open')) {
        answer.setAttribute('hidden', '');
      }
      answer.removeEventListener('transitionend', onEnd);
    };
    answer.addEventListener('transitionend', onEnd);
  };

  triggers.forEach((trigger) => {
    const answerId = trigger.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);
    if (!answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other open items first
      triggers.forEach((t) => {
        if (t !== trigger && t.getAttribute('aria-expanded') === 'true') {
          const aId = t.getAttribute('aria-controls');
          const a   = document.getElementById(aId);
          if (a) closeItem(t, a);
        }
      });

      if (isOpen) {
        closeItem(trigger, answer);
      } else {
        openItem(trigger, answer);
      }
    });

    // Keyboard: Enter / Space already handled by button type
    // Arrow navigation within FAQ
    trigger.addEventListener('keydown', (e) => {
      const allTriggers = Array.from(triggers);
      const idx         = allTriggers.indexOf(trigger);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        allTriggers[(idx + 1) % allTriggers.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        allTriggers[(idx - 1 + allTriggers.length) % allTriggers.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        allTriggers[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        allTriggers[allTriggers.length - 1].focus();
      }
    });
  });
}

/* ============================================================
   STICKY MOBILE CTA
   Hides on hero section, shows after; hides near footer.
   ============================================================ */
function initStickyCta() {
  const cta    = document.getElementById('stickyCta');
  const hero   = document.getElementById('hero');
  const footer = document.getElementById('footer');

  if (!cta || !hero) return;

  let heroBottom  = 0;
  let footerTop   = Infinity;
  let ticking     = false;

  const updateBounds = () => {
    heroBottom  = hero.getBoundingClientRect().bottom + window.scrollY;
    footerTop   = footer
      ? footer.getBoundingClientRect().top + window.scrollY
      : Infinity;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const nearFooter = footer
        ? y + window.innerHeight >= footerTop - 20
        : false;

      if (y < heroBottom - window.innerHeight * 0.5 || nearFooter) {
        cta.classList.add('is-hidden');
      } else {
        cta.classList.remove('is-hidden');
      }
      ticking = false;
    });
  };

  // Initial state: hidden (hero visible on load)
  cta.classList.add('is-hidden');

  updateBounds();
  window.addEventListener('scroll',  onScroll, { passive: true });
  window.addEventListener('resize',  () => { updateBounds(); onScroll(); }, { passive: true });
  onScroll();
}

/* ============================================================
   LOGO MARQUEE — slow on hover, never stop
   ============================================================ */
function initMarquee() {
  const marquee = document.querySelector('.marquee');
  const track   = document.getElementById('marqueeTrack');
  if (!marquee || !track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  marquee.addEventListener('mouseenter', () => {
    track.style.animationDuration = '120s';
  });
  marquee.addEventListener('mouseleave', () => {
    track.style.animationDuration = '';
  });
}

/* ============================================================
   INIT — DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMarquee();
  initCounters();
  initReveal();
  initHeroStagger();
  initAnchorScroll();
  initActiveNav();
  initFAQ();
  initStickyCta();
});

/* ============================================================
   EXPORTS (for portfolio.js and Phase 3 to reuse)
   ============================================================ */
window.PortfolioUtils = {
  createObserver,
  observeAll,
  animateCount,
  INTEGRATION,
};
