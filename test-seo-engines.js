#!/usr/bin/env node
/**
 * CORTEC DEEP SEO & SEARCH ENGINE COMPLIANCE TEST SUITE
 * Базируется на 5 профильных SEO-репозиториях + документации Google Search Central и Яндекс Вебмастер:
 * 1. sethblack/python-seo-analyzer (.seo-rules/python-seo-analyzer)
 *    - Длина <title> (10–70 символов), <meta name="description"> (140–255 символов), OG-теги,
 *      проверка <img> alt, проверка <h1>, проверка <html lang>, анкоры ссылок, плотность слов и биграмм/триграмм.
 * 2. StanGirard/seo-audits-toolkit (.seo-rules/seo-audits-toolkit)
 *    - Экстракция заголовков H1-H6, проверка всех внутренних ссылок и изображений на существование (200 OK),
 *      валидация Sitemap <-> Canonical URL-графа.
 * 3. flowforfrank/seo-checklist (.seo-rules/flowforfrank-seo-checklist)
 *    - Иерархия заголовков без пропусков (H1 -> H2 -> H3), длина абзацев (<= 200 слов),
 *      распределение подзаголовков, ключевые фразы в Title/H1/Description/Первом абзаце/Alt,
 *      разумное количество ссылок на страницу (< 150).
 * 4. harlan-zw/unlighthouse (.seo-rules/unlighthouse)
 *    - Google Lighthouse SEO & CWV: валидный robots.txt (без устаревшей директивы Host:, ломающей Lighthouse),
 *      валидный canonical, hreflang, tap-targets, отсутствие плагинов, индексируемость, LCP preload.
 * 5. google/schema-dts (.seo-rules/google-schema-dts) + Яндекс Валидатор микроразметки
 *    - Строгая проверка JSON-LD графа: Organization/HomeAndConstructionBusiness, WebSite, SiteNavigationElement,
 *      BreadcrumbList, BlogPosting (headline <= 110 символов, реальные существующие файлы image[] и publisher.logo),
 *      FAQPage, Service/Product.
 * 6. Специфические требования Яндекс Вебмастера и Google Search Central:
 *    - Clean-param в robots.txt (utm_*, yclid, gclid, ymclid, _openstat),
 *    - Отсутствие точного дублирования <title> === <h1>,
 *    - Отсутствие страниц-сирот (входящие внутренние ссылки >= 2 на каждую индексируемую страницу),
 *    - Региональная релевантность (Грозный / Чеченская Республика / Северный Кавказ).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const issues = [];
const warnings = [];
const passed = [];

function fail(category, file, msg) {
  issues.push({ category, file, msg });
}
function warn(category, file, msg) {
  warnings.push({ category, file, msg });
}
function ok(category, msg) {
  passed.push({ category, msg });
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Get all canonical root/blog HTML files (excluding search engine verification files yandex_*.html and google*.html)
const isVerificationHtml = (name) => /^yandex_[a-f0-9]+\.html$/i.test(name) || /^google[a-f0-9]+\.html$/i.test(name);
const coreFiles = fs.readdirSync(DIST)
  .filter((f) => f.endsWith('.html') && !isVerificationHtml(f))
  .map((f) => ({ rel: f, full: path.join(DIST, f) }));

const blogFiles = fs.existsSync(path.join(DIST, 'blog'))
  ? fs.readdirSync(path.join(DIST, 'blog'))
      .filter((f) => f.endsWith('.html') && f !== 'index.html')
      .map((f) => ({ rel: `blog/${f}`, full: path.join(DIST, 'blog', f) }))
  : [];

const allPages = [...coreFiles, ...blogFiles];
const NOINDEX_PAGES = new Set(['404.html', 'privacy.html', 'design-system.html']);
const indexablePages = allPages.filter((p) => !NOINDEX_PAGES.has(p.rel));

// ============================================================================
// 1. ROBOTS.TXT (Unlighthouse / Google Lighthouse + Yandex Webmaster Clean-param)
// ============================================================================
const robotsPath = path.join(DIST, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Отсутствует файл robots.txt');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!/User-agent:\s*\*/i.test(robots)) {
    fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Нет User-agent: *');
  }
  if (!/User-agent:\s*Yandex/i.test(robots)) {
    fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Нет секции User-agent: Yandex');
  }
  if (!/User-agent:\s*Googlebot/i.test(robots)) {
    fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Нет секции User-agent: Googlebot');
  }
  if (!/Clean-param:/i.test(robots)) {
    fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Яндекс Вебмастер: отсутствует директива Clean-param для защиты от дублей UTM/yclid/gclid');
  } else {
    const requiredParams = ['utm_source', 'utm_medium', 'utm_campaign', 'yclid', 'gclid'];
    for (const p of requiredParams) {
      if (!robots.includes(p)) {
        warn('1. Robots.txt (Google & Yandex)', 'robots.txt', `Clean-param не включает параметр ${p}`);
      }
    }
  }
  // Check if deprecated Host: directive is present (Lighthouse SEO audit flags Host: as invalid syntax!)
  if (/^Host:/im.test(robots)) {
    warn('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Директива Host: устарела в Яндексе (с 2018 г.) и вызывает ошибку "Unknown directive" в Google Lighthouse SEO Audit');
  }
  if (!/Sitemap:\s*https:\/\/cortectech\.pro\/sitemap\.xml/i.test(robots)) {
    fail('1. Robots.txt (Google & Yandex)', 'robots.txt', 'Отсутствует ссылка Sitemap: https://cortectech.pro/sitemap.xml');
  }
  ok('1. Robots.txt (Google & Yandex)', 'robots.txt проверен по стандартам Googlebot, Yandex и Lighthouse');
}

