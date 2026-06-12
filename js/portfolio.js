/* ============================================================
   ABDELOUAHD PORTFOLIO — portfolio.js
   Phase 2 — Stacked Cards (GSAP desktop) + Mobile grid
   Loaded conditionally: GSAP only on ≥1024px + motion allowed
   ============================================================ */

'use strict';

/* ============================================================
   PROJECT DATA
   title:    display name (no geographic terms in visible text)
   sector:   short sector label
   url:      live site link (real URL, opens in new tab)
   image:    assets/projects/project-NN.webp
   bgColor:  card background tone (dark, brand-adjacent)
   ============================================================ */
const PROJECTS = [
  {
    title:   'Esthetica Dental Studio',
    sector:  'Clinique dentaire — Site vitrine',
    url:     'https://estheticadentalstudio.com/',
    image:   'assets/projects/project-01.webp',
    bgColor: '#131820',
  },
  {
    title:   'Ardentys',
    sector:  'Conseil & services — Site institutionnel',
    url:     'https://ardentys.com/',
    image:   'assets/projects/project-02.webp',
    bgColor: '#141214',
  },
  {
    title:   'Pavana Care',
    sector:  'Santé & bien-être — Site vitrine',
    url:     'https://pavanacare.com/',
    image:   'assets/projects/project-03.webp',
    bgColor: '#131815',
  },
  {
    title:   'Chinfinity Off',
    sector:  'Mode & accessoires — E-commerce',
    url:     'https://www.chinfinityoff.com/',
    image:   'assets/projects/project-04.webp',
    bgColor: '#141314',
  },
  {
    title:   'Touta Dermo',
    sector:  'Dermatologie & cosmétique — Site vitrine',
    url:     'https://www.touta-dermo.com/',
    image:   'assets/projects/project-05.webp',
    bgColor: '#1a1418',
  },
  {
    title:   "Clinique d'Excellence",
    sector:  'Clinique médicale — Site vitrine',
    url:     'https://excellencecliniquealgerie.com/',
    image:   'assets/projects/project-06.webp',
    bgColor: '#121618',
  },
  {
    title:   "Cabinet d'Avocat",
    sector:  'Juridique & conseil — Site professionnel',
    url:     'https://algerian-business-lawyer.com/',
    image:   'assets/projects/project-07.webp',
    bgColor: '#141210',
  },
  {
    title:   'Lattab',
    sector:  'Application web — Landing page',
    url:     'https://lattab.vercel.app/',
    image:   'assets/projects/project-08.webp',
    bgColor: '#0f1318',
  },
  {
    title:   'Atelier Messaoudi',
    sector:  'Artisanat & création — Site vitrine',
    url:     'https://www.ateliermessaoudi.com/',
    image:   'assets/projects/project-09.webp',
    bgColor: '#1a1510',
  },
  {
    title:   'Engimetal',
    sector:  'Industrie & métallurgie — Site institutionnel',
    url:     'https://www.engimetal.sncmetal.dz/',
    image:   'assets/projects/project-10.webp',
    bgColor: '#101418',
  },
  {
    title:   'Beauty Touch',
    sector:  'Beauté & cosmétique — E-commerce',
    url:     'https://beautytouch-shop.com/',
    image:   'assets/projects/project-11.webp',
    bgColor: '#1a1218',
  },
  {
    title:   'Legacy Algiers',
    sector:  'Hôtellerie & lifestyle — Site vitrine',
    url:     'https://legacyalgiers.com/',
    image:   'assets/projects/project-12.webp',
    bgColor: '#141210',
  },
  {
    title:   'El Kindy',
    sector:  'Médical & santé — Site vitrine',
    url:     'https://www.elkindy.com/',
    image:   'assets/projects/project-13.webp',
    bgColor: '#101618',
  },
  {
    title:   'Ora Dental Clinic',
    sector:  'Clinique dentaire — Site vitrine',
    url:     'https://www.oradental-clinic.com/',
    image:   'assets/projects/project-14.webp',
    bgColor: '#131618',
  },
];

/* Arrow SVG reused in cards */
const ARROW_SVG = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
       xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 8H13M9 4L13 8L9 12"
          stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

/* ============================================================
   DETECT ENVIRONMENT
   ============================================================ */
