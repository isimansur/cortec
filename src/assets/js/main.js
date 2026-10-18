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
    document.querySelectorAll('h1, h2').forEach(splitHeadingIntoWords);
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  } else {
    document.body.classList.add('is-loaded');
  }

  // 2. Header scroll state & top optical progress beam
  const header = document.querySelector('.site-header');
  let headerTicking = false;
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
    if (isDesktop.matches) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    }
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

  // 4. IntersectionObserver for optical blur-to-sharp reveals & 5-strip gallery cascade
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