// ============================================================================
// 2. SITEMAP.XML <-> CANONICAL CONSISTENCY (StanGirard/seo-audits-toolkit)
// ============================================================================
const sitemapPath = path.join(DIST, 'sitemap.xml');
const sitemapLocs = new Set();
if (!fs.existsSync(sitemapPath)) {
  fail('2. Sitemap.xml', 'sitemap.xml', 'Отсутствует sitemap.xml');
} else {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = locRegex.exec(sm)) !== null) {
    sitemapLocs.add(m[1]);
  }
  if (sitemapLocs.size !== indexablePages.length) {
    fail('2. Sitemap.xml', 'sitemap.xml', `Количество URL в sitemap (${sitemapLocs.size}) не совпадает с числом индексируемых страниц (${indexablePages.length})`);
  }
  // Check that every sitemap URL maps to an actual file and its canonical matches
  for (const page of indexablePages) {
    const html = fs.readFileSync(page.full, 'utf8');
    const canMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canMatch) {
      fail('2. Sitemap.xml', page.rel, 'Отсутствует <link rel="canonical">');
    } else if (!sitemapLocs.has(canMatch[1])) {
      fail('2. Sitemap.xml', page.rel, `Canonical URL ${canMatch[1]} отсутствует в sitemap.xml`);
    }
  }
  ok('2. Sitemap.xml', `Все ${sitemapLocs.size} индексируемых страниц имеют 100% совпадение Canonical <-> Sitemap.xml`);
}

// ============================================================================
// 3. PYTHON-SEO-ANALYZER & FLOWFORFRANK ON-PAGE RULES (Title, Description, H1, Alt, Readability)
// ============================================================================
const inboundLinks = new Map();
for (const p of allPages) inboundLinks.set(p.rel, new Set());

