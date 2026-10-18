/**
 * @fileoverview Centralized Schema.org JSON-LD Graph Factory (Senior Architect SSOT Pattern).
 * Generates deterministic, Google Search Central & Yandex Webmaster compliant @graph structures
 * directly from the Single Source of Truth (`src/data/site.js`).
 */

const site = require('../data/site');

/**
 * Normalizes a relative file path into a canonical absolute URL on the primary domain.
 * @param {string} [relPath='']
 * @returns {string}
 */
function toAbsoluteUrl(relPath = '') {
  if (!relPath || relPath === 'index.html' || relPath === '/') {
    return `${site.brand.domain}/`;
  }
  const clean = relPath.replace(/^\/+/, '');
  return `${site.brand.domain}/${clean}`;
}

/**
 * Builds a dual Google + Yandex compatible BreadcrumbList node.
 * @param {Array<{name: string, path?: string, url?: string}>} crumbs
 * @param {string} [idUrl]
 * @returns {object}
 */
function buildBreadcrumbNode(crumbs, idUrl) {
  const node = {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, idx) => {
      const targetUrl = c.url || toAbsoluteUrl(c.path || '');
      const safeName = c.name && c.name.length < 4 ? `Раздел ${c.name}` : c.name;
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: safeName,
        item: targetUrl,
        url: targetUrl
      };
    })
  };
  if (idUrl) {
    node['@id'] = `${idUrl}#breadcrumb`;
  }
  return node;
}

/**
 * Builds a FAQPage JSON-LD node.
 * @param {string} canonicalUrl
 * @param {Array<{q: string, a: string}>} faqItems
 * @returns {object}
 */
function buildFaqNode(canonicalUrl, faqItems) {
  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}

/**
 * Wraps graph nodes into a complete Schema.org JSON-LD document with Organization & SiteNavigationElement.
 * @param {Array<object>} nodes
 * @returns {string}
 */
function serializeGraph(nodes) {
  const graph = [
    site.organizationSchema,
    ...nodes,
    {
      '@type': 'ItemList',
      '@id': `${site.brand.domain}/#site-navigation`,
      name: site.siteNavigationSchema.name,
      itemListElement: site.siteNavigationSchema.itemListElement
    }
  ];

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph
    },
    null,
    2
  );
}

/**
 * Builds JSON-LD for the Home Page (`index.html`).
 * @returns {string}
 */
function buildHomePageSchema() {
  const rootUrl = toAbsoluteUrl('');
  return serializeGraph([
    {
      '@type': 'WebSite',
      '@id': `${site.brand.domain}/#website`,
      url: rootUrl,
      name: site.brand.name,
      alternateName: site.og.siteAlternateNames,
      inLanguage: 'ru-RU',
      publisher: {
        '@id': `${site.brand.domain}/#organization`
      },
      hasPart: site.nav
        .filter((item) => item.slug !== 'index')
        .map((item) => ({
          '@type': 'WebPage',
          '@id': `${toAbsoluteUrl(item.file)}#webpage`,
          name: item.sitelinkTitle,
          description: item.description,
          url: toAbsoluteUrl(item.file)
        }))
    },
    {
      '@type': 'WebPage',
      '@id': `${site.brand.domain}/#webpage`,
      url: rootUrl,
      name: 'CORTEC Грозный — Архитектурное остекление в Чеченской Республике и СКФО: ALUTECH, KBE, KÖMMERLING, AGC',
      isPartOf: {
        '@id': `${site.brand.domain}/#website`
      },
      about: {
        '@id': `${site.brand.domain}/#organization`
      }
    },
    buildBreadcrumbNode([{ name: 'Главная CORTEC', path: '' }])
  ]);
}

/**
 * Builds JSON-LD for a Brand/System Service Page (`alutech.html`, `kbe.html`).
 * @param {object} opts
 * @returns {string}
 */
function buildServicePageSchema({
  file,
  serviceName,
  serviceType,
  description,
  catalogName,
  offers = [],
  faq = [],
  breadcrumbLabel,
  rootCrumbLabel = 'CORTEC'
}) {
  const pageUrl = toAbsoluteUrl(file);
  const nodes = [
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: serviceName,
      url: pageUrl,
      provider: {
        '@type': 'Organization',
        '@id': `${site.brand.domain}/#organization`,
        name: site.brand.name,
        url: toAbsoluteUrl('')
      },
      serviceType,
      description,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: catalogName,
        itemListElement: offers.map((o) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: o.name,
            url: `${pageUrl}#${o.anchor}`
          }
        }))
      }
    }
  ];

  if (faq.length > 0) {
    nodes.push(buildFaqNode(pageUrl, faq));
  }

  nodes.push(
    buildBreadcrumbNode([
      { name: rootCrumbLabel, path: '' },
      { name: breadcrumbLabel, path: file }
    ])
  );

  return serializeGraph(nodes);
}

/**
 * Builds JSON-LD for a Brand/System WebPage (`kommerling.html`, `agc.html`).
 * @param {object} opts
 * @returns {string}
 */
function buildSystemWebPageSchema({ file, name, description, breadcrumbLabel }) {
  const pageUrl = toAbsoluteUrl(file);
  return serializeGraph([
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      inLanguage: 'ru-RU',
      isPartOf: {
        '@id': `${site.brand.domain}/#website`
      }
    },
    buildBreadcrumbNode(
      [
        { name: 'CORTEC', path: '' },
        { name: breadcrumbLabel, path: file }
      ],
      pageUrl
    )
  ]);
}

/**
 * Builds JSON-LD for an ItemList Showcase Page (`elements.html`).
 * @param {object} opts
 * @returns {string}
 */
