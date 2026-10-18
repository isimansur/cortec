const site = require('../data/site');

/**
 * Единый каркас страницы (Layout) по стандартам:
 * - joshbuchea/HEAD (оптимальный порядок <head>, canonical, hreflang, geo, Open Graph, RSS)
 * - AgriciDaniel/claude-seo (Local SEO NAP, areaServed, Core Web Vitals preload, SSR JSON-LD)
 * - coreyhaines31/marketingskills (Hub-and-Spoke перелинковка, E-E-A-T, отсутствие блокировки масштабирования)
 */
function renderLayout({
  slug,
  canonicalPath,
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogType = 'website',
  articleMeta = null,
  twitterDescription,
  preloadImg,
  schemaJson,
  noindex = false,
  mainHtml,
  prefix = '',
  cssHash = '12',
  inlineCss = ''
}) {
  const cleanPath = canonicalPath !== undefined
    ? canonicalPath
    : (slug === 'index' ? '' : `${slug}.html`);
  const canonicalUrl = cleanPath ? `${site.brand.domain}/${cleanPath}` : `${site.brand.domain}/`;

  const systemItems = site.nav.filter((item) => item.group === 'systems');
  const isSystemActive = systemItems.some((item) => item.slug === slug);

  const systemSubmenuLinks = systemItems.map((item) => {
    const isActive = item.slug === slug;
    const activeAttr = isActive ? ' class="nav-dropdown-link is-active" aria-current="page"' : ' class="nav-dropdown-link"';
    const titleAttr = item.sitelinkTitle ? ` title="${item.sitelinkTitle}: ${item.description}"` : '';
    return `          <a href="${prefix}${item.file}" itemprop="url"${activeAttr}${titleAttr}>
            <span class="nav-dropdown-title" itemprop="name">${item.label}</span>
            <span class="nav-dropdown-sub">${item.sublabel || ''}</span>
          </a>`;
  }).join('\n');

  const renderTopLink = (item) => {
    const isActive = item.slug === slug || (slug && slug.startsWith('blog/') && item.slug === 'blog');
    const activeAttr = isActive ? ' class="nav-top-link is-active" aria-current="page"' : ' class="nav-top-link"';
    const titleAttr = item.sitelinkTitle ? ` title="${item.sitelinkTitle}: ${item.description}"` : '';
    return `      <a href="${prefix}${item.file}" itemprop="url"${activeAttr}${titleAttr}><span itemprop="name">${item.label}</span></a>`;
  };

  const indexItem = site.nav.find((i) => i.slug === 'index');
  const tailItems = site.nav.filter((i) => !i.group && i.slug !== 'index');

  const navLinks = [
    renderTopLink(indexItem),
    `      <div class="nav-dropdown${isSystemActive ? ' is-active' : ''}">
        <button type="button" class="nav-dropdown-trigger${isSystemActive ? ' is-active' : ''}" aria-expanded="false" aria-haspopup="true">
          <span>Системы</span>
          <svg class="nav-dropdown-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="nav-dropdown-menu" role="menu" aria-label="Инженерные системы и технологии">
${systemSubmenuLinks}
        </div>
      </div>`,
    ...tailItems.map(renderTopLink)
  ].join('\n');

  const footerNavLinks = site.footerNav.map((item) =>
    `          <a href="${prefix}${item.file}">${item.label}</a>`
  ).join('\n');

  const footerSysLinks = site.footerSystems.map((item) =>
    `          <a href="${prefix}${item.file}">${item.label}</a>`
  ).join('\n');

  const preloadTag = preloadImg
    ? `  <link rel="preload" as="image" href="${prefix}assets/img/${preloadImg}.avif" imagesrcset="${prefix}assets/img/${preloadImg}-sm.avif 688w, ${prefix}assets/img/${preloadImg}.avif 1376w" imagesizes="(max-width: 768px) 50vw, 100vw" type="image/avif" fetchpriority="high">`
    : '';

  const ogImageUrl = preloadImg
    ? `${site.brand.domain}/assets/img/${preloadImg}.jpg`
    : site.og.image;

  const articleOgTags = articleMeta
    ? `  <meta property="article:published_time" content="${articleMeta.datePublished}">
  <meta property="article:modified_time" content="${articleMeta.dateModified || articleMeta.datePublished}">
  <meta property="article:section" content="${articleMeta.category}">
  <meta property="article:author" content="Инженерный департамент КМ/КМД CORTEC">`
    : '';

  const robotsContent = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // Normalize schemaJson for dual Google Sitelinks + Yandex Quick Links / BreadcrumbList + Organization Cards compatibility
  let enrichedSchemaJson = schemaJson;
  if (schemaJson) {
    try {
      const parsed = JSON.parse(schemaJson);
      if (parsed && Array.isArray(parsed['@graph'])) {
        let foundOrg = false;
        for (const node of parsed['@graph']) {
          if (node['@id'] === `${site.brand.domain}/#organization`) {
            foundOrg = true;
            node.hasMap = site.contact.hasMapUrls;
            node.sameAs = site.contact.sameAsUrls;
          }
          if (node.mainEntity && node.mainEntity['@id'] === `${site.brand.domain}/#organization`) {
            node.mainEntity.hasMap = site.contact.hasMapUrls;
            node.mainEntity.sameAs = site.contact.sameAsUrls;
          }
          if (node['@type'] === 'BreadcrumbList' && Array.isArray(node.itemListElement)) {
            node.itemListElement = node.itemListElement.map((li) => {
              let targetUrl = li.item || li.url || canonicalUrl;
              // Ensure internal page URLs match canonical .html format (except root '/')
              if (
                typeof targetUrl === 'string' &&
                targetUrl.startsWith(site.brand.domain + '/') &&
                targetUrl !== `${site.brand.domain}/` &&
                !targetUrl.endsWith('.html') &&
                !targetUrl.includes('#')
              ) {
                targetUrl = `${targetUrl}.html`;
              }
              return {
                '@type': 'ListItem',
                position: li.position,
                name: li.name && li.name.length < 4 ? `Раздел ${li.name}` : li.name,
                item: targetUrl,
                url: targetUrl
              };
            });
          }
        }
        if (!foundOrg) {
          parsed['@graph'].unshift(site.organizationSchema);
        }
        const hasSiteNav = parsed['@graph'].some((n) => n['@id'] === `${site.brand.domain}/#site-navigation`);
        if (!hasSiteNav) {
          parsed['@graph'].push({
            '@type': 'ItemList',
            '@id': `${site.brand.domain}/#site-navigation`,
            name: site.siteNavigationSchema.name,
            itemListElement: site.siteNavigationSchema.itemListElement
          });
        }
      }
      enrichedSchemaJson = JSON.stringify(parsed, null, 2);
    } catch (_) {
      enrichedSchemaJson = schemaJson;
    }
  }

  const schemaBlock = (!noindex && enrichedSchemaJson)
    ? `  <!-- Schema.org JSON-LD (Google Sitelinks + Yandex Quick Links & BreadcrumbList) -->
  <script type="application/ld+json">
${enrichedSchemaJson}
  </script>`
    : '';

  return `<!DOCTYPE html>
<html lang="ru" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="CORTEC — Инженерный департамент КМ/КМД (г. Грозный)">
  <meta name="robots" content="${robotsContent}">
  <meta name="googlebot" content="${robotsContent}">
  <meta name="yandex" content="${noindex ? 'noindex, follow' : 'index, follow'}">
  <meta name="theme-color" content="${site.brand.themeColor}">
  <meta name="color-scheme" content="dark">
  <meta name="application-name" content="CORTEC">
  <meta name="apple-mobile-web-app-title" content="CORTEC">
  <meta name="format-detection" content="telephone=no">

  <!-- Local & Regional Geo Meta -->
  <meta name="geo.region" content="${site.contact.regionCode}">
  <meta name="geo.placename" content="${site.contact.city}, ${site.contact.region}">
  <meta name="geo.position" content="${site.contact.geo.lat};${site.contact.geo.lng}">
  <meta name="ICBM" content="${site.contact.geo.lat}, ${site.contact.geo.lng}">

  <!-- Canonical, Hreflang & Feeds -->
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="ru-RU" href="${canonicalUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
  <link rel="alternate" type="application/rss+xml" title="Инженерный журнал CORTEC — Статьи об остеклении в ЧР и СКФО" href="${site.brand.domain}/rss.xml">

  <!-- Open Graph -->
  <meta property="og:site_name" content="${site.og.siteName}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${ogTitle || title}">
  <meta property="og:description" content="${ogDescription || description}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:secure_url" content="${ogImageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <link itemprop="thumbnailUrl" href="${ogImageUrl}">
  <meta property="og:image:width" content="${site.og.imageWidth}">
  <meta property="og:image:height" content="${site.og.imageHeight}">
  <meta property="og:image:alt" content="${site.og.imageAlt}">
  <meta property="og:locale" content="${site.og.locale}">
${articleOgTags}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${ogTitle || title}">
  <meta name="twitter:description" content="${twitterDescription || ogDescription || description}">
  <meta name="twitter:image" content="${ogImageUrl}">

  <!-- Preconnect, Non-Render-Blocking Webfonts & LCP Preload for Core Web Vitals -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${preloadTag}
  ${inlineCss ? `<style>${inlineCss}</style>\n  <link rel="preload" as="style" href="${prefix}assets/css/style.css?v=${cssHash}">\n  <link rel="stylesheet" href="${prefix}assets/css/style.css?v=${cssHash}" media="print" onload="this.media='all'">\n  <noscript><link rel="stylesheet" href="${prefix}assets/css/style.css?v=${cssHash}"></noscript>` : `<link rel="stylesheet" href="${prefix}assets/css/style.css?v=${cssHash}">`}
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Onest:wght@200;300;400;500&family=Unbounded:wght@200;300;400;500&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Onest:wght@200;300;400;500&family=Unbounded:wght@200;300;400;500&display=swap"></noscript>
  <link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">
  <link rel="shortcut icon" type="image/svg+xml" href="${prefix}favicon.svg">
  <link rel="apple-touch-icon" href="${prefix}favicon.svg">
  <link rel="manifest" href="${prefix}site.webmanifest">

${schemaBlock}
</head>
<body>
  <a href="#main-content" class="skip-link">Перейти к основному содержанию</a>

  <!-- HEADER -->
  <header class="site-header">
    <a href="${prefix}index.html" class="brand-logo" aria-label="CORTEC technologies — На главную">
      ${site.logoSvg}
      <span class="brand-logo-sub">technologies</span>
    </a>
    <nav class="main-nav" aria-label="Основная навигация" itemscope itemtype="https://schema.org/SiteNavigationElement">
${navLinks}
    </nav>
    <a href="${prefix}contact.html" class="header-cta">Обсудить проект</a>
    <button class="mobile-menu-toggle" aria-expanded="false" aria-label="Открыть меню">Меню</button>
  </header>

  <main id="main-content">
${mainHtml}
  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${prefix}index.html" class="brand-logo" aria-label="CORTEC technologies — На главную">
            ${site.logoSvg}
            <span class="brand-logo-sub">technologies</span>
          </a>
          <p>
            Инженерное проектирование КМ/КМД, комплектация и шеф-монтаж архитектурных алюминиевых систем ALUTECH, немецких оконно-дверных конструкций KBE и KÖMMERLING со стеклом AGC в Чеченской Республике и регионах Северного Кавказа.
          </p>
        </div>

        <nav class="footer-nav-col" aria-label="Навигация по сайту">
          <span class="footer-col-title">Экспозиция</span>
${footerNavLinks}
        </nav>

        <nav class="footer-systems-col" aria-label="Инженерные направления">
          <span class="footer-col-title">Инженерные направления</span>
${footerSysLinks}
        </nav>

        <address class="footer-contact-col" itemscope itemtype="https://schema.org/HomeAndConstructionBusiness" itemid="${site.brand.domain}/#organization">
          <span class="footer-col-title">Офис в Грозном</span>
          <meta itemprop="name" content="${site.brand.name}">
          <link itemprop="url" href="${site.brand.domain}/">
          <link itemprop="image" href="${site.og.image}">
          <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
            <meta itemprop="postalCode" content="${site.contact.postalCode}">
            <meta itemprop="addressCountry" content="RU">
            <meta itemprop="addressRegion" content="${site.contact.region}">
            <meta itemprop="addressLocality" content="${site.contact.city}">
            <span itemprop="streetAddress">${site.contact.street}</span>
          </span>
          <a href="${site.contact.phonePrimary.href}" itemprop="telephone">${site.contact.phonePrimary.display}</a>
          <a href="${site.contact.whatsappUrl}" target="_blank" rel="me noopener noreferrer" itemprop="sameAs">WhatsApp инженера ↗</a>
          <a href="mailto:${site.contact.email}" itemprop="email">${site.contact.email}</a>
          <meta itemprop="openingHours" content="${site.contact.hoursIso}">
          <span>${site.contact.hours}</span>
          <a href="${site.contact.yandexMapUrl}" target="_blank" rel="me noopener noreferrer" itemprop="sameAs">Яндекс Карты ↗</a>
          <a href="${site.contact.googleProfileUrl}" target="_blank" rel="me noopener noreferrer" itemprop="sameAs">Google Карты ↗</a>
          <link itemprop="sameAs" href="${site.contact.yandexOrgCanonicalUrl}">
          <link itemprop="sameAs" href="${site.contact.yandexMapsCanonicalUrl}">
          <link itemprop="hasMap" href="${site.contact.googleProfileUrl}">
          <link itemprop="hasMap" href="${site.contact.yandexOrgCanonicalUrl}">
          <link itemprop="hasMap" href="${site.contact.yandexMapsCanonicalUrl}">
        </address>
      </div>

      <div class="footer-bottom">
        <span>© ${site.brand.copyrightYear} ${site.brand.name} · ${site.contact.fullAddress}</span>
        <span><a href="${prefix}privacy.html" class="text-link">Политика конфиденциальности</a> · Технологии ALUTECH · KBE · KÖMMERLING · AGC</span>
      </div>
    </div>
  </footer>

  <script src="${prefix}assets/js/main.js?v=${cssHash}" defer></script>
</body>
</html>`;
}

module.exports = { renderLayout };
