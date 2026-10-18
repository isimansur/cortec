const { BLOG_CLUSTERS, BLOG_POSTS } = require('../data/blog');
const { buildBlogIndexSchema } = require('../core/schema-builder');

module.exports = {
  slug: 'blog',
  file: 'blog.html',
  title: 'Инженерный журнал — Фасады и панорамные окна в Грозном | CORTEC',
  description: 'Инженерный журнал компании CORTEC: статика фасадов ALUTECH, оконно-дверные системы KBE и KÖMMERLING, архитектурное стекло AGC Stopray и Stratophone в Чеченской Республике и регионах Северного Кавказа.',
  keywords: 'инженерный журнал остекление Грозный, алюминиевые фасады ALUTECH расчет, панорамное остекление Чеченская Республика, проектирование КМ КМД Грозный, окна KBE KÖMMERLING обзор',
  ogTitle: 'Инженерный журнал CORTEC — Статика, теплотехника и архитектура светопрозрачных конструкций',
  ogDescription: 'Инженерные разборы: статика фасадов ALUTECH, темная ламинация KBE, гибрид KÖMMERLING AluClip Zero, оптика AGC Stopray и монтаж по ГОСТ 30971.',
  twitterDescription: 'Инженерный журнал CORTEC о панорамном и фасадном остеклении в Чеченской Республике и на Северном Кавказе.',
  preloadImg: 'blog-engineering-hero',
  schemaJson: buildBlogIndexSchema(BLOG_POSTS),

  renderMain({ prefix = '' } = {}) {
    const filterButtons = BLOG_CLUSTERS.map((c, idx) => `
            <button type="button" class="blog-filter-btn${idx === 0 ? ' is-active' : ''}" data-cluster="${c.id}">
              ${c.label}
            </button>`).join('');

    const cardsHtml = BLOG_POSTS.map((post) => `
          <a href="${prefix}blog/${post.slug}.html" class="blog-card" data-cluster="${post.cluster}" data-search="${(post.title + ' ' + post.h1 + ' ' + post.h1Sub + ' ' + post.keywords + ' ' + post.regionBadge).toLowerCase()}">
            <div class="blog-card-media">
              <img
                src="${prefix}assets/img/${post.heroImg}.avif"
                srcset="${prefix}assets/img/${post.heroImg}-sm.avif 688w, ${prefix}assets/img/${post.heroImg}.avif 1376w"
                sizes="(max-width: 768px) 50vw, 33vw"
                width="1344"
                height="768"
                alt="${post.h1} — ${post.regionBadge}"
                loading="lazy"
                decoding="async"
              >
              <span class="blog-card-region">${post.regionBadge}</span>
            </div>
            <div class="blog-card-body">
              <div class="blog-card-top">
                <span class="blog-card-num">${post.clusterLabel}</span>
              </div>
              <h2 class="blog-card-title">
                ${post.h1} <span class="halftone">${post.h1Sub}</span>
              </h2>
              <p class="blog-card-desc">${post.description}</p>
              <div class="blog-card-footer">
                <span>Время чтения: ${post.readingTime}</span>
                <span class="blog-card-arrow">Читать материал →</span>
              </div>
            </div>
          </a>`).join('\n');

    return `
    <!-- HERO: ENGINEERING JOURNAL -->
    <section class="hero-viewport" aria-label="Инженерный журнал CORTEC">
      <div class="hero-media-wrap">
        <img
          src="${prefix}assets/img/blog-engineering-hero.avif"
          srcset="${prefix}assets/img/blog-engineering-hero-sm.avif 688w, ${prefix}assets/img/blog-engineering-hero.avif 1376w"
          sizes="100vw"
          width="1344"
          height="768"
          alt="Инженерный журнал CORTEC — Архитектурное остекление в Грозном и на Северном Кавказе"
          fetchpriority="high"
          decoding="async"
        >
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Инженерный журнал</span>
          </nav>
          <span class="eyebrow">Инженерная периодика CORTEC · Проектирование КМ/КМД и теплотехника</span>
          <h1>
            Инженерный журнал.<br>
            <span class="halftone">Статика, оптика и узлы примыкания в деталях.</span>
          </h1>
          <p class="lead-paragraph">
            Практические руководства конструкторского отдела CORTEC для владельцев строящихся резиденций, архитекторов и главных инженеров проектов: расчет ветровых, солнечных и сейсмических нагрузок, подбор профильных систем ALUTECH, KBE, KÖMMERLING и стекла AGC.
          </p>
          <div class="btn-group">
            <a href="#blog-catalog" class="btn-sand">Перейти к публикациям</a>
            <a href="${prefix}contact.html" class="btn-oval">Запросить расчет проекта</a>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE FILTER & ARTICLES GRID -->
    <section class="section-space-lg" id="blog-catalog" aria-labelledby="catalog-heading">
      <div class="container">
        <div class="blog-catalog-header reveal">
          <div>
            <span class="eyebrow">Библиотека технических решений · Светопрозрачные конструкции</span>
            <h2 id="catalog-heading">Публикации и инженерные разборы</h2>
          </div>
          <div class="blog-search-wrap">
            <label for="blog-search-input" class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Поиск по материалам</label>
            <input
              type="search"
              id="blog-search-input"
              class="blog-search-input"
              placeholder="Поиск по системам, узлам и городам..."
              autocomplete="off"
            >
          </div>
        </div>

        <div class="blog-filter-rail reveal" role="tablist" aria-label="Фильтр публикаций по направлениям">
          ${filterButtons}
        </div>

        <div class="blog-grid" id="blog-articles-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var btns = document.querySelectorAll('.blog-filter-btn');
        var cards = document.querySelectorAll('#blog-articles-grid .blog-card');
        var searchInput = document.getElementById('blog-search-input');
        var activeCluster = 'all';

        function applyFilters() {
          var q = (searchInput ? searchInput.value : '').trim().toLowerCase();
          cards.forEach(function(card) {
            var c = card.getAttribute('data-cluster');
            var s = card.getAttribute('data-search') || '';
            var matchCluster = (activeCluster === 'all' || c === activeCluster);
            var matchSearch = (!q || s.indexOf(q) !== -1);
            card.style.display = (matchCluster && matchSearch) ? '' : 'none';
          });
        }

        btns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            btns.forEach(function(b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            activeCluster = btn.getAttribute('data-cluster');
            applyFilters();
          });
        });

        if (searchInput) {
          searchInput.addEventListener('input', applyFilters);
        }
      });
    </script>
    `;
  }
};