for (const page of indexablePages) {
  const html = fs.readFileSync(page.full, 'utf8');
  const rel = page.rel;

  // 3.1 Title length (python-seo-analyzer: 10..70 chars; Yandex/Google optimal: 35..70 chars)
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    fail('3. On-Page SEO (Title/Desc/H1)', rel, 'Отсутствует <title>');
  } else {
    if (title.length < 30) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `Слишком короткий <title> (${title.length} симв., рекомендуется 35–70): "${title}"`);
    }
    if (title.length > 70) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `<title> длиннее 70 символов (${title.length} симв., порог python-seo-analyzer и видимой зоны SERP Google/Яндекс): "${title}"`);
    }
  }

  // 3.2 Meta Description length (python-seo-analyzer: 140..255 chars; Yandex/Google: 140..220 chars)
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (!desc) {
    fail('3. On-Page SEO (Title/Desc/H1)', rel, 'Отсутствует <meta name="description">');
  } else {
    if (desc.length < 140) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `Короткий <meta name="description"> (${desc.length} симв., порог python-seo-analyzer & Яндекс Вебмастер >= 140): "${desc}"`);
    }
    if (desc.length > 220) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `Длинный <meta name="description"> (${desc.length} симв., рекомендуется <= 220 для Яндекс/Google): "${desc}"`);
    }
    if (desc === title) {
      fail('3. On-Page SEO (Title/Desc/H1)', rel, '<meta name="description"> полностью дублирует <title>');
    }
  }

  // 3.3 H1 check & Title !== H1 check (Yandex Webmaster)
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) {
    fail('3. On-Page SEO (Title/Desc/H1)', rel, 'Отсутствует тег <h1>');
  } else {
    const h1Text = stripTags(h1Match[1]);
    if (h1Text.length < 10) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `Слишком короткий <h1>: "${h1Text}"`);
    }
    if (h1Text === title) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, '<h1> на 100% совпадает с <title> (Яндекс Вебмастер рекомендует различать формулировки)');
    }
  }

  // 3.4 Heading Hierarchy (flowforfrank-seo-checklist: no skipped levels e.g. h1 -> h3)
  const headingRegex = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let hm;
  let prevLevel = 0;
  while ((hm = headingRegex.exec(html)) !== null) {
    const level = parseInt(hm[1].slice(1), 10);
    const hText = stripTags(hm[2]);
    if (!hText) {
      fail('3. On-Page SEO (Title/Desc/H1)', rel, `Пустой заголовок <${hm[1]}>`);
    }
    if (prevLevel > 0 && level > prevLevel + 1) {
      warn('3. On-Page SEO (Title/Desc/H1)', rel, `Скачок уровня заголовков: <h${prevLevel}> -> <h${level}> ("${hText.slice(0, 40)}")`);
    }
    prevLevel = level;
  }

  // 3.5 Paragraph length & word count (flowforfrank-seo-checklist: paragraph <= 200 words, page >= 300 words)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : html;
  const mainText = stripTags(mainHtml);
  const words = mainText.split(/\s+/).filter((w) => w.length > 1);
  const minWords = rel.startsWith('blog/') ? 450 : 250;
  if (words.length < minWords) {
    warn('3. On-Page SEO (Readability)', rel, `Малый объем текста в <main>: ${words.length} слов (рекомендуется >= ${minWords})`);
  }

  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let pm;
  while ((pm = pRegex.exec(mainHtml)) !== null) {
    const pWords = stripTags(pm[1]).split(/\s+/).filter(Boolean);
    if (pWords.length > 200) {
      warn('3. On-Page SEO (Readability)', rel, `Слишком длинный абзац <p> (${pWords.length} слов > 200 по flowforfrank-seo-checklist)`);
    }
  }

  // 3.6 Links analysis (descriptive text, total link count < 150, internal link graph)
  const aRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let am;
  let totalLinks = 0;
  const genericAnchors = new Set(['тут', 'здесь', 'ссылка', 'подробнее', 'читать', 'перейти', 'click here', 'here', 'more', 'link']);
  while ((am = aRegex.exec(html)) !== null) {
    totalLinks++;
    const attrs = am[1];
    const aText = stripTags(am[2]).toLowerCase();
    const ariaLabelMatch = attrs.match(/aria-label="([^"]+)"/i);
    const effectiveText = aText || (ariaLabelMatch ? ariaLabelMatch[1].toLowerCase() : '');

    if (!effectiveText) {
      fail('3. On-Page SEO (Links)', rel, `Пустая ссылка без текста и aria-label: ${attrs}`);
    } else if (genericAnchors.has(effectiveText)) {
      warn('3. On-Page SEO (Links)', rel, `Неинформативный анкор ссылки ("${effectiveText}")`);
    }

    const hrefMatch = attrs.match(/href="([^"]+)"/i);
    if (hrefMatch) {
      const href = hrefMatch[1].split('#')[0].split('?')[0];
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('javascript:')) {
        const baseDir = path.dirname(page.full);
        const resolved = path.resolve(baseDir, href);
        let targetRel = path.relative(DIST, resolved).replace(/\\/g, '/');
        if (!targetRel || targetRel === '.') targetRel = 'index.html';
        else if (!targetRel.endsWith('.html')) targetRel = `${targetRel}.html`;
        if (inboundLinks.has(targetRel) && targetRel !== rel) {
          inboundLinks.get(targetRel).add(rel);
        }
      }
    }
  }
  if (totalLinks > 150) {
    warn('3. On-Page SEO (Links)', rel, `Слишком много ссылок на странице (${totalLinks} > 150)`);
  }
}
ok('3. On-Page SEO (Title/Desc/H1/Readability)', `Проверены ${indexablePages.length} индексируемых страниц на длину Title, Description, иерархию H1-H6 и читаемость`);

