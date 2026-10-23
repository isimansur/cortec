#!/usr/bin/env node
/**
 * CORTEC ZERO-DEPENDENCY STATIC SITE BUILDER, SEO/GEO GENERATOR & VALIDATOR
 * Сборка 10 основных страниц + 30 инженерных SEO-статей блога + sitemap.xml + rss.xml + llms.txt.
 * Использование: node build.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const t0 = Date.now();
const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const site = require('./src/data/site');
const { BLOG_POSTS } = require('./src/data/blog');
const { renderLayout } = require('./src/components/Layout');
const { buildArticleSchema, renderBlogArticle } = require('./src/components/BlogArticle');

const PAGE_SLUGS = [
  'index',
  'alutech',
  'kbe',
  'kommerling',
  'agc',
  'elements',
  'blog',
  'about',
  'contact',
  'privacy',
  '404',
  'design-system'
];

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// 1. Clean & prepare dist/
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'blog'), { recursive: true });

// 2. Copy static files & assets
copyDirSync(path.join(SRC, 'static'), DIST);
copyDirSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\/\/.*$/, '').trim())
    .filter(Boolean)
    .join('\n');
}

// 3. Concatenate & minify modular CSS Design System: Critical Above-the-Fold + Responsive CSS (01..05, 07..08) inlined, Deferred (06, 09, 10) external
const styleFiles = fs.readdirSync(path.join(SRC, 'styles'))
  .filter((f) => f.endsWith('.css'))
  .sort();

const criticalRegex = /^(01|02|03|04|05|07|08)-/;
const criticalStyleFiles = styleFiles.filter((f) => criticalRegex.test(f));
const deferredStyleFiles = styleFiles.filter((f) => !criticalRegex.test(f));

const rawCriticalCss = criticalStyleFiles
  .map((f) => fs.readFileSync(path.join(SRC, 'styles', f), 'utf8'))
  .join('\n\n');

const rawDeferredCss = deferredStyleFiles
  .map((f) => fs.readFileSync(path.join(SRC, 'styles', f), 'utf8'))
  .join('\n\n');

const combinedCss = minifyCss(rawDeferredCss);
const criticalCss = minifyCss(rawCriticalCss);
const cssPath = path.join(DIST, 'assets/css/style.css');
fs.writeFileSync(cssPath, combinedCss);

const cssHash = crypto.createHash('md5').update(combinedCss).digest('hex').slice(0, 8);
let jsHash = cssHash;

const jsDistPath = path.join(DIST, 'assets/js/main.js');
if (fs.existsSync(jsDistPath)) {
  const rawJs = fs.readFileSync(jsDistPath, 'utf8');
  const minJs = minifyJs(rawJs);
  fs.writeFileSync(jsDistPath, minJs);
  jsHash = crypto.createHash('md5').update(minJs).digest('hex').slice(0, 8);
}

// 4. Render all core pages + 30 blog articles
let verifiedImages = 0;
let missingImages = [];

function optimizeResponsiveSizes(html) {
  return html
    .replace(/sizes="100vw"/g, 'sizes="(max-width: 768px) 50vw, 100vw"')
    .replace(/href="((?:\.\.\/)*)index\.html(#[^"]*)?"/g, (_, pfx, hash = '') => `href="${pfx || './'}${hash}"`)
    .replace(/href="((?:\.\.\/)*[a-z0-9/_-]+)\.html(#[^"]*)?"/gi, 'href="$1$2"');
}

function normalizePrefixInHtml(html, prefix) {
  const sized = optimizeResponsiveSizes(html);
  if (!prefix) return sized;
  return sized.replace(/(src|href|srcset)="(assets\/[^"]+)"/g, `$1="${prefix}$2"`);
}

function validateHtmlAssets(html, fileLabel, baseDir) {
  if (/(src|href|srcset)="\/assets\//.test(html)) {
    throw new Error(`[Validator] Found root-locked /assets/ path in ${fileLabel}`);
  }
  const imgRegex = /(?:src|srcset)="([^"]+\.(?:avif|jpg|png|svg))"/g;
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    const relPath = m[1].split(' ')[0];
    if (relPath.startsWith('http')) continue;
    const diskPath = path.resolve(baseDir, relPath);
    if (!fs.existsSync(diskPath)) {
      missingImages.push(`${fileLabel} -> ${relPath}`);
    } else {
      verifiedImages++;
    }
  }
}

for (const slug of PAGE_SLUGS) {
  const pageMod = require(path.join(SRC, 'pages', `${slug}.js`));

  // A. Root flat HTML file (e.g. alutech.html, blog.html)
  const mainRoot = normalizePrefixInHtml(pageMod.renderMain({ prefix: '' }), '');
  const htmlRoot = renderLayout({
    ...pageMod,
    canonicalPath: slug === 'index' ? '' : slug,
    mainHtml: mainRoot,
    prefix: '',
    cssHash,
    jsHash,
    inlineCss: criticalCss
  });
  const outRootFile = path.join(DIST, pageMod.file);
  fs.writeFileSync(outRootFile, htmlRoot);
  validateHtmlAssets(htmlRoot, pageMod.file, DIST);

  // B. Subdirectory clean-URL file (e.g. alutech/index.html, blog/index.html)
  if (slug !== 'index') {
    const subDir = path.join(DIST, slug);
    fs.mkdirSync(subDir, { recursive: true });
    const mainSub = normalizePrefixInHtml(pageMod.renderMain({ prefix: '../' }), '../');
    const htmlSub = renderLayout({
      ...pageMod,
      canonicalPath: slug,
      mainHtml: mainSub,
      prefix: '../',
      cssHash,
      jsHash,
      inlineCss: criticalCss
    });
    const outSubFile = path.join(subDir, 'index.html');
    fs.writeFileSync(outSubFile, htmlSub);
    validateHtmlAssets(htmlSub, `${slug}/index.html`, subDir);
  }
}

// 4B. Render all 30 SEO Blog Articles (/blog/{slug}.html AND /blog/{slug}/index.html)
for (const post of BLOG_POSTS) {
  const schemaJson = buildArticleSchema(post);
  const articleMeta = {
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    category: post.clusterLabel
  };

  // 1) /blog/{slug}.html (prefix is '../')
  const mainBlogFlat = optimizeResponsiveSizes(renderBlogArticle(post, { prefix: '../' }));
  const htmlBlogFlat = renderLayout({
    slug: `blog/${post.slug}`,
    canonicalPath: `blog/${post.slug}`,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    ogTitle: post.title,
    ogDescription: post.description,
    ogType: 'article',
    articleMeta,
    twitterDescription: post.description,
    preloadImg: post.heroImg,
    schemaJson,
    mainHtml: mainBlogFlat,
    prefix: '../',
    cssHash,
    jsHash,
    inlineCss: criticalCss
  });
  const outBlogFlat = path.join(DIST, 'blog', `${post.slug}.html`);
  fs.writeFileSync(outBlogFlat, htmlBlogFlat);
  validateHtmlAssets(htmlBlogFlat, `blog/${post.slug}.html`, path.join(DIST, 'blog'));

  // 2) /blog/{slug}/index.html (prefix is '../../')
  const subBlogDir = path.join(DIST, 'blog', post.slug);
  fs.mkdirSync(subBlogDir, { recursive: true });
  const mainBlogSub = optimizeResponsiveSizes(renderBlogArticle(post, { prefix: '../../' }));
  const htmlBlogSub = renderLayout({
    slug: `blog/${post.slug}`,
    canonicalPath: `blog/${post.slug}`,
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    ogTitle: post.title,
    ogDescription: post.description,
    ogType: 'article',
    articleMeta,
    twitterDescription: post.description,
    preloadImg: post.heroImg,
    schemaJson,
    mainHtml: mainBlogSub,
    prefix: '../../',
    cssHash,
    jsHash,
    inlineCss: criticalCss
  });
  const outBlogSub = path.join(subBlogDir, 'index.html');
  fs.writeFileSync(outBlogSub, htmlBlogSub);
  validateHtmlAssets(htmlBlogSub, `blog/${post.slug}/index.html`, subBlogDir);
}

// 5. Generate sitemap.xml automatically (9 public core pages + 30 blog articles = 39 canonical URLs)
const NOINDEX_SLUGS = new Set(['design-system', 'privacy', '404']);
const coreSitemapUrls = PAGE_SLUGS
  .filter((slug) => !NOINDEX_SLUGS.has(slug))
  .map((slug) => {
    const loc = slug === 'index' ? `${site.brand.domain}/` : `${site.brand.domain}/${slug}`;
    const priority = slug === 'index' ? '1.0' : '0.9';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>2026-10-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

const blogSitemapUrls = BLOG_POSTS.map((post) => {
  const priority = post.cluster === 'chechnya' ? '0.9' : (post.cluster === 'caucasus' ? '0.85' : '0.8');
  return `  <url>
    <loc>${site.brand.domain}/blog/${post.slug}</loc>
    <lastmod>${post.dateModified || post.datePublished}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...coreSitemapUrls, ...blogSitemapUrls].join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml);

// 5B. Generate RSS 2.0 Feed (rss.xml) for Yandex Turbo / Search / Feed Readers
const rssItems = BLOG_POSTS.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site.brand.domain}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site.brand.domain}/blog/${post.slug}</guid>
      <category>${escapeXml(post.clusterLabel)}</category>
      <description>${escapeXml(post.geoSummary)}</description>
      <pubDate>${new Date(post.datePublished + 'T10:00:00+03:00').toUTCString()}</pubDate>
    </item>`).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Инженерный журнал CORTEC — Архитектурное остекление в ЧР и СКФО</title>
    <link>${site.brand.domain}/blog</link>
    <description>Инженерные публикации CORTEC о панорамном и фасадном остеклении ALUTECH, KBE, KÖMMERLING и AGC в Грозном, Чеченской Республике и на Северном Кавказе.</description>
    <language>ru-ru</language>
    <atom:link href="${site.brand.domain}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(DIST, 'rss.xml'), rssXml);

// 5C. Generate llms.txt for AI Search / GEO (ChatGPT Search, Claude, Perplexity, Yandex Neuro) dynamically from SSOT
const llmsTxt = `# ${site.brand.name} (${site.brand.tagline}) — Архитектурное и фасадное остекление в Чеченской Республике и на Северном Кавказе

> Инженерное проектирование КМ/КМД, комплектация и шеф-монтаж светопрозрачных конструкций на базе систем ALUTECH, KBE, KÖMMERLING и архитектурного стекла AGC (Asahi Glass Co.).

## Контакты и штаб-квартира (NAP)
- **Компания:** ${site.brand.name} (${site.brand.tagline})
- **Адрес офиса и шоурума узлов:** ${site.contact.fullAddress}
- **Координаты:** ${site.contact.geo.lat}, ${site.contact.geo.lng}
- **Телефон проектного отдела и WhatsApp:** ${site.contact.phonePrimary.display}
- **Дополнительные телефоны:** ${site.contact.phonesSecondary.map((p) => p.display).join(', ')}
- **Email:** ${site.contact.email}
- **Режим работы:** ${site.contact.hoursDisplay}
- **Официальный сайт:** ${site.brand.domain}
- **Карточка в Яндекс Бизнесе / Яндекс Картах:** ${site.contact.yandexProfileUrl}?lang=ru
- **Карточка в Google Business Profile / Google Картах:** ${site.contact.googleProfileUrl}

## География работы и шеф-монтажа
- **Чеченская Республика (RU-CE):** Грозный, Гудермес, Аргун, Шали, Урус-Мартан, Курчалой, Ачхой-Мартан, Знаменское, Наурская, Шелковская, горные районы (Ведено, Беной, Кезеной-Ам, Итум-Кали, Ведучи, Шатой).
- **Республики Северного Кавказа (СКФО):**
  - Республика Ингушетия (Магас, Назрань, Карабулак, Малгобек, Сунжа, Джейрахский район)
  - Республика Дагестан (Махачкала, Каспийск, Дербент, Хасавюрт, Кизляр, Буйнакск, Избербаш)
  - Республика Северная Осетия — Алания (Владикавказ, Моздок, Беслан, Алагир, Фиагдон, Цей)
  - Кабардино-Балкарская Республика (Нальчик, Прохладный, Баксан, Приэльбрусье)
  - Ставропольский край (КМВ: Пятигорск, Кисловодск, Ессентуки, Минеральные Воды) и Карачаево-Черкесия (Черкесск, Архыз, Домбай)

## Основные разделы сайта
- [Главная экспозиция CORTEC](${site.brand.domain}/): Обзор технологий и инженерной философии
- [Системы ALUTECH](${site.brand.domain}/alutech): Стоечно-ригельные фасады ALT F50, структурное остекление SG, теплые окна ALT W72 и подъемно-сдвижные порталы ALT SL160
- [Немецкие окна KBE](${site.brand.domain}/kbe): Энергоэффективные окна KBE 76 greenline в темной графитовой ламинации со статической вклейкой стеклопакета
- [Системы KÖMMERLING](${site.brand.domain}/kommerling): 7-камерные системы KÖMMERLING 88, компланарные алюминиевые оклады AluClip Zero, покрытие proCoverTec и порталы PremiDoor 88 Lux
- [Архитектурное стекло AGC](${site.brand.domain}/agc): Мультифункциональное стекло Stopray (Double Silver), просветленное стекло Planibel Clearvision (Low-Iron) и акустический триплекс Stratophone
- [Стеклопакеты и фурнитура](${site.brand.domain}/elements): Теплые дистанционные рамки Chromatech Ultra, скрытая фурнитура до 180 кг и безрозеточные ручки
- [Инженерный журнал](${site.brand.domain}/blog): Публикации и технические разборы по остеклению в Чеченской Республике и СКФО
- [Компания CORTEC](${site.brand.domain}/about): Проектирование КМ/КМД, лазерная геодезия и шеф-монтаж по ГОСТ 30971
- [Контакты в Грозном](${site.brand.domain}/contact): Связь с главным инженером проекта (${site.contact.streetAddress})

## Публикации инженерного журнала CORTEC
${BLOG_POSTS.map((p) => `- [${p.title}](${site.brand.domain}/blog/${p.slug}): ${p.description}`).join('\n')}
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llmsTxt);

// 5D. Generate robots.txt dynamically from SSOT (Yandex Clean-param + Google & AI Crawlers)
const robotsTxt = `User-agent: *
Allow: /
Disallow: /design-system.html
Disallow: /design-system/
Disallow: /privacy.html
Disallow: /privacy/
Disallow: /404.html
Disallow: /404/

User-agent: Yandex
Allow: /
Disallow: /design-system.html
Disallow: /design-system/
Disallow: /privacy.html
Disallow: /privacy/
Disallow: /404.html
Disallow: /404/
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&yclid&gclid&fbclid&_ym_visorc&_ym_debug /

User-agent: Googlebot
Allow: /
Disallow: /design-system.html
Disallow: /design-system/
Disallow: /privacy.html
Disallow: /privacy/
Disallow: /404.html
Disallow: /404/

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${site.brand.domain}/sitemap.xml
`;
fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt);
fs.writeFileSync(path.join(SRC, 'static/robots.txt'), robotsTxt);

if (missingImages.length > 0) {
  console.error('Missing images detected:\n', missingImages.join('\n'));
  process.exit(1);
}

const elapsed = Date.now() - t0;
console.log(`✅ CORTEC Build Complete in ${elapsed}ms`);
console.log(`   • CSS Architecture: Critical Inline (${criticalStyleFiles.length} modules, ${(Buffer.byteLength(criticalCss) / 1024).toFixed(1)} KB) + Deferred style.css (${deferredStyleFiles.length} modules, ${(Buffer.byteLength(combinedCss) / 1024).toFixed(1)} KB, ?v=${cssHash})`);
console.log(`   • Core Pages Built: ${PAGE_SLUGS.length} root pages + ${PAGE_SLUGS.length - 1} clean-URL subpages`);
console.log(`   • SEO Blog Articles Built: ${BLOG_POSTS.length} flat articles (/blog/*.html) + ${BLOG_POSTS.length} clean-URL articles (/blog/*/index.html)`);
console.log(`   • SEO & GEO Feeds Generated: sitemap.xml (${coreSitemapUrls.length + blogSitemapUrls.length} URLs), rss.xml (${BLOG_POSTS.length} items), llms.txt, robots.txt`);
console.log(`   • Asset References Verified: ${verifiedImages} (0 missing, 0 broken paths)`);

const USER_DOCS = '/Users/mansur/Documents/newadam';
try {
  if (fs.existsSync(USER_DOCS) && fs.existsSync(path.join(ROOT, 'AI_CONTEXT.md'))) {
    fs.copyFileSync(path.join(ROOT, 'AI_CONTEXT.md'), path.join(USER_DOCS, 'AI_CONTEXT.md'));
  }
} catch (_) {}
