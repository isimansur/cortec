# ⚡ CORTEC (`cortectech.pro`) — Principal Architecture Map & SSOT Contract (v2.1)

> **ВАЖНО ДЛЯ ИНЖЕНЕРОВ И ИИ-АГЕНТОВ:**
> 1. **НЕ ЧИТАЙТЕ и НЕ ПРАВЬТЕ** скомпилированные файлы в `dist/` или склеенный `dist/assets/css/style.css`.
> 2. Все правки вносятся строго в модульные исходники `src/` в рабочей директории `/Users/mansur/Documents/newadam/cortec-architecture`.
> 3. Полная сборка + 250+ проверок SEO/CWV/CLS + выгрузка на продакшен-сервер выполняются одной командой: `npm run deploy` (или `npm test` для локальной проверки за ~160 мс).

---

## 1. Архитектура CSS и Core Web Vitals (`CLS = 0.000`)

Модульная система стилей (`src/styles/01..10`) разделена в `build.js` на **Critical Inline CSS** (встраивается в `<head><style>` для мгновенного First Paint без сдвига макета на десктопе и мобильных) и **Deferred External CSS** (`assets/css/style.css`, загружается асинхронно без дублирования):

### A. Critical Inline CSS (`<head><style>`, ~43 КБ, 0% дублирования во внешнем CSS):
- **`01-tokens.css`** — Цветовая палитра, переменные отступов, `@font-face` (`Unbounded`, `Onest`, `JetBrains Mono`) и калиброванные метрические фоллбэки (`Unbounded Fallback` `size-adjust: 121%`, `Onest Fallback` `size-adjust: 101.5%`) для нулевого CLS при подгрузке шрифтов.
- **`02-base-typography.css`** — Сброс, базовая типографика `h1..h3`, `.lead-paragraph`, `.body-paragraph`, `.eyebrow`, `.word-mask`.
- **`03-header-nav.css`** — Шапка `.site-header`, навигация `.main-nav`, выпадающее меню `.nav-dropdown`, мобильный тоггл `.mobile-menu-toggle`, а также хлебные крошки `.blog-breadcrumbs` и `.blog-meta-pills` первого экрана.
- **`04-buttons-forms.css`** — Кнопки `.btn-sand`, `.btn-oval`, `.btn-group`, минималистичная форма `#cortec-contact-form` и сетка кнопок выбора типа объекта `.tactile-pills-group` (`2 × 2`).
- **`05-layout-sections.css`** — Контейнеры `.container`, первый экран `.hero-viewport` / `.hero-media-wrap`, непрерывная серия макро-сцен `.macro-scroll-sequence` / `.macro-stage` (Cosine Cross-Dissolve + вертикальная шкала `.macro-datum-spine`), асимметричные секции `.editorial-stagger` и 5-кадровая галерея `.apex-five-strip`.
- **`07-motion.css`** — Оптическое проявление `.reveal` (первый экран `.hero-content .reveal` всегда открыт на кадре 0).
- **`08-responsive.css`** — Единый однопроходный адаптивный слой (`<= 1120px`, `<= 1024px`, `<= 768px` Apple HIG) без дублирующихся медиа-блоков. Открытая мобильная витрина изображений (`clamp(290px, 46svh, 410px)`), полноэкранное меню `100dvh`, тач-зоны `>= 44px`.

### B. Deferred External CSS (`assets/css/style.css`, ~23 КБ, загружается отложенно):
- **`06-components-brands.css`** — Секции ниже первого экрана: карточки 4 брендов `.brand-logos-showcase`, таблицы спецификаций `.spec-table`, подвал `.site-footer`.
- **`09-design-system.css`** — Стили внутренней страницы `/design-system.html`.
- **`10-blog-seo.css`** — Каталог и статьи инженерного журнала (`/blog.html`, `/blog/*.html`), GEO-капсулы `.blog-geo-capsule`, E-E-A-T блок, интерактивная карта СКФО `.skfo-map-canvas` и региональная перелинковка.

---

## 2. Таблица мгновенной навигации (1 задача = 1 файл)

| Задача | Точный файл для правки | Строки / Секция |
| :--- | :--- | :--- |
| Контакты, телефоны, WhatsApp, адрес, ссылки Яндекс/Google, меню | `src/data/site.js` | весь файл (140 строк) |
| Микроразметка Schema.org (`JSON-LD` граф для всех страниц) | `src/core/schema-builder.js` | весь файл |
| Карточки 4 систем (`ALUTECH`, `KBE`, `KÖMMERLING`, `AGC`) | `src/data/brands.js` | весь файл |
| Статьи блога (30 статей по 6 тематическим кластерам) | `src/data/blog/cluster-1..6-*.js` | по кластерам |
| Цвета, шрифты, `@font-face` и размеры типографики | `src/styles/01-tokens.css` | строки 1–145 |
| Шапка, меню и хлебные крошки первого экрана | `src/styles/03-header-nav.css` | строки 1–370 |
| Кнопки `.btn-*`, форма заявки и пиллы `.tactile-pill` | `src/styles/04-buttons-forms.css` | строки 1–245 |
| Десктопный Hero, макро-сцены `.macro-stage`, галерея 5 кадров | `src/styles/05-layout-sections.css` | строки 1–730 |
| Вся адаптивная и мобильная верстка (`<=1024px`, `<=768px`) | `src/styles/08-responsive.css` | Разделы 1–5 (575 строк) |
| Стили блога, GEO-капсул и интерактивной карты СКФО | `src/styles/10-blog-seo.css` | строки 1–940 |
| Интерактивная физика (параллакс, фокус, форма WhatsApp, карта СКФО) | `src/assets/js/main.js` | Разделы 1–10 |
| Общий каркас `<head>`, `<header>`, `<footer>` | `src/components/Layout.js` | весь файл |
| Контент конкретной страницы | `src/pages/<slug>.js` | 1 файл на страницу |

---

## 3. Однокомандный пайплайн сборки, проверки и деплоя

- `npm test` — Собирает сайт (`node build.js`), проверяет Google/Yandex SEO & SSOT (`node test-seo-engines.js`) и прогоняет 20 архитектурных и CWV/CLS проверок (`node test-audit.js`). Падает с кодом `1` при любой ошибке или предупреждении.
- `npm run deploy` — Выполняет `npm test` и при `0 ошибок / 0 предупреждений` мгновенно синхронизирует `dist/` на боевой сервер `cortectech.pro` через `rsync`.