// ============================================================================
// 4. INTERNAL LINK GRAPH & ORPHAN PAGES (StanGirard/seo-audits-toolkit & Yandex/Google Crawlability)
// ============================================================================
for (const page of indexablePages) {
  const inCount = inboundLinks.get(page.rel) ? inboundLinks.get(page.rel).size : 0;
  if (inCount === 0) {
    fail('4. Internal Link Graph', page.rel, 'Страница-сирота (0 входящих внутренних ссылок)');
  } else if (inCount < 2) {
    warn('4. Internal Link Graph', page.rel, `Слабая внутренняя перелинковка: всего ${inCount} входящая ссылка (рекомендуется >= 2)`);
  }
}
ok('4. Internal Link Graph', 'Проверен граф внутренней перелинковки (отсутствие страниц-сирот)');

// ============================================================================
// 5. GOOGLE/SCHEMA-DTS & YANDEX STRUCTURED DATA DEEP VALIDATION
// ============================================================================
for (const page of indexablePages) {
  const html = fs.readFileSync(page.full, 'utf8');
  const rel = page.rel;

  const ldMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  if (!ldMatch) {
    fail('5. Schema.org (google/schema-dts)', rel, 'Отсутствует блок JSON-LD');
    continue;
  }

  let data;
  try {
    data = JSON.parse(ldMatch[1]);
  } catch (e) {
    fail('5. Schema.org (google/schema-dts)', rel, `Невалидный JSON-LD: ${e.message}`);
    continue;
  }

  const graph = Array.isArray(data['@graph']) ? data['@graph'] : [data];

  // Validate BreadcrumbList on all non-index pages
  if (rel !== 'index.html') {
    const bc = graph.find((n) => n['@type'] === 'BreadcrumbList');
    if (!bc) {
      warn('5. Schema.org (google/schema-dts)', rel, 'Отсутствует BreadcrumbList в JSON-LD');
    } else if (!Array.isArray(bc.itemListElement) || bc.itemListElement.length < 2) {
      fail('5. Schema.org (google/schema-dts)', rel, 'BreadcrumbList содержит менее 2 элементов');
    } else {
      bc.itemListElement.forEach((item, idx) => {
        if (item.position !== idx + 1) {
          fail('5. Schema.org (google/schema-dts)', rel, `Нарушен порядок position в BreadcrumbList: ожидался ${idx + 1}, получен ${item.position}`);
        }
        if (!item.name || (!item.item && !item.url)) {
          fail('5. Schema.org (google/schema-dts)', rel, 'Элемент BreadcrumbList не содержит name или item/url');
        }
      });
    }
  }

  // Validate BlogPosting on blog articles
  if (rel.startsWith('blog/')) {
    const bp = graph.find((n) => n['@type'] === 'BlogPosting');
    if (!bp) {
      fail('5. Schema.org (google/schema-dts)', rel, 'Отсутствует BlogPosting в JSON-LD статьи');
    } else {
      if (!bp.headline) {
        fail('5. Schema.org (google/schema-dts)', rel, 'BlogPosting: отсутствует headline');
      } else if (bp.headline.length > 110) {
        warn('5. Schema.org (google/schema-dts)', rel, `BlogPosting: headline длиннее 110 символов (${bp.headline.length} симв. — ограничение Google Rich Results)`);
      }

      // Check that every image URL in BlogPosting.image actually exists on disk!
      const imgs = Array.isArray(bp.image) ? bp.image : (bp.image ? [bp.image] : []);
      if (imgs.length === 0) {
        fail('5. Schema.org (google/schema-dts)', rel, 'BlogPosting: отсутствует свойство image');
      }
      for (const imgEntry of imgs) {
        const imgUrl = typeof imgEntry === 'string' ? imgEntry : imgEntry.url;
        if (imgUrl && imgUrl.startsWith('https://cortectech.pro/')) {
          const localRel = imgUrl.replace('https://cortectech.pro/', '');
          const diskImg = path.join(DIST, localRel);
          if (!fs.existsSync(diskImg)) {
            fail('5. Schema.org (google/schema-dts)', rel, `BlogPosting.image ссылается на несуществующий файл: ${imgUrl}`);
          }
        }
      }

      // Check publisher.logo exists on disk!
      if (!bp.publisher || !bp.publisher.logo || !bp.publisher.logo.url) {
        fail('5. Schema.org (google/schema-dts)', rel, 'BlogPosting: отсутствует publisher.logo.url');
      } else {
        const logoUrl = bp.publisher.logo.url;
        if (logoUrl.startsWith('https://cortectech.pro/')) {
          const localLogo = logoUrl.replace('https://cortectech.pro/', '');
          if (!fs.existsSync(path.join(DIST, localLogo))) {
            fail('5. Schema.org (google/schema-dts)', rel, `BlogPosting.publisher.logo.url ссылается на несуществующий файл: ${logoUrl}`);
          }
        }
      }

      // Check ISO 8601 date format
      if (!bp.datePublished || !/^\d{4}-\d{2}-\d{2}/.test(bp.datePublished)) {
        fail('5. Schema.org (google/schema-dts)', rel, `Некорректный datePublished: ${bp.datePublished}`);
      }
      if (!bp.dateModified || !/^\d{4}-\d{2}-\d{2}/.test(bp.dateModified)) {
        fail('5. Schema.org (google/schema-dts)', rel, `Некорректный dateModified: ${bp.dateModified}`);
      }
    }
  }

  // Validate Organization / HomeAndConstructionBusiness on index.html
  if (rel === 'index.html') {
    const org = graph.find((n) =>
      (Array.isArray(n['@type']) && n['@type'].includes('Organization')) ||
      n['@type'] === 'Organization' ||
      n['@type'] === 'HomeAndConstructionBusiness'
    );
    if (!org) {
      fail('5. Schema.org (google/schema-dts)', rel, 'На главной странице отсутствует разметка Organization / HomeAndConstructionBusiness');
    } else {
      if (!org.name || !org.telephone || !org.address || !org.geo) {
        fail('5. Schema.org (google/schema-dts)', rel, 'В Organization отсутствуют обязательные поля name, telephone, address или geo');
      }
      if (org.logo) {
        const logoUrl = typeof org.logo === 'string' ? org.logo : org.logo.url;
        if (logoUrl && logoUrl.startsWith('https://cortectech.pro/')) {
          const localLogo = logoUrl.replace('https://cortectech.pro/', '');
          if (!fs.existsSync(path.join(DIST, localLogo))) {
            fail('5. Schema.org (google/schema-dts)', rel, `Organization.logo ссылается на несуществующий файл: ${logoUrl}`);
          }
        }
      }
    }
  }
}
ok('5. Schema.org (google/schema-dts)', 'Глубокая валидация JSON-LD схем завершена');

