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
   DESKTOP GSAP STACKED CARDS PATH — full-viewport crossfade
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

  // Stack fills exactly the viewport height — no extra dead space
  const stackHeight = window.innerHeight;
  stack.style.height = stackHeight + 'px';

  // Scroll distance consumed per card transition
  const cardScrollSpace = 500;

  const cards        = stack.querySelectorAll('.portfolio-card--stacked');
  const cardElements = Array.from(cards);

  gsap.registerPlugin(ScrollTrigger);

  // Initial state: first card visible + interactive, all others invisible + non-interactive
  // pointer-events: none on invisible cards ensures clicks pass through to the active card
  cardElements.forEach((card, i) => {
    gsap.set(card, {
      position:      'absolute',
      top:           0,
      left:          0,
      width:         '100%',
      height:        '100%',
      zIndex:        PROJECTS.length - i,  // first card on top
      opacity:       i === 0 ? 1 : 0,
      pointerEvents: i === 0 ? 'auto' : 'none',
    });
  });

  // Sequential crossfade: current fades out COMPLETELY before next fades in
  // p 0→0.5 : current opacity 1→0   (pointer-events disabled at 0)
  // p 0.5→1 : next opacity 0→1      (pointer-events enabled when > 0)
  cardElements.forEach((card, i) => {
    if (i === cardElements.length - 1) return;
    const nextCard = cardElements[i + 1];

    ScrollTrigger.create({
      trigger: stack,
      start:   `top+=${i * cardScrollSpace} top`,
      end:     `top+=${(i + 1) * cardScrollSpace} top`,
      scrub:   0.8,
      onUpdate: (self) => {
        const p = self.progress;
        const curOpacity = p < 0.5 ? 1 - p * 2 : 0;
        const nxtOpacity = p > 0.5 ? (p - 0.5) * 2 : 0;
        gsap.set(card,    { opacity: curOpacity, pointerEvents: curOpacity > 0 ? 'auto' : 'none' });
        gsap.set(nextCard, { opacity: nxtOpacity, pointerEvents: nxtOpacity > 0 ? 'auto' : 'none' });
      },
    });
  });

  // Pin the stack for the full run of transitions
  ScrollTrigger.create({
    trigger:    stack,
    start:      'top top',
    end:        `+=${(PROJECTS.length - 1) * cardScrollSpace}`,
    pin:        true,
    pinSpacing: true,
    id:         'portfolio-pin',
  });

  // Resize: destroy GSAP and fall back to mobile grid below 1024px
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    if (w !== lastWidth) {
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
