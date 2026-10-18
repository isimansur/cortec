#!/usr/bin/env node
/**
 * CORTEC COMPREHENSIVE AUDIT SUITE
 * Прогон сайта по правилам 6 профильных репозиториев:
 * 1. thedaviddias/Front-End-Checklist (386 правил HTML, CSS, JS, A11y, SEO, Security, Images)
 * 2. thedaviddias/Front-End-Performance-Checklist (Core Web Vitals, Critical Path, Fonts, Minification)
 * 3. renuo/seo-checklist (Technical & On-Page SEO Go-Live Checklist)
 * 4. marcobiedermann/search-engine-optimization (Meta, Headings, Links, Sitemap, Schema)
 * 5. davidsonfellipe/awesome-wpo (Web Performance Optimization & CWV)
 * 6. h5bp/server-configs-apache (Apache .htaccess Security, Compression, Caching, MIME)
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

function getAllHtmlFiles(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) getAllHtmlFiles(full, list);
    else if (entry.name.endsWith('.html')) list.push(full);
  }
  return list;
}

const htmlFiles = getAllHtmlFiles(DIST);
// Flat canonical pages (excluding subdirectory clean-URL mirrors to test unique titles/descriptions accurately)
const canonicalHtmlFiles = htmlFiles.filter((f) => {
  const rel = path.relative(DIST, f);
  return rel === 'index.html' || !rel.endsWith('/index.html');
});

const issues = [];
const warnings = [];
const passed = [];

function recordIssue(category, rule, detail) {
  issues.push({ category, rule, detail });
}
function recordWarning(category, rule, detail) {
  warnings.push({ category, rule, detail });
}
function recordPass(category, rule) {
  passed.push({ category, rule });
}

// Map of all IDs per file for cross-page anchor verification
const fileIdsMap = new Map();
for (const file of htmlFiles) {
  const rel = path.relative(DIST, file);
  const content = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  const dupIds = [];
  const idRegex = /\bid="([^"]+)"/g;
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    if (ids.has(m[1])) dupIds.push(m[1]);
    ids.add(m[1]);
  }
  if (dupIds.length > 0) {
    recordIssue('HTML / A11y', 'unique-id (Front-End-Checklist)', `${rel}: duplicate IDs found: ${dupIds.join(', ')}`);
  }
  fileIdsMap.set(path.resolve(file), ids);
}
if (!issues.some((i) => i.rule.startsWith('unique-id'))) {
  recordPass('HTML / A11y', 'All IDs are unique across all 83 HTML files');
}

const titlesMap = new Map();
const descMap = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, 'utf8');
  const baseDir = path.dirname(file);
  const isCanonicalFile = canonicalHtmlFiles.includes(file);

  // 1. Doctype & charset & lang
  if (!html.startsWith('<!DOCTYPE html>')) {
    recordIssue('HTML', 'doctype', `${rel}: Missing <!DOCTYPE html> at line 1`);
  }
  if (!/<html[^>]+lang="ru"/.test(html)) {
    recordIssue('HTML / i18n', 'lang-attribute', `${rel}: Missing lang="ru" on <html>`);
  }
  if (!/<head>\s*<meta charset="utf-8">/i.test(html)) {
    recordIssue('HTML', 'charset', `${rel}: <meta charset="utf-8"> is not first element in <head>`);
  }

  // 2. Viewport & pinch-zoom
  const vpMatch = html.match(/<meta name="viewport" content="([^"]+)">/);
  if (!vpMatch) {
    recordIssue('Mobile / CSS', 'viewport', `${rel}: Missing viewport meta`);
  } else if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?\b/i.test(vpMatch[1])) {
    recordIssue('Accessibility', 'viewport-zoom', `${rel}: Viewport disables pinch zoom`);
  }

  // 3. Single <main> & Skip-link check
  const mainCount = (html.match(/<main\b/g) || []).length;
  if (mainCount !== 1) {
    recordIssue('Accessibility', 'landmark-one-main', `${rel}: Found ${mainCount} <main> elements (expected 1)`);
  }
  if (!html.includes('class="skip-link"')) {
    recordWarning('Accessibility', 'keyboard-navigation / skip-link (Front-End-Checklist)', `${rel}: Missing skip-to-main-content link for keyboard users`);
  }

  // 4. Single H1 & Heading Hierarchy (h1 -> h2 -> h3)
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) {
    recordIssue('SEO / A11y', 'single-h1', `${rel}: Found ${h1Count} <h1> elements (expected 1)`);
  }
  const headingMatches = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  for (let i = 1; i < headingMatches.length; i++) {
    if (headingMatches[i] - headingMatches[i - 1] > 1) {
      recordWarning(
        'Accessibility / SEO',
        'heading-hierarchy (Front-End-Checklist)',
        `${rel}: Skipped heading level from <h${headingMatches[i - 1]}> directly to <h${headingMatches[i]}>`
      );
      break;
    }
  }

  // 5. Title & Description uniqueness + length (on canonical pages)
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]+)">/);
  const isNoindex = /<meta name="robots" content="noindex/i.test(html);

  if (!titleMatch || !titleMatch[1].trim()) {
    recordIssue('SEO', 'meta-title', `${rel}: Missing <title>`);
  } else if (isCanonicalFile && !isNoindex) {
    const t = titleMatch[1].trim();
    if (titlesMap.has(t)) {
      recordIssue('SEO', 'title-unique', `${rel}: Duplicate <title> with ${titlesMap.get(t)}`);
    }
    titlesMap.set(t, rel);
  }

  if (!descMatch || !descMatch[1].trim()) {
    recordIssue('SEO', 'meta-description', `${rel}: Missing <meta name="description">`);
  } else if (isCanonicalFile && !isNoindex) {
    const d = descMatch[1].trim();
    if (descMap.has(d)) {
      recordIssue('SEO', 'duplicate-description', `${rel}: Duplicate description with ${descMap.get(d)}`);
    }
    descMap.set(d, rel);
  }

  // 6. Canonical & OG URL match
  const canonMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
  const ogUrlMatch = html.match(/<meta property="og:url" content="([^"]+)">/);
  if (!canonMatch) {
    recordIssue('SEO', 'canonical-url', `${rel}: Missing canonical tag`);
  } else if (!ogUrlMatch || canonMatch[1] !== ogUrlMatch[1]) {
    recordIssue('SEO', 'og-url-match', `${rel}: canonical (${canonMatch[1]}) != og:url (${ogUrlMatch ? ogUrlMatch[1] : 'missing'})`);
  }

  // 7. JSON-LD validation & schema-noindex-conflict
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  if (isNoindex && jsonLdBlocks.length > 0) {
    recordIssue('SEO', 'schema-noindex-conflict', `${rel}: Page is noindex but contains JSON-LD schema`);
  }
  if (!isNoindex && jsonLdBlocks.length === 0) {
    recordIssue('SEO', 'structured-data', `${rel}: Indexable page is missing JSON-LD structured data`);
  }
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      if (!parsed['@context']) {
        recordIssue('SEO', 'json-ld-valid', `${rel}: JSON-LD missing @context`);
      }
    } catch (e) {
      recordIssue('SEO', 'json-ld-valid', `${rel}: Invalid JSON-LD syntax: ${e.message}`);
    }
  }

  // 8. Images check (width, height, alt, lazy loading vs LCP hero)
  const imgTags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  imgTags.forEach((tag, idx) => {
    if (!/\bwidth="/.test(tag) || !/\bheight="/.test(tag)) {
      recordIssue('Images / CLS', 'dimensions (Front-End-Checklist)', `${rel}: <img> #${idx + 1} missing explicit width/height: ${tag.slice(0, 80)}`);
    }
    const altMatch = tag.match(/\balt="([^"]*)"/);
    if (!altMatch || !altMatch[1].trim()) {
      recordIssue('Images / A11y', 'alt-text', `${rel}: <img> #${idx + 1} missing descriptive alt attribute`);
    }
    if (idx === 0 && /loading="lazy"/.test(tag)) {
      recordIssue('Performance / LCP', 'lazy-above-fold', `${rel}: First (hero) image has loading="lazy" which hurts LCP`);
    }
    if (idx > 0 && !/loading="lazy"/.test(tag)) {
      recordWarning('Performance', 'offscreen-lazy', `${rel}: Below-the-fold image #${idx + 1} missing loading="lazy"`);
    }
  });

  // 9. Links check (internal target existence, #anchor existence, target="_blank" security, generic anchor text)
  const linkTags = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  for (const [, attrs, innerHtml] of linkTags) {
    const hrefMatch = attrs.match(/\bhref="([^"]*)"/);
    if (!hrefMatch || !hrefMatch[1].trim()) {
      recordIssue('SEO / HTML', 'invalid-links', `${rel}: <a> with empty or missing href`);
      continue;
    }
    const href = hrefMatch[1];

    if (/target="_blank"/.test(attrs) && !/rel="[^"]*noopener/.test(attrs)) {
      recordIssue('Security', 'new-tab (External Link Security)', `${rel}: target="_blank" missing rel="noopener noreferrer" on ${href}`);
    }
    if (href.startsWith('http://')) {
      recordIssue('Security / SEO', 'https-downgrade / mixed-content', `${rel}: Insecure http:// link: ${href}`);
    }
    if (/rel="[^"]*nofollow/.test(attrs) && !href.startsWith('http')) {
      recordIssue('SEO', 'nofollow-internal', `${rel}: Internal link has rel="nofollow": ${href}`);
    }

    // Internal link & anchor check
    if (!href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
      const [filePart, hashPart] = href.split('#');
      let targetFile = file;
      if (filePart) {
        targetFile = path.resolve(baseDir, filePart);
        if (fs.existsSync(targetFile) && fs.statSync(targetFile).isDirectory()) {
          targetFile = path.join(targetFile, 'index.html');
        }
        if (!fs.existsSync(targetFile)) {
          recordIssue('SEO / Broken Links', 'broken-links', `${rel}: Broken internal link -> ${href}`);
          continue;
        }
      }
      if (hashPart) {
        const targetIds = fileIdsMap.get(targetFile);
        if (!targetIds || !targetIds.has(hashPart)) {
          recordIssue('SEO / Broken Anchors', 'broken-hash-anchor', `${rel}: Broken anchor #${hashPart} in href="${href}"`);
        }
      }
    }
  }
}

// 10. Check Fonts & Critical Rendering Path in CSS (Front-End-Performance-Checklist)
const cssFile = path.join(DIST, 'assets/css/style.css');
const cssContent = fs.readFileSync(cssFile, 'utf8');
if (/@import\s+url\(['"]?https:\/\/fonts\.googleapis\.com/.test(cssContent)) {
  recordWarning(
    'Performance / CWV',
    'critical-request-chains / render-blocking-@import (Front-End-Performance-Checklist)',
    'assets/css/style.css uses @import url("https://fonts.googleapis.com/...") which creates a sequential render-blocking request chain instead of non-blocking <link> in <head>'
  );
}

// 11. Check CSS & JS Minification (Front-End-Performance-Checklist)
const cssLines = cssContent.split('\n').length;
if (cssLines > 50) {
  recordWarning(
    'Performance',
    'css-minification (Front-End-Performance-Checklist)',
    `assets/css/style.css is not minified (${cssLines} lines, ${(Buffer.byteLength(cssContent) / 1024).toFixed(1)} KB)`
  );
}
const jsFile = path.join(DIST, 'assets/js/main.js');
const jsContent = fs.readFileSync(jsFile, 'utf8');
if (/^\s*\/\//m.test(jsContent) || /\n\s*\n/.test(jsContent)) {
  recordWarning(
    'Performance',
    'javascript-minification (Front-End-Performance-Checklist)',
    `assets/js/main.js contains unstripped comments or blank lines (${(Buffer.byteLength(jsContent) / 1024).toFixed(1)} KB)`
  );
}

// 12. Check Sitemap & Robots consistency (Front-End-Checklist SEO rules)
const sitemapContent = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const sitemapLocs = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of sitemapLocs) {
  if (loc.includes('404') || loc.includes('privacy') || loc.includes('design-system')) {
    recordIssue('SEO', 'noindex-in-sitemap', `sitemap.xml contains noindex page: ${loc}`);
  }
}

// 13. Check .htaccess against h5bp/server-configs-apache & Front-End-Checklist Security
const htaccess = fs.readFileSync(path.join(DIST, '.htaccess'), 'utf8');
if (!/X-Frame-Options/i.test(htaccess)) {
  recordWarning('Security (.htaccess)', 'x-frame-options (Front-End-Checklist / h5bp)', '.htaccess missing X-Frame-Options header');
}
if (!/Referrer-Policy/i.test(htaccess)) {
  recordWarning('Security (.htaccess)', 'referrer-policy (Front-End-Checklist / h5bp)', '.htaccess missing Referrer-Policy header');
}
if (!/Permissions-Policy/i.test(htaccess)) {
  recordWarning('Security (.htaccess)', 'permissions-policy (Front-End-Checklist / h5bp)', '.htaccess missing Permissions-Policy header');
}
if (!/MultiViews/i.test(htaccess)) {
  recordWarning('Server Config (.htaccess)', 'Options -MultiViews (h5bp/server-configs-apache)', '.htaccess missing Options -MultiViews to prevent Apache content-negotiation conflicts with clean URLs');
}

console.log('================================================================');
console.log(`CORTEC AUDIT RESULTS (${htmlFiles.length} HTML files tested)`);
console.log('================================================================');
console.log(`❌ CRITICAL / HIGH ISSUES: ${issues.length}`);
for (const i of issues) {
  console.log(`   [${i.category}] ${i.rule}: ${i.detail}`);
}
console.log(`\n⚠️  OPTIMIZATION WARNINGS: ${warnings.length}`);
const uniqueWarnings = new Map();
for (const w of warnings) {
  const key = `[${w.category}] ${w.rule}`;
  if (!uniqueWarnings.has(key)) uniqueWarnings.set(key, []);
  uniqueWarnings.get(key).push(w.detail);
}
for (const [key, list] of uniqueWarnings.entries()) {
  console.log(`   ${key} (${list.length} occurrence${list.length > 1 ? 's' : ''}):`);
  console.log(`      e.g. ${list[0]}`);
}
console.log('================================================================');