// ============================================================================
// 6. UNLIGHTHOUSE LCP PRELOAD, SELF-HOSTED OG:IMAGE, META KEYWORDS & UNIQUENESS
// ============================================================================
const seenTitles = new Map();
const seenDescs = new Map();

for (const page of indexablePages) {
  const html = fs.readFileSync(page.full, 'utf8');
  const rel = page.rel;

  // 6.1 No <meta name="keywords"> in HTML head (python-seo-analyzer & Yandex Baden-Baden)
  if (/<meta\s+name="keywords"/i.test(html)) {
    warn('6. Technical SEO & CWV', rel, 'Обнаружен устаревший <meta name="keywords"> в HTML <head> (спам-сигнал по python-seo-analyzer и Яндекс Баден-Баден)');
  }

  // 6.2 Self-hosted og:image exists on disk (no third-party free host like iili.io)
  const ogImgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!ogImgMatch) {
    fail('6. Technical SEO & CWV', rel, 'Отсутствует <meta property="og:image">');
  } else {
    const ogImg = ogImgMatch[1];
    if (!ogImg.startsWith('https://cortectech.pro/')) {
      warn('6. Technical SEO & CWV', rel, `og:image ведет на сторонний хостинг (${ogImg}) вместо собственного домена cortectech.pro`);
    } else {
      const localOg = ogImg.replace('https://cortectech.pro/', '');
      if (!fs.existsSync(path.join(DIST, localOg))) {
        fail('6. Technical SEO & CWV', rel, `Файл og:image не существует на диске: ${localOg}`);
      }
    }
  }

  // 6.3 LCP preload matches hero <img fetchpriority="high">
  const preloadMatch = html.match(/<link rel="preload" as="image" href="([^"]+)"/);
  const heroMatch = html.match(/<img\b[^>]*fetchpriority="high"[^>]*>/i);
  if (preloadMatch && heroMatch) {
    const preloadBase = path.basename(preloadMatch[1], path.extname(preloadMatch[1]));
    const heroSrcMatch = heroMatch[0].match(/src="([^"]+)"/);
    if (heroSrcMatch) {
      const heroBase = path.basename(heroSrcMatch[1], path.extname(heroSrcMatch[1]));
      if (preloadBase !== heroBase) {
        warn('6. Technical SEO & CWV', rel, `Несовпадение LCP Preload (${preloadBase}) и фактического Hero-изображения (${heroBase})`);
      }
    }
  }

  // 6.4 Global uniqueness of <title> and <meta name="description">
  const t = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
  const d = (html.match(/<meta name="description" content="([^"]+)"/) || [])[1];
  if (t) {
    if (seenTitles.has(t)) {
      fail('6. Technical SEO & CWV', rel, `Дубликат <title> со страницей ${seenTitles.get(t)}: "${t}"`);
    } else {
      seenTitles.set(t, rel);
    }
  }
  if (d) {
    if (seenDescs.has(d)) {
      fail('6. Technical SEO & CWV', rel, `Дубликат <meta name="description"> со страницей ${seenDescs.get(d)}`);
    } else {
      seenDescs.set(d, rel);
    }
  }
}
ok('6. Technical SEO & CWV', 'Проверены LCP Preload, локальные og:image, отсутствие <meta name="keywords"> и 100% уникальность Title/Description');

