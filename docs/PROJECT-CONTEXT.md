# PROJECT-CONTEXT.md
## Source de vérité — Phases 1, 2 & 3 (COMPLÈTES)

---

## 1. Design Tokens (variables CSS — `css/style.css` `:root`)

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--bg` | `#0A0A0B` | Fond principal |
| `--surface` | `#141416` | Cartes, surfaces |
| `--surface-2` | `#1C1C20` | Surfaces secondaires |
| `--surface-3` | `#242428` | Hover léger |
| `--text` | `#F5F5F7` | Texte principal |
| `--text-muted` | `#A1A1AA` | Texte secondaire |
| `--text-dim` | `#6B6B74` | Texte très atténué |
| `--accent` | `#C9A86A` | Accent champagne/or (unique) |
| `--accent-dim` | `rgba(201,168,106,0.12)` | Fond accent atténué |
| `--success` | `#34D399` | Badge de disponibilité |
| `--border` | `rgba(255,255,255,0.08)` | Bordures légères |
| `--border-mid` | `rgba(255,255,255,0.12)` | Bordures hover |

**Contraste WCAG AA vérifié :**
- `--text` (#F5F5F7) sur `--bg` (#0A0A0B) → ratio ~19:1 ✓
- `--text-muted` (#A1A1AA) sur `--bg` (#0A0A0B) → ratio ~7.3:1 ✓
- `--accent` (#C9A86A) sur `--bg` (#0A0A0B) → ratio ~6.4:1 ✓ (large text AA+)
- `--success` (#34D399) sur `--bg` → ratio ~9.2:1 ✓

### Typographie
- **Display** : `'Clash Display'` — `--font-display` — Fontshare CDN
- **Corps** : `'Satoshi'` — `--font-body` — Fontshare CDN

#### Échelle fluide `clamp()`
| Token | Plage |
|---|---|
| `--text-xs` | 0.75rem → 0.8125rem |
| `--text-sm` | 0.875rem → 0.9375rem |
| `--text-base` | 1rem → 1.0625rem |
| `--text-md` | 1.125rem → 1.25rem |
| `--text-lg` | 1.25rem → 1.5rem |
| `--text-xl` | 1.5rem → 2rem |
| `--text-2xl` | 1.875rem → 2.5rem |
| `--text-3xl` | 2.25rem → 3.25rem |
| `--text-4xl` | 2.75rem → 4.25rem |
| `--text-hero` | 2.5rem → 5.5rem |

### Espacements
`--space-1` (0.25rem) … `--space-32` (8rem). Base 4px.

### Layout
- `--container-max: 1200px`
- `--container-pad: clamp(1.5rem, 5vw, 4rem)`
- `--section-gap: clamp(4rem, 10vh, 8rem)`

### Radii
`--radius-sm: 6px` · `--radius: 12px` · `--radius-lg: 20px` · `--radius-xl: 28px` · `--radius-full: 9999px`

### Transitions
`--ease` · `--ease-out` · `--ease-in-out` · `--duration-fast: 150ms` · `--duration: 250ms` · `--duration-slow: 400ms`

---

## 2. Structure des fichiers (complète)

```
/
├── index.html              ← Page complète, 12 sections
├── css/
│   ├── style.css           ← Tokens + reset + tous les styles (Ph.1→3)
│   └── animations.css      ← Keyframes + classes utilitaires
├── js/
│   ├── main.js             ← Nav, typing, counters, reveals, anchors, FAQ, sticky CTA
│   └── portfolio.js        ← GSAP stacked cards + mobile grid
├── assets/
│   ├── images/             ← portrait.webp, og-image.webp, avatar-placeholder.webp
│   ├── projects/           ← project-01.webp … project-14.webp
│   ├── logos/              ← logo-01.webp … logo-13.webp (788×317, fond transparent)
│   └── icons/              ← favicon.ico, favicon-32x32.png, favicon-16x16.png,
│                               apple-touch-icon.png, site.webmanifest
├── docs/
│   └── PROJECT-CONTEXT.md  ← ce fichier
├── robots.txt
├── sitemap.xml
└── netlify.toml
```

---

## 3. Ordre des sections et ancres (complet)

| # | Ancre | Titre | Phase |
|---|---|---|---|
| 1 | `#hero` | Hero + typing + badge | 1 |
| – | *(pas d'ancre)* | Logo marquee | 1 |
| 2 | `#why` | Pourquoi travailler avec moi | 1 |
| 3 | `#results` | Résultats & Impact | 1 |
| 4 | `#portfolio` | Portfolio stacked cards | 2 |
| 5 | `#services` | Services (4) | 2 |
| 6 | `#process` | Comment ça fonctionne | 2 |
| 7 | `#testimonials` | Témoignages carousel | 2 |
| 8 | `#about` | À propos | 2 |
| 9 | `#faq` | FAQ accordion (6 Q/R) | 3 |
| 10 | `#final-cta` | CTA final | 3 |
| 11 | `#footer` | Footer | 3 |

---

## 4. Intégrations (valeurs exactes)

```js
// window.PortfolioUtils.INTEGRATION (déclaré dans js/main.js)

CAL_URL:
  'https://cal.com/abdelouahd-chergui-3mqd6u/discovery-call'

WHATSAPP_URL:
  'https://wa.me/213558074446?text=Bonjour%20Abdelouahd%2C%20je%20vous%20contacte%20suite%20%C3%A0%20la%20consultation%20de%20votre%20portfolio.%20J%27aimerais%20discuter%20d%27un%20projet%20de%20site%20web.'
```

Règle universelle : tous les liens externes → `target="_blank" rel="noopener noreferrer"`.

---

## 5. API JavaScript publique

### `window.PortfolioUtils` (exposé par `main.js`)

| Méthode / propriété | Signature | Description |
|---|---|---|
| `createObserver` | `(callback, options?)` | IntersectionObserver configuré. `options: { threshold=0.15, rootMargin, once=true }` |
| `observeAll` | `(selector, observer, root?)` | Observe tous les éléments du sélecteur |
| `animateCount` | `(el, target, suffix, duration?)` | Count-up avec ease-in-out cubic |
| `INTEGRATION` | `{ CAL_URL, WHATSAPP_URL }` | URLs d'intégration |

### Fonctions internes `main.js` (non exposées)

| Fonction | Rôle |
|---|---|
| `initNavigation()` | Sticky nav + burger mobile |
| `initTyping()` | Effet de frappe hero |
| `initCounters()` | Count-up déclenchés au scroll |
| `initReveal()` | `.reveal` → `.is-visible` via IO |
| `initHeroStagger()` | Stagger d'entrée hero |
| `initAnchorScroll()` | Scroll fluide avec offset nav |
| `initActiveNav()` | Lien actif au scroll |
| `initFAQ()` | Accordéon accessible (clavier + aria) |
| `initStickyCta()` | Barre fixe mobile show/hide |

### `portfolio.js`

- `PROJECTS` : tableau de 14 objets `{ title, sector, url, image, bgColor }`
- Images : `assets/projects/project-NN.webp` (index 2 chiffres, 01–14)
- Bascule : `isDesktop && !prefersReduced && typeof gsap !== 'undefined'`
  - `true`  → GSAP stacked cards (pin + scale/fade/depth)
  - `false` → grid mobile, reveals via Intersection Observer

---

## 6. Classes d'animation réutilisables (`animations.css`)

| Classe | Description |
|---|---|
| `.anim-fade-in` | Apparition simple |
| `.anim-fade-up` | Apparition + montée |
| `.anim-fade-down` | Apparition + descente |
| `.anim-scale-in` | Scale 0.92 → 1 + fade |
| `.anim-slide-left` / `.anim-slide-right` | Slide horizontal |
| `.anim-float` | Flottement vertical infini |
| `.anim-glow-pulse` | Pulsation lumineuse |
| `.anim-shimmer` | Skeleton loader |
| `.hero-stagger > *` | Stagger séquentiel (auto-délais) |
| `.anim-delay-100` … `.anim-delay-1000` | Délais |
| `.anim-fast` / `.anim-normal` / `.anim-slow` / `.anim-slower` | Durées |

**Classes d'état JS :**
- `.reveal` / `.reveal.is-visible` — apparition au scroll
- `.is-scrolled` — header densifié
- `.is-open` — burger ouvert / FAQ answer visible
- `.is-active` — lien de nav actif
- `.is-hidden` — sticky CTA masqué

---

## 7. Conventions de nommage (BEM strict)

- Bloc : `.nom-section`
- Élément : `.nom-section__element`
- Modificateur : `.nom-section--variante`
- État : `.is-state`

---

## 8. Règles invariantes (ne jamais enfreindre)

1. **Aucune référence géographique** dans le texte visible.
2. **Français uniquement, LTR.**
3. **GSAP uniquement dans `portfolio.js`**, uniquement desktop + motion autorisé.
4. **`prefers-reduced-motion`** : fallback statique propre sur 100% des animations.
5. **Mobile-first**, testé à 375px.
6. **WCAG AA** sur tout le texte.
7. **Cal.com / WhatsApp** : toujours `target="_blank" rel="noopener noreferrer"`.
8. **Compteurs** : uniquement `23+` (projets) et `4` (années).
9. **Un seul `<h1>`** sur la page (le titre hero).

---

## 9. Chargement conditionnel GSAP

```js
// Condition dans index.html (bloc <script> inline)
window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches
// → true : charge js/portfolio.js directement (mode mobile)
// → false : charge gsap.min.js → ScrollTrigger.min.js → portfolio.js
```

---

## 10. SEO — fichiers déclarés

| Fichier | Rôle |
|---|---|
| `index.html` | `<title>`, `<meta description>`, OG, Twitter Card, JSON-LD |
| `robots.txt` | Autorise tous les robots, déclare le sitemap |
| `sitemap.xml` | URL canonique unique |
| `netlify.toml` | En-têtes de sécurité + cache immutable CSS/JS/images |
| `assets/icons/site.webmanifest` | PWA manifest (nom, couleurs, icônes) |

**JSON-LD :** `Person` + `ProfessionalService` sans champ d'adresse géographique.

---

## 11. Checklist de déploiement (Netlify)

### Avant de pousser

- [ ] **portrait.webp** : placer la photo dans `assets/images/portrait.webp` (dimensions recommandées : 480×600px, WebP)
- [ ] **og-image.webp** : créer `assets/images/og-image.webp` (1200×630px) pour le partage social
- [ ] **Logos** : placer `logo-01.webp` … `logo-13.webp` dans `assets/logos/` (788×317px, fond transparent, WebP)
- [ ] **Projets** : placer `project-01.webp` … `project-14.webp` dans `assets/projects/` (mockups desktop+mobile, WebP)
- [ ] **Favicons** : générer et placer `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` dans `assets/icons/`
- [ ] **Témoignages** : remplacer les 6 blocs `[Nom client]` / `[Témoignage]` / `[Profession]` dans les `.testimonial__card` + ajouter les photos dans `assets/images/`
- [ ] **LinkedIn** : remplacer `https://www.linkedin.com/in/abdelouahd-chergui` par l'URL réelle dans le footer et le JSON-LD
- [ ] **Instagram** : remplacer `https://www.instagram.com/abdelouahd.web` par l'URL réelle
- [ ] **Email** : remplacer `contact@abdelouahd.com` dans le footer par l'email réel
- [ ] **URL canonique** : remplacer `https://abdelouahd.com/` par le domaine final dans `<link rel="canonical">`, les balises OG, le JSON-LD et le `sitemap.xml`
- [ ] **sitemap.xml** : mettre à jour `<lastmod>` avec la date de mise en ligne

### Déploiement Netlify

1. Connecter le repo GitHub à Netlify (drag & drop du dossier ou CLI `netlify deploy --prod`)
2. Répertoire de publication : `.` (racine)
3. Le `netlify.toml` configure automatiquement les en-têtes de sécurité et le cache
4. Activer HTTPS (Let's Encrypt) — automatique sur Netlify
5. Configurer le domaine personnalisé dans les DNS settings

### Post-déploiement

- [ ] Tester les Core Web Vitals via PageSpeed Insights
- [ ] Vérifier l'indexation dans Google Search Console (soumettre le sitemap)
- [ ] Tester les balises OG via l'inspecteur Facebook / LinkedIn / Twitter
- [ ] Vérifier le rendu mobile sur un vrai iPhone et Android

---

## 12. Placeholders restant à remplacer (récapitulatif)

| Quoi | Fichier | Balise / Variable |
|---|---|---|
| Photo portrait | `assets/images/portrait.webp` | `<img src="assets/images/portrait.webp">` |
| Image OG | `assets/images/og-image.webp` | `<meta property="og:image">` |
| Logos clients | `assets/logos/logo-01…13.webp` | `<img class="marquee__logo">` |
| Captures projets | `assets/projects/project-01…14.webp` | `PROJECTS[n].image` dans `portfolio.js` |
| Favicons | `assets/icons/` | `<link rel="icon">` etc. |
| 6 témoignages | `index.html` | `.testimonial__card` × 6 |
| URL LinkedIn | `index.html` + `PROJECT-CONTEXT.md` | footer + JSON-LD `sameAs` |
| URL Instagram | `index.html` + `PROJECT-CONTEXT.md` | footer + JSON-LD `sameAs` |
| Email contact | `index.html` | `<a href="mailto:…">` dans le footer |
| Domaine final | `index.html`, `sitemap.xml`, `robots.txt` | URLs canoniques |