const isDesktop     = window.innerWidth >= 1024;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const useGSAP       = isDesktop && !prefersReduced && typeof gsap !== 'undefined';

/* ============================================================
   BUILD CARD HTML
   Desktop: full-viewport image, only "Voir le site" button below — no text overlay
   ============================================================ */
function buildCardHTML(project, index) {
  return `
    <div class="portfolio-card portfolio-card--fullscreen"
         style="background-color: ${project.bgColor};"
         data-index="${index}">
      <div class="portfolio-card__image-wrap">
        <img
          src="${project.image}"
          alt="Capture d'écran du site ${project.title}"
          class="portfolio-card__image"
          ${index === 0 ? 'loading="eager"' : 'loading="lazy"'}
          decoding="async"
          width="1600"
          height="900"
        />
      </div>
      <div class="portfolio-card__footer">
        <a
          href="${project.url}"
          class="portfolio-card__link btn btn--primary btn--md"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir ${project.title} — s'ouvre dans un nouvel onglet"
        >Voir le site ${ARROW_SVG}</a>
      </div>
    </div>`;
}

/* Mobile: image + button only */
function buildMobileCardHTML(project, index) {
  return `
    <div class="portfolio-card portfolio-card--mobile reveal"
         style="background-color: ${project.bgColor};"
         data-index="${index}">
      <div class="portfolio-card__image-wrap">
        <img
          src="${project.image}"
          alt="Capture d'écran du site ${project.title}"
          class="portfolio-card__image"
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
      </div>
      <div class="portfolio-card__footer">
        <a
          href="${project.url}"
          class="portfolio-card__link btn btn--primary btn--sm"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir ${project.title} — s'ouvre dans un nouvel onglet"
        >Voir le site ${ARROW_SVG}</a>
      </div>
    </div>`;
}

/* ============================================================
   MOBILE / REDUCED-MOTION PATH
   Simple vertical grid + Intersection Observer reveals
   ============================================================ */
