const site = require('../data/site');
const { getRelatedPosts, BLOG_POSTS } = require('../data/blog');
const { buildArticleSchema } = require('../core/schema-builder');

/**
 * Рендерер инженерной статьи блога CORTEC по стандартам:
 * - AgriciDaniel/claude-seo (GEO-капсула ответа в первых 60 словах, таблицы спецификаций, E-E-A-T авторский блок, JSON-LD BlogPosting + BreadcrumbList)
 * - coreyhaines31/marketingskills (Hub-and-Spoke двунаправленная перелинковка на Pillar-страницу и соседние статьи кластера)
 * - Apple HIG (44pt зоны касания, адаптивный горизонтальный скролл таблиц, типографика >= 11.5px)
 */

function renderBlogArticle(post, { prefix = '../' } = {}) {
  const relatedPosts = getRelatedPosts(post);
  const prevPost = BLOG_POSTS[(post.index - 2 + BLOG_POSTS.length) % BLOG_POSTS.length];
  const nextPost = BLOG_POSTS[post.index % BLOG_POSTS.length];

  const tocLinks = [
    `<a href="#geo-answer">Техническое резюме</a>`,
    ...(post.specTable ? [`<a href="#spec-table">Техническая таблица</a>`] : []),
    ...post.sections.map((s) => `<a href="#${s.id}">${s.eyebrow.split('·')[1] ? s.eyebrow.split('·')[1].trim() : s.title}</a>`),
    ...(post.faq && post.faq.length ? [`<a href="#article-faq">Вопросы инженеру</a>`] : []),
    `<a href="#related-articles">Материалы по теме</a>`
  ].join('\n            ');

  const specTableHtml = post.specTable ? `
      <div class="blog-spec-wrap reveal" id="spec-table">
        <div class="blog-spec-header">
          <span class="eyebrow">Нормативная спецификация · СП 20.13330 &amp; ГОСТ 30971</span>
          <h2 class="blog-spec-title">${post.specTable.caption}</h2>
        </div>
        <div class="blog-table-scroll" role="region" aria-label="${post.specTable.caption}" tabindex="0">
          <table class="blog-spec-table">
            <thead>
              <tr>
                ${post.specTable.headers.map((h) => `<th scope="col">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${post.specTable.rows.map((row) => `
              <tr>
                ${row.map((cell, i) => i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>` : '';

  const sectionsHtml = post.sections.map((sec) => {
    const paragraphsHtml = (sec.paragraphs || []).map((p) => `<p class="body-paragraph">${p}</p>`).join('\n            ');
    const bulletsHtml = sec.bullets && sec.bullets.length ? `
            <ul class="blog-check-list">
              ${sec.bullets.map((b) => `<li>${b}</li>`).join('\n              ')}
            </ul>` : '';

    return `
        <article class="stagger-row reveal" id="${sec.id}">
          <div class="stagger-left">
            <span class="eyebrow">${sec.eyebrow}</span>
            <h2 class="stagger-item-title">${sec.title}</h2>
          </div>
          <div class="stagger-right">
            ${paragraphsHtml}
            ${bulletsHtml}
          </div>
        </article>`;
  }).join('\n');

  const faqHtml = post.faq && post.faq.length ? `
      <div class="blog-faq-section reveal" id="article-faq">
        <div class="blog-faq-head">
          <span class="eyebrow">Инженерный практикум · Ответы конструктора КМ/КМД</span>
          <h2>Частые вопросы по теме</h2>
        </div>
        <div class="blog-faq-grid">
          ${post.faq.map((item) => `
          <div class="blog-faq-card">
            <h3>${item.q}</h3>
            <p>${item.a}</p>
          </div>`).join('')}
        </div>
      </div>` : '';

  const relatedHtml = relatedPosts.map((rel) => `
          <a href="${prefix}blog/${rel.slug}.html" class="blog-card">
            <div class="blog-card-top">
              <span class="blog-card-num">${rel.clusterLabel}</span>
              <span class="blog-card-region">${rel.regionBadge}</span>
            </div>
            <h3 class="blog-card-title">${rel.h1} <span class="halftone">${rel.h1Sub}</span></h3>
            <p class="blog-card-desc">${rel.description}</p>
            <div class="blog-card-footer">
              <span>Время чтения: ${rel.readingTime}</span>
              <span class="blog-card-arrow">Читать материал →</span>
            </div>
          </a>`).join('\n');

  return `
    <!-- ARTICLE HERO -->
    <section class="hero-viewport" aria-label="${post.h1}">
      <div class="hero-media-wrap">
        <img
          src="${prefix}assets/img/${post.heroImg}.avif"
          srcset="${prefix}assets/img/${post.heroImg}-sm.avif 688w, ${prefix}assets/img/${post.heroImg}.avif 1376w"
          sizes="100vw"
          width="1344"
          height="768"
          alt="${post.heroAlt}"
          fetchpriority="high"
          decoding="async"
        >
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <a href="${prefix}blog.html">Инженерный журнал</a>
            <span aria-hidden="true">/</span>
            <span>${post.h1.replace(/\.$/, '')}</span>
          </nav>
          <div class="blog-meta-pills">
            <span class="blog-pill blog-pill--gold">${post.regionBadge}</span>
            <span class="blog-pill">${post.clusterLabel}</span>
            <span class="blog-pill">Время чтения: ${post.readingTime}</span>
          </div>
          <h1>
            ${post.h1}<br>
            <span class="halftone">${post.h1Sub}</span>
          </h1>
          <p class="lead-paragraph">
            ${post.description} Профильная система раздела: <a href="${prefix}${post.pillarLink.href}" class="text-link">${post.pillarLink.label}</a>.
          </p>
          <div class="btn-group">
            <a href="${prefix}contact.html" class="btn-sand">Запросить расчет узла КМ/КМД</a>
            <a href="${prefix}${post.pillarLink.href}" class="btn-oval">${post.pillarLink.label}</a>
          </div>
          <nav class="quiet-anchor-rail" aria-label="Содержание материала">
            ${tocLinks}
          </nav>
        </div>
      </div>
    </section>

    <!-- MAIN ARTICLE BODY -->
    <section class="section-space-lg">
      <div class="container editorial-stagger">

        <!-- TECHNICAL SUMMARY CAPSULE -->
        <div class="blog-geo-capsule reveal" id="geo-answer">
          <div class="blog-geo-capsule-head">
            <span class="eyebrow">Техническое резюме · Инженерный регламент CORTEC</span>
            <span class="blog-geo-verified">Конструкторский отдел КМ/КМД (г. Грозный)</span>
          </div>
          <p class="blog-geo-text">
            ${post.geoSummary}
          </p>
        </div>

        ${specTableHtml}

        ${sectionsHtml}

        <!-- ENGINEERING BUREAU CARD -->
        <aside class="blog-eeat-card reveal" aria-label="Инженерный департамент CORTEC">
          <div class="blog-eeat-left">
            <span class="eyebrow">Инженерная практика CORTEC</span>
            <h3>Проектный департамент КМ и КМД</h3>
            <p>
              Материал подготовлен инженерами-конструкторами светопрозрачных конструкций CORTEC на основе действующих нормативов СП 20.13330 «Нагрузки и воздействия», СП 14.13330 «Строительство в сейсмических районах», ГОСТ 30971 и системных каталогов <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>, <a href="${prefix}kbe.html" class="text-link">KBE</a>, <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a> и <a href="${prefix}agc.html" class="text-link">AGC Glass</a>.
            </p>
          </div>
          <div class="blog-eeat-right">
            <span class="eyebrow">Проектный офис и шоурум узлов</span>
            <p class="blog-eeat-address">${site.contact.fullAddress}</p>
            <p class="blog-eeat-regions">Выездная геодезия и шеф-монтаж: Чеченская Республика, Ингушетия, Дагестан, РСО-Алания, КБР, КМВ.</p>
            <div class="btn-group" style="margin-top: 16px;">
              <a href="${site.contact.phonePrimary.href}" class="btn-sand">${site.contact.phonePrimary.display}</a>
              <a href="${prefix}contact.html" class="btn-oval">Назначить встречу в офисе</a>
            </div>
          </div>
        </aside>

        ${faqHtml}

        <!-- PREV / NEXT ARTICLE NAVIGATION -->
        <nav class="blog-prev-next reveal" aria-label="Навигация по публикациям">
          <a href="${prefix}blog/${prevPost.slug}.html" class="blog-pn-link">
            <span class="eyebrow">← Предыдущий материал</span>
            <strong>${prevPost.h1}</strong>
          </a>
          <a href="${prefix}blog.html" class="blog-pn-all">Все публикации журнала</a>
          <a href="${prefix}blog/${nextPost.slug}.html" class="blog-pn-link blog-pn-link--right">
            <span class="eyebrow">Следующий материал →</span>
            <strong>${nextPost.h1}</strong>
          </a>
        </nav>

        <!-- RELATED ARTICLES -->
        <div class="blog-related-block reveal" id="related-articles">
          <div class="blog-faq-head">
            <span class="eyebrow">Смежные дисциплины · Инженерная библиотека</span>
            <h2>Материалы по теме</h2>
          </div>
          <div class="blog-grid">
            ${relatedHtml}
          </div>
        </div>

      </div>
    </section>
  `;
}

module.exports = {
  buildArticleSchema,
  renderBlogArticle
};