function buildItemListPageSchema({ file, listName, items, breadcrumbLabel }) {
  const pageUrl = toAbsoluteUrl(file);
  return serializeGraph([
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#itemlist`,
      name: listName,
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: `${pageUrl}#${item.anchor}`
      }))
    },
    buildBreadcrumbNode([
      { name: 'CORTEC', path: '' },
      { name: breadcrumbLabel, path: file }
    ])
  ]);
}

/**
 * Builds JSON-LD for the About Page (`about.html`).
 * @returns {string}
 */
function buildAboutPageSchema() {
  const pageUrl = toAbsoluteUrl('about.html');
  return serializeGraph([
    {
      '@type': 'AboutPage',
      '@id': `${pageUrl}#aboutpage`,
      url: pageUrl,
      name: 'Компания CORTEC — Инженерный отдел КМ/КМД и шеф-монтаж',
      inLanguage: 'ru-RU',
      mainEntity: {
        '@id': `${site.brand.domain}/#organization`
      }
    },
    buildBreadcrumbNode([
      { name: 'CORTEC', path: '' },
      { name: 'Компания CORTEC', path: 'about.html' }
    ])
  ]);
}

/**
 * Builds JSON-LD for the Contact Page (`contact.html`).
 * @returns {string}
 */
function buildContactPageSchema() {
  const pageUrl = toAbsoluteUrl('contact.html');
  return serializeGraph([
    {
      '@type': 'ContactPage',
      '@id': `${pageUrl}#contactpage`,
      url: pageUrl,
      name: 'Контакты в Грозном — Офис и проектный отдел CORTEC',
      inLanguage: 'ru-RU',
      mainEntity: {
        '@id': `${site.brand.domain}/#organization`
      }
    },
    buildBreadcrumbNode([
      { name: 'CORTEC', path: '' },
      { name: 'Контакты в Грозном', path: 'contact.html' }
    ])
  ]);
}

/**
 * Builds JSON-LD for the Blog Index Page (`blog.html`).
 * @param {Array<object>} posts
 * @returns {string}
 */
function buildBlogIndexSchema(posts) {
  const pageUrl = toAbsoluteUrl('blog.html');
  return serializeGraph([
    {
      '@type': 'Blog',
      '@id': `${pageUrl}#blog`,
      url: pageUrl,
      name: 'Инженерный журнал CORTEC — Архитектурное и панорамное остекление',
      description:
        'Инженерные материалы CORTEC: расчет и монтаж фасадов ALUTECH, окон KBE и KÖMMERLING, стекла AGC Stopray и Stratophone в Грозном, Чеченской Республике и на Северном Кавкавказе.',
      inLanguage: 'ru-RU',
      publisher: {
        '@id': `${site.brand.domain}/#organization`
      },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: toAbsoluteUrl(`blog/${p.slug}.html`),
        datePublished: p.datePublished,
        dateModified: p.dateModified
      }))
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#itemlist`,
      name: 'Инженерный журнал CORTEC',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.title,
        url: toAbsoluteUrl(`blog/${p.slug}.html`)
      }))
    },
    buildBreadcrumbNode(
      [
        { name: 'CORTEC', path: '' },
        { name: 'Инженерный журнал', path: 'blog.html' }
      ],
      pageUrl
    )
  ]);
}

/**
 * Builds JSON-LD for an individual Blog Article (`/blog/{slug}.html`).
 * @param {object} post
 * @returns {string}
 */
function buildArticleSchema(post) {
  const canonicalUrl = toAbsoluteUrl(`blog/${post.slug}.html`);
  const nodes = [
    {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      headline: post.title,
      description: post.description,
      image: [
        `${site.brand.domain}/assets/img/${post.heroImg}.jpg`,
        site.og.image
      ],
      datePublished: post.datePublished,
      dateModified: post.dateModified || post.datePublished,
      inLanguage: 'ru-RU',
      articleSection: post.clusterLabel,
      keywords: post.keywords,
      author: {
        '@type': 'Organization',
        '@id': `${site.brand.domain}/#organization`,
        name: 'Инженерный департамент КМ/КМД CORTEC (г. Грозный)',
        url: toAbsoluteUrl('about.html')
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${site.brand.domain}/#organization`,
        name: site.brand.name,
        url: toAbsoluteUrl(''),
        logo: {
          '@type': 'ImageObject',
          url: `${site.brand.domain}/assets/img/cortec-logo.svg`
        }
      },
      about: [
        { '@type': 'Thing', name: post.h1 },
        { '@type': 'AdministrativeArea', name: 'Чеченская Республика' },
        { '@type': 'AdministrativeArea', name: 'Северо-Кавказский федеральный округ' }
      ]
    },
    buildBreadcrumbNode(
      [
        { name: 'CORTEC', path: '' },
        { name: 'Инженерный журнал', path: 'blog.html' },
        { name: post.h1.replace(/\.$/, ''), url: canonicalUrl }
      ],
      canonicalUrl
    )
  ];

  if (post.faq && post.faq.length > 0) {
    nodes.push(buildFaqNode(canonicalUrl, post.faq));
  }

  return serializeGraph(nodes);
}

module.exports = {
  toAbsoluteUrl,
  buildBreadcrumbNode,
  buildFaqNode,
  serializeGraph,
  buildHomePageSchema,
  buildServicePageSchema,
  buildSystemWebPageSchema,
  buildItemListPageSchema,
  buildAboutPageSchema,
  buildContactPageSchema,
  buildBlogIndexSchema,
  buildArticleSchema
};
