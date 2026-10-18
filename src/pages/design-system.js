const site = require('../data/site');
const tokens = require('../data/tokens');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'design-system',
  file: 'design-system.html',
  title: 'CORTEC Design System & Brandbook — Архитектура, Токены и Айдентика',
  description: 'Единая дизайн-система CORTEC Technologies: матовая обсидиановая палитра, типографика Unbounded / Onest / JetBrains Mono, библиотека макро-компонентов и макеты физических носителей (фасад и матовые визитки 300 DPI).',
  ogTitle: 'CORTEC Design System & Brandbook — Quiet Architectural Minimalism',
  ogDescription: 'Интерактивный UI-Kit, дизайн-токены, логотип cortec technologies и макеты айдентики.',
  twitterDescription: 'Дизайн-система и модульная архитектура CORTEC Technologies.',
  preloadImg: '',
  schemaJson: '',
  noindex: true,
  renderMain({ prefix = '' } = {}) {
    const colorCards = tokens.colors.map((c) => `
          <div class="ds-swatch-card" onclick="navigator.clipboard && navigator.clipboard.writeText('var(${c.token})'); this.querySelector('.ds-swatch-value').textContent = 'Скопировано: var(${c.token})';" title="Нажмите, чтобы скопировать CSS-переменную">
            <div class="ds-swatch-color" style="background: ${c.hex};"></div>
            <div class="ds-swatch-body">
              <span class="ds-swatch-name">${c.token}</span>
              <span class="ds-swatch-value">${c.hex}</span>
              <p class="ds-swatch-desc">${c.desc}</p>
            </div>
          </div>`).join('\n');

    const typeRows = tokens.typography.map((t) => `
          <div class="ds-type-row">
            <div class="ds-type-meta">
              <strong style="color: var(--ds-text-primary); display: block; margin-bottom: 4px;">${t.role}</strong>
              <span>Font: var(${t.token})</span><br>
              <span>Size: ${t.size}</span><br>
              <span>Weight: ${t.weight}</span>
            </div>
            <div style="font-family: var(${t.token}); font-size: ${t.size.split('·')[0].trim()}; font-weight: 300; line-height: 1.2; color: var(--ds-text-primary);">
              ${t.sample}
            </div>
          </div>`).join('\n');

    return `
    <!-- HERO: DESIGN SYSTEM HEADER -->
    <section class="ds-hero">
      <div class="container">
        <span class="eyebrow">Design System v2.0 · Low-Token Modular Architecture</span>
        <h1>
          Дизайн-система и айдентика CORTEC.<br>
          <span class="halftone">Тихий архитектурный минимализм в коде и в материи.</span>
        </h1>
        <p class="lead-paragraph" style="margin-top: 24px; max-width: 780px;">
          Единый реестр дизайн-токенов, типографических шкал, интерактивных компонентов и физических носителей бренда <strong>cortec technologies</strong>. Любое изменение в <code>src/styles/01-tokens.css</code> или <code>src/data/site.js</code> мгновенно синхронизируется по всем страницам.
        </p>
        <div class="ds-nav-pills">
          <a href="#ds-logo" class="ds-nav-pill">01 · Логотип и знак</a>
          <a href="#ds-colors" class="ds-nav-pill">02 · Цветовые токены</a>
          <a href="#ds-typography" class="ds-nav-pill">03 · Типографика</a>
          <a href="#ds-components" class="ds-nav-pill">04 · Компоненты</a>
          <a href="#ds-carriers" class="ds-nav-pill">05 · Фасад и Визитки 300 DPI</a>
          <a href="#ds-architecture" class="ds-nav-pill">06 · Архитектура проекта</a>
        </div>
      </div>
    </section>

    <!-- 01. LOGO & OPTICAL INVERSION -->
    <section id="ds-logo" class="ds-section">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">01 / Brand Mark & Sub-Descriptor</span>
            <h2>Геометрия логотипа <span class="halftone">cortec technologies</span></h2>
          </div>
          <p style="max-width: 480px; color: var(--ds-text-secondary); font-size: 14px;">
            Основной знак строится на оптической инверсии геометрического гротеска с разрядкой дескриптора <code>technologies</code> ровно по ширине слова <code>cortec</code>.
          </p>
        </div>

        <div class="ds-logo-stage">
          <div class="ds-logo-box is-obsidian">
            <div style="width: 240px; color: #F7F8FA;">
              ${site.logoSvg}
              <div class="ds-logo-sub">technologies</div>
            </div>
            <span style="position: absolute; bottom: 18px; left: 24px; font-family: var(--ds-font-mono); font-size: 11px; color: var(--ds-text-micro);">
              Primary Lockup · Matte Obsidian (#0A0B0D)
            </span>
          </div>

          <div class="ds-logo-box is-graphite">
            <img src="${prefix}assets/img/cortec-logo-inverted.png" width="322" height="80" alt="Логотип CORTEC с оптической инверсией" style="max-width: 240px; height: auto;" fetchpriority="high" decoding="async">
            <div class="ds-logo-sub">technologies</div>
            <span style="position: absolute; bottom: 18px; left: 24px; font-family: var(--ds-font-mono); font-size: 11px; color: var(--ds-text-micro);">
              Optical Inversion Lockup · Anodized Graphite (#141619)
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. COLOR TOKENS -->
    <section id="ds-colors" class="ds-section">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">02 / Color Tokens (src/styles/01-tokens.css)</span>
            <h2>Палитра матового обсидиана <span class="halftone">и анодированной бронзы</span></h2>
          </div>
          <p style="max-width: 460px; color: var(--ds-text-secondary); font-size: 14px;">
            Нажмите на любую карточку токена, чтобы скопировать CSS-переменную <code>var(--ds-*)</code> в буфер обмена.
          </p>
        </div>

        <div class="ds-token-grid">
${colorCards}
        </div>
      </div>
    </section>

    <!-- 03. TYPOGRAPHY -->
    <section id="ds-typography" class="ds-section">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">03 / Fluid Typography Scale</span>
            <h2>Типографическая иерархия <span class="halftone">Unbounded · Onest · JetBrains Mono</span></h2>
          </div>
        </div>

        <div class="ds-type-table">
${typeRows}
        </div>
      </div>
    </section>

    <!-- 04. UI COMPONENTS -->
    <section id="ds-components" class="ds-section">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">04 / Macro-Components Library</span>
            <h2>Интерактивные элементы <span class="halftone">и карточки брендов</span></h2>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; margin-bottom: 56px; padding: 36px; background: var(--ds-bg-surface); border-radius: 18px; border: 1px solid var(--ds-border-subtle);">
          <a href="#ds-components" class="btn-sand">Основное действие (.btn-sand)</a>
          <a href="#ds-components" class="btn-oval">Вторичный контур (.btn-oval)</a>
          <a href="#ds-components" class="header-cta" style="position: static;">Кнопка шапки (.header-cta)</a>
        </div>

        <h3 style="margin-bottom: 24px; font-weight: 300;">Макро-компонент <code>renderBrandShowcase()</code> (4 бренда из <code>src/data/brands.js</code>):</h3>
        ${renderBrandShowcase(prefix)}
      </div>
    </section>

    <!-- 05. PHYSICAL BRAND CARRIERS (FACADE & MATTE BUSINESS CARDS) -->
    <section id="ds-carriers" class="ds-section">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">05 / Physical Brand Carriers & Print Ready 300 DPI</span>
            <h2>Физические носители: <span class="halftone">матовый чёрный фасад и визитки</span></h2>
          </div>
          <p style="max-width: 480px; color: var(--ds-text-secondary); font-size: 14px;">
            Все физические носители выдержаны в едином матовом чёрном цвете (<code>#0A0B0D</code>) с компактным логотипом <code>cortec technologies</code>.
          </p>
        </div>

        <div class="ds-carrier-grid">
          <div class="ds-carrier-card">
            <img src="${prefix}assets/img/brand/cortec-facade-black.jpg" width="1344" height="768" alt="Матовый чёрный фасад шоурума CORTEC technologies" loading="lazy" decoding="async">
            <div class="ds-carrier-info">
              <span class="eyebrow" style="margin-bottom: 0;">Экстерьер шоурума · Total Matte Black</span>
              <h3 style="font-size: 1.25rem; font-weight: 300;">Монолитный чёрный фасад с компактным знаком cortec technologies</h3>
              <p style="font-size: 14px; color: var(--ds-text-secondary);">Полностью чёрные композитные панели, переплёты и верхний балконный пояс с лаконичным логотипом по центру фриза.</p>
              <a href="${prefix}assets/img/brand/cortec-facade-black.jpg" download="cortec-facade-black.jpg" class="text-link" style="font-family: var(--ds-font-mono); font-size: 12px; color: var(--ds-accent-sand); margin-top: 6px;">Скачать визуализацию фасада (JPG) ↓</a>
            </div>
          </div>

          <div class="ds-carrier-card">
            <img src="${prefix}assets/img/brand/cortec-cards-matte-3d.jpg" width="1344" height="768" alt="Матовые чёрные визитки CORTEC Soft-Touch / Plike" loading="lazy" decoding="async">
            <div class="ds-carrier-info">
              <span class="eyebrow" style="margin-bottom: 0;">3D-презентация · Plike / Touch Cover 330 г/м²</span>
              <h3 style="font-size: 1.25rem; font-weight: 300;">Матовые визитки: чистое лицо и минималистичный оборот</h3>
              <p style="font-size: 14px; color: var(--ds-text-secondary);">На обороте — только 4 бренда (ALUTECH · KBE · KÖMMERLING · AGC), сайт cortectech.pro по центру и микро-текст 5 pt внизу.</p>
              <a href="${prefix}assets/img/brand/cortec-cards-matte-3d.jpg" download="cortec-business-cards-matte.jpg" class="text-link" style="font-family: var(--ds-font-mono); font-size: 12px; color: var(--ds-accent-sand); margin-top: 6px;">Скачать 3D-презентацию визиток (JPG) ↓</a>
            </div>
          </div>

          <div class="ds-carrier-card">
            <img src="${prefix}assets/img/brand/cortec-cards-print-300dpi.png" width="2400" height="1520" alt="Плоский печатный макет визитки CORTEC 90x50 мм 300 DPI" loading="lazy" decoding="async">
            <div class="ds-carrier-info">
              <span class="eyebrow" style="margin-bottom: 0;">Print Master · 90×50 мм · 300 DPI</span>
              <h3 style="font-size: 1.25rem; font-weight: 300;">Плоская развёртка визитки для типографии (Лицо + Оборот)</h3>
              <p style="font-size: 14px; color: var(--ds-text-secondary);">Готовый макет в высоком разрешении (2400×1520 px) для шелкографии белой/серебряной краской по чёрному матовому картону.</p>
              <a href="${prefix}assets/img/brand/cortec-cards-print-300dpi.png" download="cortec-business-cards-print-300dpi.png" class="text-link" style="font-family: var(--ds-font-mono); font-size: 12px; color: var(--ds-accent-sand); margin-top: 6px;">Скачать печатный макет 300 DPI (PNG) ↓</a>
            </div>
          </div>

          <div class="ds-carrier-card">
            <img src="${prefix}assets/img/brand/cortec-og-preview.jpg" width="1200" height="630" alt="Open Graph превью CORTEC 1200x630 для Telegram и WhatsApp" loading="lazy" decoding="async">
            <div class="ds-carrier-info">
              <span class="eyebrow" style="margin-bottom: 0;">Digital Social Cover · 1200×630 px</span>
              <h3 style="font-size: 1.25rem; font-weight: 300;">Главное Open Graph превью (WhatsApp / Telegram)</h3>
              <p style="font-size: 14px; color: var(--ds-text-secondary);">Оптимизированная обложка (&lt; 90 КБ) с логотипом cortec technologies поверх архитектурного фасадного узла.</p>
              <a href="${prefix}assets/img/brand/cortec-og-preview.jpg" download="cortec-og-preview-1200x630.jpg" class="text-link" style="font-family: var(--ds-font-mono); font-size: 12px; color: var(--ds-accent-sand); margin-top: 6px;">Скачать OG-превью 1200×630 (JPG) ↓</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 06. LOW-TOKEN ARCHITECTURE GUIDE -->
    <section id="ds-architecture" class="ds-section" style="border-bottom: none;">
      <div class="container">
        <div class="ds-section-head">
          <div>
            <span class="eyebrow">06 / Developer & AI Workflow</span>
            <h2>Как расширять проект <span class="halftone">с расходом в 10 раз меньше токенов</span></h2>
          </div>
        </div>

        <div class="ds-arch-code">
<pre style="margin: 0; font-family: inherit;">
# 1. Изменить телефоны, адрес, почту, меню или OG-превью на всех страницах сразу:
   Правка 1 файла -> src/data/site.js

# 2. Изменить карточки брендов (ALUTECH, KBE, KÖMMERLING, AGC):
   Правка 1 файла -> src/data/brands.js

# 3. Изменить цвета, шрифты или отступы дизайн-системы:
   Правка 1 файла -> src/styles/01-tokens.css

# 4. Вставить адаптивную AVIF-картинку в любую страницу (1 строка вместо 7):
   \${pic('hero-volumetric-node', 'Описание узла', { prefix })}

# 5. Собрать продакшн-папку cortec-hosting-final/ и готовый архив cortec-hosting-final.zip:
   node build.js
</pre>
        </div>
      </div>
    </section>
`;
  }
};