function initMobilePortfolio() {
  const grid = document.getElementById('portfolioMobileGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => buildMobileCardHTML(p, i)).join('');

  // Re-observe reveals injected by JS (main.js observer may have run before)
  if (window.PortfolioUtils) {
    const obs = window.PortfolioUtils.createObserver(
      (entry) => { entry.target.classList.add('is-visible'); },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px', once: true }
    );
    grid.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  }
}

/* ============================================================
   DESKTOP GSAP STACKED CARDS — cinematic card-deck entrance
   Each card exits upward while the next rises from below.
   3D tilt + image parallax on active card (mousemove).
   ============================================================ */
function initDesktopPortfolio() {
  const wrapper = document.getElementById('portfolioWrapper');
  if (!wrapper) return;

  const stack = document.createElement('div');
  stack.className = 'portfolio__stack';
  stack.setAttribute('aria-label', 'Projets réalisés');

  PROJECTS.forEach((project, i) => {
    const cardWrap = document.createElement('div');
    cardWrap.className = 'portfolio-card--stacked';
    cardWrap.innerHTML = buildCardHTML(project, i);
    stack.appendChild(cardWrap);
  });

  wrapper.appendChild(stack);

  const stackHeight     = window.innerHeight;
  stack.style.height    = stackHeight + 'px';

  // px of scroll per card transition — longer = slower, more cinematic
  const cardScrollSpace = 650;

  const cards = Array.from(stack.querySelectorAll('.portfolio-card--stacked'));

  gsap.registerPlugin(ScrollTrigger);

  // ── Initial state ──────────────────────────────────────────
  // Card 0: visible, interactive.
  // Cards 1+: positioned below the container (yPercent: 100),
  //           ready to rise up when their turn comes.
  cards.forEach((card, i) => {
    gsap.set(card, {
      position:      'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      zIndex:        cards.length - i,
      yPercent:      i === 0 ? 0 : 100,
      scale:         i === 0 ? 1 : 0.96,
      opacity:       i === 0 ? 1 : 0,
      pointerEvents: i === 0 ? 'auto' : 'none',
      transformOrigin: 'center center',
    });
  });

  // ── Active card tracker ────────────────────────────────────
  let activeIndex = 0;

  function setActiveCard(idx) {
    if (idx === activeIndex) return;
    activeIndex = idx;
    cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
  }
  cards[0].classList.add('is-active');

  // ── Per-card scroll transitions ────────────────────────────
  cards.forEach((card, i) => {
    if (i === cards.length - 1) return;
    const nextCard = cards[i + 1];

    ScrollTrigger.create({
      trigger: stack,
      start:   `top+=${i * cardScrollSpace} top`,
      end:     `top+=${(i + 1) * cardScrollSpace} top`,
      scrub:   1.4,
      onUpdate(self) {
        const p = self.progress;

        // Current card: drifts up and fades (exits by 60% of scroll)
        const ex = Math.min(p / 0.6, 1);
        gsap.set(card, {
          yPercent:      -10 * ex,
          scale:         1 - 0.05 * ex,
          opacity:       1 - ex,
          pointerEvents: ex < 0.85 ? 'auto' : 'none',
        });

        // Next card: rises from below + fades in (starts at 20% of scroll)
        const en = Math.max((p - 0.2) / 0.8, 0);
        gsap.set(nextCard, {
          yPercent:      100 * (1 - en),
          scale:         0.96 + 0.04 * en,
          opacity:       Math.min(en / 0.6, 1),
          pointerEvents: en > 0.8 ? 'auto' : 'none',
        });

        setActiveCard(en > 0.6 ? i + 1 : i);
      },
    });
  });

  // ── Pin the stack for the full transition run ──────────────
  ScrollTrigger.create({
    trigger:    stack,
    start:      'top top',
    end:        `+=${(cards.length - 1) * cardScrollSpace}`,
    pin:        true,
    pinSpacing: true,
    id:         'portfolio-pin',
  });

  // ── 3D Tilt + Image Parallax (mousemove on active card) ────
  const TILT = { maxDeg: 5, perspective: 1200, imgShift: 18 };

  stack.addEventListener('mousemove', (e) => {
    const active = cards[activeIndex];
    if (!active) return;

    const rect = stack.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    gsap.to(active, {
      rotateX:             -dy * TILT.maxDeg,
      rotateY:              dx * TILT.maxDeg,
      transformPerspective: TILT.perspective,
      duration:  0.55,
      ease:      'power2.out',
      overwrite: 'auto',
    });

    const img = active.querySelector('.portfolio-card__image');
    if (img) {
      gsap.to(img, {
        x:         dx * TILT.imgShift,
        y:         dy * TILT.imgShift,
        duration:  0.55,
        ease:      'power2.out',
        overwrite: 'auto',
      });
    }
  }, { passive: true });

  stack.addEventListener('mouseleave', () => {
    const active = cards[activeIndex];
    if (!active) return;
    gsap.to(active, { rotateX: 0, rotateY: 0, duration: 0.75, ease: 'power3.out' });
    const img = active.querySelector('.portfolio-card__image');
    if (img) gsap.to(img, { x: 0, y: 0, duration: 0.75, ease: 'power3.out' });
  });

  // ── Resize: fall back to mobile grid below 1024px ──────────
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    if (w === lastWidth) return;
    lastWidth = w;
    if (w < 1024) {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === 'portfolio-pin' || t.trigger === stack) t.kill();
      });
      const mobileGrid = document.getElementById('portfolioMobileGrid');
      if (mobileGrid) {
        mobileGrid.style.display = 'grid';
        if (!mobileGrid.children.length) initMobilePortfolio();
      }
      wrapper.style.display = 'none';
    } else {
      ScrollTrigger.refresh();
    }
  }, { passive: true });
}

/* ============================================================
   INIT
   ============================================================ */
function initPortfolio() {
  if (useGSAP) {
    // Desktop + GSAP available: hide mobile grid, init stacked cards
    const mobileGrid = document.getElementById('portfolioMobileGrid');
    if (mobileGrid) mobileGrid.style.display = 'none';
    initDesktopPortfolio();
  } else {
    // Mobile, reduced-motion, or GSAP CDN failed: show grid explicitly
    // (CSS hides it by default on desktop — must override here)
    const wrapper = document.getElementById('portfolioWrapper');
    if (wrapper) wrapper.style.display = 'none';
    const grid = document.getElementById('portfolioMobileGrid');
    if (grid) grid.style.display = 'grid';
    initMobilePortfolio();
  }
}

// portfolio.js is loaded after DOM is ready (script injected by inline loader)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