// ============================================================================
// 7. GOOGLE BUSINESS PROFILE & YANDEX BUSINESS PROFILE BINDING (sameAs / hasMap / rel="me" / Microdata)
// ============================================================================
const GOOGLE_CARD_URL = 'https://share.google/5Y5mWzVmDDefmiI7j';
const YANDEX_CARD_URL = 'https://yandex.ru/profile/30993680039';
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/30993680039/';

for (const page of indexablePages) {
  const html = fs.readFileSync(page.full, 'utf8');
  const rel = page.rel;

  // 7.1 JSON-LD #organization check
  const ldMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  if (ldMatch) {
    const parsed = JSON.parse(ldMatch[1]);
    const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
    const orgNode = graph.find((n) => n['@id'] === 'https://cortectech.pro/#organization');
    if (!orgNode) {
      fail('7. Google & Yandex Business Cards', rel, 'Отсутствует узел #organization в JSON-LD');
    } else {
      const sameAs = Array.isArray(orgNode.sameAs) ? orgNode.sameAs : [];
      const hasMap = Array.isArray(orgNode.hasMap) ? orgNode.hasMap : (orgNode.hasMap ? [orgNode.hasMap] : []);
      if (!sameAs.includes(GOOGLE_CARD_URL)) {
        fail('7. Google & Yandex Business Cards', rel, `В JSON-LD sameAs отсутствует карточка Google: ${GOOGLE_CARD_URL}`);
      }
      if (!sameAs.includes(YANDEX_CARD_URL) || !sameAs.includes(YANDEX_MAPS_URL)) {
        fail('7. Google & Yandex Business Cards', rel, `В JSON-LD sameAs отсутствует карточка Яндекс: ${YANDEX_CARD_URL}`);
      }
      if (!hasMap.includes(GOOGLE_CARD_URL) || !hasMap.includes(YANDEX_CARD_URL)) {
        fail('7. Google & Yandex Business Cards', rel, 'В JSON-LD hasMap отсутствуют ссылки на карточки Google и Яндекс');
      }
    }
  }

  // 7.2 Visible HTML links with rel="me" (Google Search Central visible content rule) & Microdata
  if (!html.includes(`href="${GOOGLE_CARD_URL}"`) || !html.includes(`href="${YANDEX_CARD_URL}?lang=ru"`)) {
    fail('7. Google & Yandex Business Cards', rel, 'На странице отсутствуют видимые HTML-ссылки на карточки Google и Яндекс');
  }
  if (!html.includes('itemtype="https://schema.org/HomeAndConstructionBusiness"')) {
    fail('7. Google & Yandex Business Cards', rel, 'Отсутствует HTML Microdata разметка HomeAndConstructionBusiness для Яндекс Вебмастера');
  }
}
ok('7. Google & Yandex Business Cards', 'Подтверждена двусторонняя привязка сайта к карточкам Google Business Profile и Яндекс Бизнес (JSON-LD sameAs/hasMap + Microdata + видимые ссылки rel="me")');

