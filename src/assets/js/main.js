document.addEventListener('DOMContentLoaded', () => {
  // 1. Kinetic Word-Mask Splitting for Headings (h1, h2)
  // Preserves nested elements like <span class="halftone"> and <br>
  const splitHeadingIntoWords = (heading) => {
    if (heading.dataset.splitDone === 'true') return;
    heading.dataset.splitDone = 'true';
    let wordIndex = 0;

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        if (!text.trim()) return node.cloneNode(false);

        const frag = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(' '));
          } else {
            const mask = document.createElement('span');
            mask.className = 'word-mask';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.style.setProperty('--word-index', String(wordIndex++));
            inner.textContent = token;
            mask.appendChild(inner);
            frag.appendChild(mask);
          }
        });
        return frag;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') {
          return node.cloneNode(false);
        }
        const clone = node.cloneNode(false);
        Array.from(node.childNodes).forEach((child) => {
          clone.appendChild(processNode(child));
        });
        return clone;
      }

      return node.cloneNode(false);
    };

    const newChildren = document.createDocumentFragment();
    Array.from(heading.childNodes).forEach((child) => {
      newChildren.appendChild(processNode(child));
    });
    heading.innerHTML = '';
    heading.appendChild(newChildren);
  };

  const isDesktop = window.matchMedia('(min-width: 1025px)');

  if (isDesktop.matches) {
    document.querySelectorAll('h1, h2:not(.blog-card-title)').forEach(splitHeadingIntoWords);
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  } else {
    document.body.classList.add('is-loaded');
  }

  // 2. Header scroll state & architectural scroll progress bar (All Pages, Mobile + Desktop, Zero-Reflow)
  const header = document.querySelector('.site-header');
  let headerTicking = false;
  let cachedMaxScroll = 1;

  const recalcMaxScroll = () => {
    cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };
  recalcMaxScroll();
  window.addEventListener('resize', recalcMaxScroll, { passive: true });
  window.addEventListener('load', recalcMaxScroll, { once: true, passive: true });

  const updateHeaderAndProgress = () => {
    headerTicking = false;
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 32) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    const progress = Math.min(1, Math.max(0, scrollY / cachedMaxScroll));
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!headerTicking) {
        headerTicking = true;
        requestAnimationFrame(updateHeaderAndProgress);
      }
    },
    { passive: true }
  );
  updateHeaderAndProgress();

  // 3. Mobile menu & Systems dropdown toggle
  const menuBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');

  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuBtn.textContent = isOpen ? 'Закрыть' : 'Меню';
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.textContent = 'Меню';
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Architectural CAD Blueprint Schematics for Single-Column Stagger Rows (Zero Empty Voids)
  const cadSchematics = [
    {
      code: 'CAD-NODE // 01 · ALT-F50 / SG',
      meta: 'Ix = 294.6 cm⁴ · ΔT 68°C · EN 13830',
      label: 'STATIC MULLION-TRANSOM AXIS & THERMAL BREAK',
      svg: `<svg class="cad-blueprint-svg" viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line class="cad-axis" x1="20" y1="110" x2="440" y2="110" />
        <line class="cad-axis" x1="230" y1="14" x2="230" y2="206" />
        <circle class="cad-ring" cx="230" cy="110" r="78" />
        <circle class="cad-ring-inner" cx="230" cy="110" r="44" />
        <rect class="cad-stroke" x="186" y="42" width="88" height="136" rx="3" />
        <path class="cad-stroke-gold" d="M74 82 H186 M274 82 H386 M74 138 H186 M274 138 H386" />
        <path class="cad-stroke" d="M212 42 V178 M248 42 V178" />
        <rect class="cad-node-fill" x="216" y="96" width="28" height="28" />
        <circle class="cad-dot" cx="230" cy="110" r="3.5" />
        <circle class="cad-dot" cx="110" cy="82" r="2.5" />
        <circle class="cad-dot" cx="350" cy="138" r="2.5" />
        <path class="cad-dim" d="M74 60 V74 M386 60 V74 M74 67 H386" />
        <text x="230" y="61" text-anchor="middle" class="cad-svg-txt">50.0 mm VISIBLE SIGHTLINE</text>
        <text x="384" y="198" text-anchor="end" class="cad-svg-txt-muted">SCALE 1:2 · ISO 10077-2</text>
      </svg>`
    },
    {
      code: 'CAD-NODE // 02 · IGU-62 / AGC',
      meta: 'Ug = 0.52 W/(m²·K) · Rw = 44 dB',
      label: 'TRIPLE GLAZING & WARM-EDGE ISOTHERM VECTOR',
      svg: `<svg class="cad-blueprint-svg" viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line class="cad-axis" x1="20" y1="110" x2="440" y2="110" />
        <path class="cad-stroke" d="M115 28 V192 M131 28 V192 M222 28 V192 M234 28 V192 M325 28 V192 M341 28 V192" />
        <rect class="cad-node-fill" x="131" y="156" width="91" height="24" />
        <rect class="cad-node-fill" x="234" y="156" width="91" height="24" />
        <path class="cad-stroke-gold" d="M62 162 C135 162, 175 128, 228 96 C280 64, 325 48, 398 48" />
        <circle class="cad-dot" cx="123" cy="150" r="3" />
        <circle class="cad-dot" cx="228" cy="96" r="4" />
        <circle class="cad-dot" cx="333" cy="54" r="3" />
        <path class="cad-dim" d="M115 202 H341" />
        <text x="228" y="215" text-anchor="middle" class="cad-svg-txt">8 SG · 20 Ar · 6 · 20 Ar · 6.6.2 STRATOPHONE</text>
        <text x="64" y="150" class="cad-svg-txt-muted">-20°C EXT</text>
        <text x="356" y="42" class="cad-svg-txt">+22°C INT</text>
      </svg>`
    },
    {
      code: 'CAD-NODE // 03 · SL160 / ZERO',
      meta: 'm(max) = 400 kg · EN 12207 CLASS 4',
      label: 'HIDDEN KINEMATICS & ZERO-THRESHOLD DRAINAGE',
      svg: `<svg class="cad-blueprint-svg" viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line class="cad-axis" x1="20" y1="146" x2="440" y2="146" />
        <line class="cad-axis" x1="170" y1="18" x2="170" y2="204" />
        <rect class="cad-stroke" x="76" y="146" width="308" height="36" rx="2" />
        <rect class="cad-node-fill" x="142" y="38" width="56" height="108" />
        <path class="cad-stroke-gold" d="M170 92 H348 L334 82 M348 92 L334 102" />
        <path class="cad-stroke-gold" d="M198 164 H360 L376 184" />
        <circle class="cad-ring-inner" cx="170" cy="134" r="14" />
        <circle class="cad-dot" cx="170" cy="134" r="3.5" />
        <text x="275" y="80" text-anchor="middle" class="cad-svg-txt">KINEMATIC SLIDE VECTOR</text>
        <text x="76" y="138" class="cad-svg-txt-muted">0.00 FLUSH FLOOR LEVEL</text>
      </svg>`
    }
  ];

  let cadIndex = 0;
  document.querySelectorAll('.editorial-stagger .stagger-row').forEach((row) => {
    if (row.children.length !== 1) return;
    const onlyCol = row.firstElementChild;
    if (!onlyCol) return;
    const isLeft = onlyCol.classList.contains('stagger-left');
    const isRight = onlyCol.classList.contains('stagger-right');
    if (!isLeft && !isRight) return;

    const spec = cadSchematics[cadIndex % cadSchematics.length];
    cadIndex++;

    const cadCol = document.createElement('div');
    cadCol.className = `${isLeft ? 'stagger-right' : 'stagger-left'} stagger-cad-bridge ${ isLeft ? 'stagger-cad-bridge--right' : 'stagger-cad-bridge--left' }`;
    cadCol.setAttribute('aria-hidden', 'true');
    cadCol.innerHTML = `
      <div class="cad-bridge-inner">
        <div class="cad-bridge-head">
          <span class="cad-bridge-code">${spec.code}</span>
          <span class="cad-bridge-line"></span>
          <span class="cad-bridge-meta">${spec.meta}</span>
        </div>
        <div class="cad-bridge-canvas">
          ${spec.svg}
        </div>
        <div class="cad-bridge-foot">
          <span class="cad-bridge-label">${spec.label}</span>
          <span class="cad-bridge-coords">43.3208° N · 45.7145° E</span>
        </div>
      </div>
    `;

    if (isLeft) {
      row.appendChild(cadCol);
    } else {
      row.insertBefore(cadCol, onlyCol);
    }
    row.classList.add('has-cad-bridge');
  });

  // 5. IntersectionObserver for optical blur-to-sharp reveals & 5-strip gallery cascade
  const revealItems = document.querySelectorAll('.reveal, .apex-five-strip');
  if ('IntersectionObserver' in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // 5. IntersectionObserver for continuous full-bleed macro stages
  const macroStages = document.querySelectorAll('.macro-stage');
  if ('IntersectionObserver' in window && macroStages.length > 0) {
    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
          } else {
            entry.target.classList.remove('is-inview');
          }
        });
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );
    macroStages.forEach((stage) => stageObserver.observe(stage));
  }

  // 6. Desktop Interactive Physics: Smooth Scroll Parallax, Hero Spatial Drift, Magnetic Buttons & 3D Gallery Tilt
  // 6a. Continuous rAF Scroll Parallax for Hero & Macro Stages (Desktop Only to keep Mobile TBT = 0ms)
  const parallaxScenes = document.querySelectorAll('.hero-viewport, .macro-stage');
  let currentScrollY = window.scrollY;
  let targetScrollY = window.scrollY;
  let rafRunning = false;

  const updateParallaxFrame = () => {
    if (!isDesktop.matches) {
      rafRunning = false;
      return;
    }
    currentScrollY += (targetScrollY - currentScrollY) * 0.14;
    const vh = window.innerHeight;
    const imgAmp = -38;
    const txtAmp = 16;

    parallaxScenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;

      const centerOffset = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
      const imgShift = (centerOffset * imgAmp).toFixed(2);
      const textShift = (centerOffset * txtAmp).toFixed(2);

      scene.style.setProperty('--stage-parallax-y', `${imgShift}px`);
      scene.style.setProperty('--text-parallax-y', `${textShift}px`);
    });

    if (Math.abs(targetScrollY - currentScrollY) > 0.25) {
      requestAnimationFrame(updateParallaxFrame);
    } else {
      rafRunning = false;
    }
  };

  if (isDesktop.matches) {
    window.addEventListener(
      'scroll',
      () => {
        targetScrollY = window.scrollY;
        if (!rafRunning) {
          rafRunning = true;
          requestAnimationFrame(updateParallaxFrame);
        }
      },
      { passive: true }
    );
    updateParallaxFrame();
  }

  // Mobile scroll-focus observer for Brand Cards & Strip Cards
  const focusCards = document.querySelectorAll('.brand-logo-card, .apex-strip-item');
  if ('IntersectionObserver' in window && focusCards.length > 0) {
    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-mobile-focus');
          } else {
            entry.target.classList.remove('is-mobile-focus');
          }
        });
      },
      { threshold: 0.45, rootMargin: '-15% 0px -15% 0px' }
    );
    focusCards.forEach((c) => focusObserver.observe(c));
  }

  // 6b. Subtle mouse-driven spatial parallax on Desktop Hero
  const heroViewport = document.querySelector('.hero-viewport');
  if (heroViewport && isDesktop.matches) {
    heroViewport.addEventListener('mousemove', (e) => {
      const rect = heroViewport.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      heroViewport.style.setProperty('--hero-x', `${x.toFixed(1)}px`);
      heroViewport.style.setProperty('--hero-y', `${y.toFixed(1)}px`);
    });
  }

  // 6c. Magnetic Tactile Pull & Specular Light Tracking on Buttons
  const magneticButtons = document.querySelectorAll('.btn-sand, .btn-oval, .header-cta');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      if (!isDesktop.matches) return;
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const magX = ((relX / rect.width) - 0.5) * 10;
      const magY = ((relY / rect.height) - 0.5) * 8 - 2;
      btn.style.setProperty('--mag-x', `${magX.toFixed(1)}px`);
      btn.style.setProperty('--mag-y', `${magY.toFixed(1)}px`);
      btn.style.setProperty('--glow-x', `${relX.toFixed(0)}px`);
      btn.style.setProperty('--glow-y', `${relY.toFixed(0)}px`);
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--mag-x', '0px');
      btn.style.setProperty('--mag-y', '0px');
    });
  });

  // 6c-2. Specular Spotlight Tracking on Brand Logo Cards
  const brandCards = document.querySelectorAll('.brand-logo-card');
  brandCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (!isDesktop.matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${(e.clientX - rect.left).toFixed(0)}px`);
      card.style.setProperty('--glow-y', `${(e.clientY - rect.top).toFixed(0)}px`);
    });
  });

  // 6d. 3D Perspective Tilt & Optical Glass Sheen on APEX 5-Strip Gallery Items
  const stripItems = document.querySelectorAll('.apex-strip-item');
  stripItems.forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      if (!isDesktop.matches) return;
      const rect = item.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const normX = relX / rect.width - 0.5;
      const normY = relY / rect.height - 0.5;
      const tiltX = (normY * -7).toFixed(2);
      const tiltY = (normX * 7).toFixed(2);
      item.style.setProperty('--tilt-x', `${tiltX}deg`);
      item.style.setProperty('--tilt-y', `${tiltY}deg`);
      item.style.setProperty('--glow-x', `${relX.toFixed(0)}px`);
      item.style.setProperty('--glow-y', `${relY.toFixed(0)}px`);
    });

    item.addEventListener('mouseleave', () => {
      item.style.setProperty('--tilt-x', '0deg');
      item.style.setProperty('--tilt-y', '0deg');
    });
  });

  // 7. Center the 3rd (featured) card in the mobile 5-strip carousel on load
  const stripCarousel = document.querySelector('.apex-five-strip');
  if (stripCarousel && window.innerWidth <= 768) {
    const middleCard = stripCarousel.children[2];
    if (middleCard) {
      requestAnimationFrame(() => {
        const scrollLeft =
          middleCard.offsetLeft - (stripCarousel.clientWidth - middleCard.clientWidth) / 2;
        stripCarousel.scrollTo({ left: scrollLeft, behavior: 'instant' });
      });
    }
  }

  // 8. Contact form handling (Direct WhatsApp +7 928 000-76-66 dispatch via SSOT data-* attributes)
  const contactForm = document.querySelector('#cortec-contact-form');
  const feedbackEl = document.querySelector('#form-feedback');

  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const contact = (formData.get('contact') || '').toString().trim();
      const system = (formData.get('system') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      const domainHost = contactForm.dataset.domain || 'cortectech.pro';
      const whatsappPhone = contactForm.dataset.whatsapp || '79280007666';

      const lines = [
        `Здравствуйте, CORTEC! Заявка с сайта ${domainHost}:`,
        name ? `• Имя: ${name}` : '',
        contact ? `• Контакт: ${contact}` : '',
        system ? `• Система: ${system}` : '',
        message ? `• Задача / объект: ${message}` : ''
      ].filter(Boolean);

      const waUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      feedbackEl.textContent = name
        ? `${name}, заявка сформирована и открыта в WhatsApp инженера CORTEC (+7 928 000-76-66).`
        : 'Заявка сформирована и открыта в WhatsApp инженера CORTEC (+7 928 000-76-66).';
    });
  }
});
