# ⚡ CORTEC (`cortectech.pro`) — Senior Architecture Map & SSOT Contract (v2.0)

> **ВАЖНО ДЛЯ ИНЖЕНЕРОВ И ИИ-АГЕНТОВ:** НЕ ЧИТАЙТЕ и НЕ ПРАВЬТЕ скомпилированные HTML-файлы в `dist/` или `cortec-hosting-final/` и НЕ ПРАВЬТЕ склеенный `dist/assets/css/style.css`. Все правки вносятся строго в модульные исходники `src/`, после чего запускается `npm test` (`node build.js && node test-seo-engines.js && node test-audit.js`, сборка + 250+ проверок за ~200 мс).

## 1. Архитектурные принципы (Senior / Principal Architecture v2.0)

1. **Single Source of Truth (SSOT — `src/data/site.js`):**
   - Домен (`https://cortectech.pro`), хост (`cortectech.pro`), телефоны (`+7 (928) 000-76-66` и доп. линии), WhatsApp (`https://wa.me/79280007666`), email (`project@cortectech.pro`), физический адрес (`364037, ЧР, г. Грозный, ул. Субры Кишиевой, 55`), геокоординаты (`43.320780, 45.714519`) и ссылки на карточки **Google Business Profile** (`https://share.google/5Y5mWzVmDDefmiI7j`) и **Яндекс Бизнес** (`https://yandex.ru/profile/30993680039`) хранятся **только** в `src/data/site.js`.
   - Запрещено хардкодить домен, телефоны или сырые JSON-LD строки в шаблонах страниц `src/pages/*.js`.
2. **Centralized Schema.org Graph Factory (`src/core/schema-builder.js`):**
   - Вся микроразметка JSON-LD (`@graph`: `HomeAndConstructionBusiness`, `WebSite`, `SiteNavigationElement`, `Service`, `WebPage`, `ItemList`, `AboutPage`, `ContactPage`, `Blog`, `BlogPosting`, `FAQPage`, `BreadcrumbList`) генерируется программно через чистые фабричные функции `src/core/schema-builder.js`.
3. **Zero-Dependency Deterministic SSG (`build.js`):**
   - Генерирует 12 основных страниц (flat `.html` + clean-URL `/slug/index.html`), 30 инженерных статей блога (`/blog/*.html` + `/blog/*/index.html`), `sitemap.xml` (39 канонических URL), `rss.xml`, `llms.txt` и `robots.txt` из единого `site.js`.
   - Проверяет целостность всех локальных медиа-ресурсов (`.avif`, `.jpg`, `.svg`) на этапе сборки.
4. **Automated Quality Gate (`npm test`):**
   - `test-seo-engines.js`: валидирует соответствие требованиям Google Search Essentials, Яндекс Вебмастера (`Clean-param`, микроданные `itemscope`, привязку к карточкам Яндекс и Google), а также проверяет соблюдение архитектурного контракта SSOT.
   - `test-audit.js`: проверяет техническое SEO, мета-теги, производительность, безопасность и доступность по 5 мировым эталонным репозиториям.

## 2. Где что лежит (Карта точечных правок)

| Задача | Какой файл править (1 файл!) | Пример расхода токенов |
| :--- | :--- | :--- |
| Изменить домен, телефоны, WhatsApp, адрес, почту, карточки Яндекс/Google, меню или OG | `src/data/site.js` | ~300 токенов |
| Изменить структуру JSON-LD графов (`Schema.org`) для любой страницы или статьи | `src/core/schema-builder.js` | ~300 токенов |
| Изменить карточки 4 брендов (`ALUTECH`, `KBE`, `KÖMMERLING`, `AGC`) | `src/data/brands.js` | ~300 токенов |
| Изменить или добавить статью в блог (разбито на 6 кластеров) | `src/data/blog/cluster-*.js` | ~400 токенов |
| Изменить цвета, шрифты, размеры заголовков или отступы | `src/styles/01-tokens.css` | ~350 токенов |
| Изменить шапку или полноэкранное мобильное меню (`100dvh`) | `src/styles/03-header-nav.css` | ~400 токенов |
| Изменить мобильную верстку Apple HIG (`<=1024px`, `<=768px`) | `src/styles/08-responsive.css` | ~450 токенов |
| Изменить верстку блога, таблиц, GEO-капсул и региональной матрицы | `src/styles/10-blog-seo.css` | ~350 токенов |
| Изменить общую разметку `<head>`, `<header>` или `<footer>` | `src/components/Layout.js` | ~400 токенов |
| Изменить шаблон статьи блога | `src/components/BlogArticle.js` | ~300 токенов |
| Изменить контент конкретной страницы | `src/pages/<slug>.js` | ~500 токенов |
| Изменить серверные заголовки и редиректы (Apache / Edge CDN) | `src/static/.htaccess` / `src/static/_headers` | ~200 токенов |

## 3. Команды разработки и аудита

- `npm run build` (`node build.js`) — полная сборка проекта в `dist/` и синхронизация архива `cortec-hosting-final.zip`.
- `npm test` — полный цикл сборки и прогон обоих тестовых движков (`test-seo-engines.js` + `test-audit.js`).