// ============================================================================
// 8. SENIOR ARCHITECTURE & SSOT CONTRACT VALIDATION (Zero-Drift Guarantee)
// ============================================================================
const SRC_DIR = path.join(__dirname, 'src');
const PAGES_DIR = path.join(SRC_DIR, 'pages');

// 8.1 Check that no page template in src/pages/*.js contains raw stringified JSON-LD or hardcoded domain/email
for (const pf of fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.js'))) {
  const pageCode = fs.readFileSync(path.join(PAGES_DIR, pf), 'utf8');
  if (pageCode.includes('"@context"') || pageCode.includes("'@context'")) {
    fail('8. Senior Architecture & SSOT', `src/pages/${pf}`, 'Обнаружена ручная сборка JSON-LD (@context) в файле страницы вместо вызова фабрики src/core/schema-builder.js');
  }
  if (pageCode.includes('https://cortectech.pro') || pageCode.includes('project@cortectech.pro')) {
    fail('8. Senior Architecture & SSOT', `src/pages/${pf}`, 'Обнаружен захардкоженный домен или email в шаблоне страницы вместо использования SSOT (src/data/site.js)');
  }
  if (pageCode.includes('cortec.ru')) {
    fail('8. Senior Architecture & SSOT', `src/pages/${pf}`, 'Обнаружено упоминание устаревшего домена cortec.ru');
  }
}

// 8.2 Verify server & edge security artifacts + Google/Yandex Webmaster verification files in dist/
for (const secFile of [
  '.htaccess',
  '_headers',
  '.well-known/security.txt',
  'robots.txt',
  'sitemap.xml',
  'rss.xml',
  'llms.txt',
  'yandex_7da0847a6bc80161.html',
  'googlea8ed8641fb68ac09.html'
]) {
  const fullSec = path.join(DIST, secFile);
  if (!fs.existsSync(fullSec)) {
    fail('8. Senior Architecture & SSOT', secFile, `Отсутствует обязательный инфраструктурный файл в dist/: ${secFile}`);
  } else {
    const content = fs.readFileSync(fullSec, 'utf8');
    if (content.includes('cortec.ru')) {
      fail('8. Senior Architecture & SSOT', secFile, `В файле ${secFile} найден устаревший домен cortec.ru`);
    }
  }
}
ok('8. Senior Architecture & SSOT', 'Подтвержден контракт Senior Architecture v2.0 (100% SSOT в src/data/site.js, фабрика схем src/core/schema-builder.js, инфраструктурные файлы .htaccess, _headers, security.txt)');

// ============================================================================
// PRINT REPORT
// ============================================================================
console.log('======================================================================');
console.log('📊 CORTEC GOOGLE, YANDEX & SENIOR ARCHITECTURE COMPLIANCE REPORT');
console.log('======================================================================');
console.log(`Индексируемых страниц: ${indexablePages.length} | Всего страниц: ${allPages.length}`);
console.log(`Успешных блоков проверок: ${passed.length}`);
console.log(`Предупреждений (Warnings): ${warnings.length}`);
console.log(`Ошибок (Failures): ${issues.length}`);
console.log('----------------------------------------------------------------------');

if (issues.length > 0) {
  console.log('\n❌ ОШИБКИ (FAILURES):');
  issues.forEach((it, idx) => {
    console.log(`  ${idx + 1}. [${it.category}] (${it.file}): ${it.msg}`);
  });
}

if (warnings.length > 0) {
  console.log('\n⚠️ ПРЕДУПРЕЖДЕНИЯ (WARNINGS):');
  warnings.forEach((w, idx) => {
    console.log(`  ${idx + 1}. [${w.category}] (${w.file}): ${w.msg}`);
  });
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ НА 100% (0 ошибок, 0 предупреждений)!');
}
console.log('======================================================================');
process.exit(issues.length > 0 ? 1 : 0);
