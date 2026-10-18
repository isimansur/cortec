# CORTEC (`cortectech.pro`) — Архитектурные светопрозрачные конструкции

Официальный веб-сайт и инженерный журнал компании **CORTEC (`cortec technologies`)** — проектирование КМ/КМД, комплектация и шеф-монтаж светопрозрачных конструкций на базе систем **ALUTECH**, **KBE**, **KÖMMERLING** и архитектурного стекла **AGC** в Грозном, Чеченской Республике (`RU-CE`) и республиках Северного Кавказа (СКФО).

- **Официальный домен:** [https://cortectech.pro](https://cortectech.pro)
- **Адрес проектного офиса и шоурума узлов:** 364037, Чеченская Республика, г. Грозный, ул. Субры Кишиевой, 55
- **Телефон и WhatsApp:** +7 (928) 000-76-66
- **Карточка в Яндекс Бизнесе / Яндекс Картах:** [https://yandex.ru/profile/30993680039](https://yandex.ru/profile/30993680039?lang=ru)
- **Карточка в Google Business Profile:** [https://share.google/5Y5mWzVmDDefmiI7j](https://share.google/5Y5mWzVmDDefmiI7j)

---

## Архитектура проекта (Senior / Principal Architecture v2.0)

Проект построен как **Zero-Dependency Static Site Generator (SSG)** на чистом Node.js со временем полной сборки **~90 мс** и нулевым техническим долгом:

```text
├── src/
│   ├── core/
│   │   └── schema-builder.js   # Централизованная фабрика графов Schema.org (@graph JSON-LD)
│   ├── data/
│   │   ├── site.js             # Единый источник истины (SSOT): домен, контакты, карточки Яндекс/Google, гео
│   │   ├── brands.js           # Спецификации систем ALUTECH, KBE, KÖMMERLING, AGC
│   │   └── blog/               # 30 инженерных SEO/GEO-статей, разделенных на 6 тематических кластеров
│   ├── components/             # Переиспользуемые компоненты (Layout, BlogArticle, BrandShowcase, Picture)
│   ├── pages/                  # 12 модульных шаблонов основных страниц
│   ├── styles/                 # 10 модульных CSS-слоев дизайн-системы (01-tokens .. 10-blog-seo)
│   ├── assets/                 # Локальные AVIF/JPG изображения, SVG-логотипы и клиентский JS
│   └── static/                 # Серверные конфиги (.htaccess, _headers, security.txt, site.webmanifest)
├── dist/                       # Готовый скомпилированный продакшн-билд (плоские .html + clean-URL директории)
├── build.js                    # Сборщик проекта, генератор sitemap.xml, rss.xml, llms.txt, robots.txt
├── test-seo-engines.js         # Автотесты по требованиям Google Search, Яндекс Вебмастера и контракта SSOT
└── test-audit.js               # Полный технический, мета-, скоростной и accessibility-аудит (83 HTML файла)
```

---

## Команды

```bash
# Сборка проекта в папку dist/ (~90 мс)
npm run build

# Полная сборка + прогон всех SEO, архитектурных и технических тестов
npm test
```

## Деплой

* **Cloudflare Pages / Vercel / Netlify:**
  * Команда сборки (Build command): `npm run build`
  * Папка публикации (Build output directory): `dist`
* **Классический хостинг (Apache / LiteSpeed / Nginx):**
  * Загрузите содержимое папки `dist/` в корневую директорию сайта (`public_html`). Все правила кэширования, сжатия Brotli/Gzip, HSTS и канонических редиректов уже настроены в `dist/.htaccess`.
