const site = require('../data/site');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');
const { buildContactPageSchema } = require('../core/schema-builder');

module.exports = {
  slug: 'contact',
  file: 'contact.html',
  title: "Контакты CORTEC в Грозном — Офис и расчет проектов остекления",
  description: `Инженерный офис и экспозиция узлов CORTEC: г. ${site.contact.city}, ${site.contact.streetAddress}. Телефон и WhatsApp: ${site.contact.phonePrimary.display}. Проектирование КМ/КМД и расчет систем ALUTECH, KBE, KÖMMERLING и стекла AGC.`,
  ogTitle: `Контакты в Грозном — Офис и проектный отдел CORTEC (${site.contact.streetAddress})`,
  ogDescription: "Обсудите архитектурный проект, подбор профильных систем ALUTECH, KBE и KÖMMERLING, формулу стеклопакетов AGC и узлы примыкания в офисе CORTEC в Грозном.",
  twitterDescription: `Прямая связь с инженером-конструктором CORTEC (телефон и WhatsApp): ${site.contact.phonePrimary.display}.`,
  preloadImg: 'minimalist-window-handle',
  schemaJson: buildContactPageSchema(),
  renderMain({ prefix = '' } = {}) {
    const secondaryPhonesHtml = site.contact.phonesSecondary
      .map((p) => `<a href="${p.href}" class="text-link">${p.display}</a>`)
      .join('\n                  ');

    return `
    <!-- SCREEN 1: HERO FOR CONTACT -->
    <section class="hero-viewport" aria-label="Контакты проектного отдела CORTEC в Грозном">
      <div class="hero-media-wrap">
        <img src="assets/img/minimalist-window-handle.avif" srcset="assets/img/minimalist-window-handle-sm.avif 688w, assets/img/minimalist-window-handle.avif 1376w" sizes="100vw" width="1344" height="768" alt="Тактильная минималистичная ручка на фоне темного архитектурного профиля CORTEC" title="Офис и проектный отдел CORTEC в Грозном" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Контакты в Грозном</span>
          </nav>
          <span class="eyebrow">Проектный отдел CORTEC · Грозный</span>
          <h1>
            Контакты в Грозном.<br>
            <span class="halftone">Инженерный диалог без лишних посредников.</span>
          </h1>
          <p class="lead-paragraph">
            Вашу заявку рассматривает непосредственно инженер-конструктор. Приглашаем архитекторов, прорабов и заказчиков в наш офис в Грозном для подбора профильных систем <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>, <a href="${prefix}kbe.html" class="text-link">KBE</a> и <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a>, расчета статики и согласования формулы <a href="${prefix}agc.html" class="text-link">архитектурного стекла AGC</a>.
          </p>
          <nav class="quiet-anchor-rail" aria-label="Быстрый переход к контактам">
            <a href="#contact-bureau-heading">Адрес и телефоны в Грозном</a>
            <a href="#skfo-service-map">Карта обслуживания ЧР и СКФО</a>
            <a href="${site.contact.whatsappDirectUrl}" target="_blank" rel="me noopener noreferrer">WhatsApp: ${site.contact.phonePrimary.display}</a>
            <a href="${site.contact.yandexProfileUrl}?lang=ru" target="_blank" rel="me noopener noreferrer">Яндекс Карты ↗</a>
            <a href="${site.contact.googleProfileUrl}" target="_blank" rel="me noopener noreferrer">Google Карты ↗</a>
            <a href="#cortec-contact-form">Заявка на инженерный расчет</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- BLOCK 1: CONTACT DETAILS & QUIET FORM -->
    <section class="section-space" aria-labelledby="contact-bureau-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Офис и экспозиция узлов</span>
            <h2 id="contact-bureau-heading" style="margin-bottom: 36px;">
              ${site.contact.city},<br>
              <span class="halftone">${site.contact.streetAddress}</span>
            </h2>
            <p class="lead-paragraph" style="margin-bottom: 44px;">
              В нашем пространстве представлены полноразмерные угловые образцы стоечно-ригельных и оконно-дверных систем ALUTECH, темные ламинированные профили KBE 76, гибридные узлы KÖMMERLING 88 AluClip Zero, образцы мультифункционального стекла AGC Stopray и скрытой фурнитуры.
            </p>
            <address style="display: flex; flex-direction: column; gap: 28px;">
              <div>
                <span class="eyebrow" style="margin-bottom: 6px;">Адрес офиса и шоурума</span>
                <p class="h3-editorial">${site.contact.postalCode}, ${site.contact.region}, г. ${site.contact.city}, ${site.contact.streetAddress}</p>
              </div>
              <div>
                <span class="eyebrow" style="margin-bottom: 6px;">Основной телефон и WhatsApp</span>
                <a href="${site.contact.phonePrimary.href}" class="h3-editorial">${site.contact.phonePrimary.display}</a>
              </div>
              <div>
                <span class="eyebrow" style="margin-bottom: 6px;">Дополнительные линии проектного отдела</span>
                <p class="body-paragraph" style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 4px;">
                  ${secondaryPhonesHtml}
                </p>
              </div>
              <div>
                <span class="eyebrow" style="margin-bottom: 6px;">Почта для чертежей и спецификаций (DWG / PDF)</span>
                <a href="mailto:${site.contact.email}" class="h3-editorial">${site.contact.email}</a>
              </div>
              <div>
                <span class="eyebrow" style="margin-bottom: 6px;">График работы офиса</span>
                <p class="body-paragraph">Понедельник — Пятница, с 10:00 до 19:00.</p>
              </div>
            </address>
            <div class="btn-group">
              <a href="${site.contact.whatsappDirectUrl}" target="_blank" rel="me noopener noreferrer" class="btn-sand">Написать в WhatsApp</a>
              <a href="${site.contact.yandexProfileUrl}?lang=ru" target="_blank" rel="me noopener noreferrer" class="btn-oval">Открыть в Яндекс Картах</a>
              <a href="${site.contact.googleProfileUrl}" target="_blank" rel="me noopener noreferrer" class="btn-oval">Открыть в Google Картах</a>
            </div>
          </div>

          <div class="stagger-right">
            <span class="eyebrow">Запрос на расчет и консультацию</span>
            <h3 style="margin-bottom: 36px;">
              Опишите задачу вашего объекта.<br>
              <span class="halftone">Мы подготовим техническое предложение.</span>
            </h3>

            <form id="cortec-contact-form" class="quiet-form" aria-label="Форма связи с инженером CORTEC" data-domain="${site.brand.host}" data-whatsapp="${site.contact.whatsappPhone}">
              <div class="form-field">
                <label for="name">Ваше имя</label>
                <input type="text" id="name" name="name" autocomplete="name" required placeholder="Ваше имя">
              </div>

              <div class="form-field">
                <label for="contact-info">Телефон или электронная почта</label>
                <input type="text" id="contact-info" name="contact" autocomplete="tel" required placeholder="+7 (928) ___-__-__ или email">
              </div>

              <div class="form-field">
                <label for="system-interest">Направление остекления</label>
                <select id="system-interest" name="system">
                  <option value="Архитектурный алюминий ALUTECH (фасады ALT F50, окна W72, порталы SL160)">Архитектурный алюминий ALUTECH (фасады, окна, порталы)</option>
                  <option value="Немецкие профильные системы KBE 76 greenline">Немецкие профильные системы KBE 76 (энергоэффективные окна и двери)</option>
                  <option value="Премиальные системы KÖMMERLING 88 / AluClip Zero / PremiDoor 88">Системы KÖMMERLING 88 / AluClip Zero / порталы PremiDoor 88</option>
                  <option value="Архитектурное стекло AGC (Stopray, Clearvision, Stratophone)">Архитектурное стекло AGC (Stopray, Clearvision, Stratophone)</option>
                  <option value="Комплексное остекление объекта (комбинация систем)">Комплексное остекление объекта (ALUTECH + KBE / KÖMMERLING + AGC)</option>
                  <option value="Инженерная консультация в офисе в Грозном">Инженерная консультация в офисе в Грозном</option>
                </select>
              </div>

              <div class="form-field">
                <label for="message">Кратко о проекте или задаче</label>
                <textarea id="message" name="message" placeholder="Укажите тип объекта (частная резиденция, коммерческий фасад), населенный пункт и ориентировочные габариты проемов"></textarea>
              </div>

              <div>
                <button type="submit" class="btn-sand">Отправить инженеру в WhatsApp</button>
              </div>
              <p class="caption-note" style="margin-top: 8px;">
                Отправляя заявку, вы соглашаетесь с <a href="${prefix}privacy.html" class="text-link">Политикой обработки персональных данных</a>.
              </p>
              <p id="form-feedback" class="form-feedback" aria-live="polite"></p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOCK 2: STYLIZED SKFO SERVICE AREAS MAP & REGIONAL MATRIX -->
    <section class="section-space" id="skfo-service-map" aria-labelledby="skfo-map-heading">
      <div class="container">
        <div class="skfo-map-header reveal">
          <div>
            <span class="eyebrow">География проектирования КМ/КМД, геодезии и шеф-монтажа</span>
            <h2 id="skfo-map-heading">
              Карта районов обслуживания.<br>
              <span class="halftone">Чеченская Республика и республики Северного Кавказа (СКФО).</span>
            </h2>
          </div>
          <p class="body-paragraph skfo-map-intro">
            Центральное конструкторское бюро, шоурум узлов и инженерный склад расположены в <strong>г. Грозный (${site.contact.streetAddress})</strong>. Выездные бригады геодезистов и шеф-инженеров CORTEC выполняют лазерную 3D-тахеометрию проемов, доставку спецтранспортом (пирамидами) и монтаж по ГОСТ 30971 во всех районах Чеченской Республики и субъектах СКФО.
          </p>
        </div>

        <div class="skfo-map-canvas reveal" role="region" aria-label="Стилизованная инженерная карта районов обслуживания CORTEC в СКФО">
          <img
            src="${prefix}assets/img/skfo-topographic-map-bg.avif"
            srcset="${prefix}assets/img/skfo-topographic-map-bg-sm.avif 688w, ${prefix}assets/img/skfo-topographic-map-bg.avif 1376w"
            sizes="(max-width: 768px) 100vw, 90vw"
            width="1344"
            height="768"
            alt="Рельефная топографическая основа Северного Кавказа — география проектирования и монтажа CORTEC"
            loading="lazy"
            decoding="async"
            class="skfo-map-bg-img"
          >
          <div class="skfo-map-overlay">
            <div class="skfo-map-top-bar">
              <span class="skfo-coord-badge">HQ CAD/CAM HUB · 43.3208° N, 45.7145° E · ГРОЗНЫЙ</span>
              <div class="skfo-legend">
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--hq"></i>Штаб-квартира и шоурум (Грозный)</span>
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--p1"></i>Приоритет №1: районы ЧР</span>
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--p2"></i>Приоритет №2: города СКФО</span>
              </div>
            </div>

            <svg class="skfo-vector-svg" viewBox="0 0 1200 620" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Схема инженерной логистики CORTEC из Грозного по городам Чеченской Республики и Северного Кавказа">
              <defs>
                <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#C8A98E" stop-opacity="0.52" />
                  <stop offset="55%" stop-color="#C8A98E" stop-opacity="0.14" />
                  <stop offset="100%" stop-color="#C8A98E" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="vectorLineGold" x1="650" y1="310" x2="180" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#C8A98E" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#C8A98E" stop-opacity="0.22" />
                </linearGradient>
                <linearGradient id="vectorLineEast" x1="650" y1="310" x2="1040" y2="510" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#C8A98E" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#C8A98E" stop-opacity="0.25" />
                </linearGradient>
              </defs>

              <!-- Cartographic Grid & Radar Rings centered on Grozny (650, 310) -->
              <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
                <line x1="0" y1="120" x2="1200" y2="120" />
                <line x1="0" y1="240" x2="1200" y2="240" />
                <line x1="0" y1="310" x2="1200" y2="310" stroke="rgba(200,169,142,0.14)" stroke-dasharray="4 6" />
                <line x1="0" y1="440" x2="1200" y2="440" />
                <line x1="220" y1="0" x2="220" y2="620" />
                <line x1="440" y1="0" x2="440" y2="620" />
                <line x1="650" y1="0" x2="650" y2="620" stroke="rgba(200,169,142,0.14)" stroke-dasharray="4 6" />
                <line x1="880" y1="0" x2="880" y2="620" />
              </g>

              <!-- Service Radius Rings from Grozny Hub -->
              <circle cx="650" cy="310" r="95" stroke="rgba(200,169,142,0.34)" stroke-width="1.2" stroke-dasharray="3 5" />
              <circle cx="650" cy="310" r="215" stroke="rgba(200,169,142,0.18)" stroke-width="1" stroke-dasharray="6 8" />
              <circle cx="650" cy="310" r="380" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="8 10" />
              <circle cx="650" cy="310" r="145" fill="url(#hqGlow)" />

              <!-- Highlighted Polygon Contour of Chechen Republic (Priority #1 Core Zone) -->
              <path
                d="M555 245 L625 205 L735 215 L775 275 L765 365 L705 425 L615 430 L565 375 Z"
                fill="rgba(200,169,142,0.09)"
                stroke="rgba(200,169,142,0.52)"
                stroke-width="1.5"
              />

              <!-- Priority #2 Logistics Vectors (from Grozny 650,310 to SKFO cities) -->
              <g stroke="url(#vectorLineGold)" stroke-width="1.4" stroke-dasharray="5 5">
                <!-- Grozny -> Magas / Nazran -->
                <path d="M650 310 Q590 322 530 336" />
                <!-- Grozny -> Vladikavkaz -->
                <path d="M650 310 Q565 348 485 378" />
                <!-- Grozny -> Nalchik / Elbrus -->
                <path d="M650 310 Q500 325 365 335" />
                <path d="M365 335 Q305 375 255 410" />
                <!-- Grozny -> Pyatigorsk / Kislovodsk (KMV) -->
                <path d="M650 310 Q460 230 285 210" />
                <path d="M285 210 L215 245" />
                <!-- Grozny -> Cherkessk / Arkhyz -->
                <path d="M285 210 Q200 235 135 265" />
              </g>

              <g stroke="url(#vectorLineEast)" stroke-width="1.4" stroke-dasharray="5 5">
                <!-- Grozny -> Khasavyurt -->
                <path d="M650 310 L795 305" />
                <!-- Grozny -> Kizlyar -->
                <path d="M650 310 Q745 235 825 190" />
                <!-- Grozny -> Makhachkala & Kaspiysk -->
                <path d="M650 310 Q805 335 925 355" />
                <path d="M925 355 L955 385" />
                <!-- Makhachkala -> Derbent -->
                <path d="M955 385 Q995 450 1030 505" />
              </g>

              <!-- Priority #1 Internal Vectors (Chechnya Districts) -->
              <g stroke="rgba(200,169,142,0.65)" stroke-width="1.5">
                <line x1="650" y1="310" x2="682" y2="316" />
                <line x1="650" y1="310" x2="726" y2="288" />
                <line x1="650" y1="310" x2="676" y2="352" />
                <line x1="650" y1="310" x2="612" y2="344" />
                <line x1="650" y1="310" x2="712" y2="334" />
                <line x1="650" y1="310" x2="718" y2="382" />
                <line x1="650" y1="310" x2="635" y2="405" />
                <line x1="650" y1="310" x2="635" y2="232" />
              </g>

              <!-- PRIORITY #2 NODES (SKFO REPUBLICS) -->
              <!-- Cherkessk / Arkhyz -->
              <g transform="translate(135, 265)">
                <circle r="4.5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="0" y="-12" text-anchor="middle" fill="#EAE6DF" font-size="12" font-weight="500">Черкесск · Архыз</text>
                <text x="0" y="18" text-anchor="middle" fill="#9E9B95" font-size="10">КЧР · горные шале</text>
              </g>

              <!-- Kislovodsk -->
              <g transform="translate(215, 245)">
                <circle r="4.5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="-10" y="4" text-anchor="end" fill="#EAE6DF" font-size="12" font-weight="500">Кисловодск</text>
              </g>

              <!-- Pyatigorsk / KMV -->
              <g transform="translate(285, 210)">
                <circle r="5.5" fill="#111214" stroke="#C8A98E" stroke-width="2.2" />
                <text x="0" y="-14" text-anchor="middle" fill="#EAE6DF" font-size="13" font-weight="500">Пятигорск · КМВ</text>
                <text x="0" y="-28" text-anchor="middle" fill="#C8A98E" font-size="10">Ессентуки · Мин. Воды</text>
              </g>

              <!-- Prielbrusye -->
              <g transform="translate(255, 410)">
                <circle r="4.5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="0" y="19" text-anchor="middle" fill="#EAE6DF" font-size="11.5">Приэльбрусье (2100+ м)</text>
              </g>

              <!-- Nalchik (KBR) -->
              <g transform="translate(365, 335)">
                <circle r="5.5" fill="#111214" stroke="#C8A98E" stroke-width="2.2" />
                <text x="0" y="-13" text-anchor="middle" fill="#EAE6DF" font-size="13" font-weight="500">Нальчик</text>
                <text x="0" y="18" text-anchor="middle" fill="#9E9B95" font-size="10">КБР · Баксан</text>
              </g>

              <!-- Vladikavkaz (RSO-Alania) -->
              <g transform="translate(485, 378)">
                <circle r="5.5" fill="#111214" stroke="#C8A98E" stroke-width="2.2" />
                <text x="0" y="20" text-anchor="middle" fill="#EAE6DF" font-size="13" font-weight="500">Владикавказ</text>
                <text x="0" y="34" text-anchor="middle" fill="#9E9B95" font-size="10">РСО-Алания · Фиагдон</text>
              </g>

              <!-- Magas / Nazran (Ingushetia) -->
              <g transform="translate(530, 336)">
                <circle r="5.5" fill="#111214" stroke="#C8A98E" stroke-width="2.2" />
                <text x="-10" y="-8" text-anchor="end" fill="#EAE6DF" font-size="13" font-weight="500">Магас · Назрань</text>
                <text x="-10" y="6" text-anchor="end" fill="#9E9B95" font-size="10">Ингушетия · Джейрах</text>
              </g>

              <!-- Khasavyurt -->
              <g transform="translate(795, 305)">
                <circle r="5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="0" y="-12" text-anchor="middle" fill="#EAE6DF" font-size="12.5" font-weight="500">Хасавюрт</text>
              </g>

              <!-- Kizlyar -->
              <g transform="translate(825, 190)">
                <circle r="4.5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="0" y="-12" text-anchor="middle" fill="#EAE6DF" font-size="12" font-weight="500">Кизляр</text>
              </g>

              <!-- Makhachkala -->
              <g transform="translate(925, 355)">
                <circle r="6" fill="#111214" stroke="#C8A98E" stroke-width="2.4" />
                <text x="12" y="-6" text-anchor="start" fill="#EAE6DF" font-size="13.5" font-weight="500">Махачкала</text>
                <text x="12" y="9" text-anchor="start" fill="#C8A98E" font-size="10.5">Дагестан · ветровой р-н IV</text>
              </g>

              <!-- Kaspiysk -->
              <g transform="translate(955, 385)">
                <circle r="4.5" fill="#111214" stroke="#C8A98E" stroke-width="2" />
                <text x="12" y="4" text-anchor="start" fill="#EAE6DF" font-size="12">Каспийск · Избербаш</text>
              </g>

              <!-- Derbent -->
              <g transform="translate(1030, 505)">
                <circle r="5" fill="#111214" stroke="#C8A98E" stroke-width="2.2" />
                <text x="0" y="-12" text-anchor="middle" fill="#EAE6DF" font-size="12.5" font-weight="500">Дербент</text>
                <text x="0" y="18" text-anchor="middle" fill="#9E9B95" font-size="10">морской климат Qualanod</text>
              </g>

              <!-- PRIORITY #1 NODES (CHECHEN REPUBLIC DISTRICTS) -->
              <!-- Naurskaya / Shelkovskaya -->
              <g transform="translate(635, 232)">
                <circle r="4" fill="#C8A98E" />
                <text x="0" y="-10" text-anchor="middle" fill="#E5D6B8" font-size="11">Наурская · Шелковская</text>
              </g>

              <!-- Gudermes -->
              <g transform="translate(726, 288)">
                <circle r="4.5" fill="#C8A98E" />
                <text x="8" y="-6" text-anchor="start" fill="#E5D6B8" font-size="11.5" font-weight="500">Гудермес</text>
              </g>

              <!-- Argun & Kurchaloy -->
              <g transform="translate(712, 334)">
                <circle r="4.5" fill="#C8A98E" />
                <text x="10" y="4" text-anchor="start" fill="#E5D6B8" font-size="11.5">Аргун · Курчалой</text>
              </g>

              <!-- Shali -->
              <g transform="translate(676, 352)">
                <circle r="4" fill="#C8A98E" />
                <text x="0" y="16" text-anchor="middle" fill="#E5D6B8" font-size="11">Шали</text>
              </g>

              <!-- Urus-Martan / Achkhoy-Martan -->
              <g transform="translate(612, 344)">
                <circle r="4" fill="#C8A98E" />
                <text x="-8" y="15" text-anchor="end" fill="#E5D6B8" font-size="11">Урус-Мартан · Ачхой-Мартан</text>
              </g>

              <!-- Vedeno / Benoy / Kezenoy-Am -->
              <g transform="translate(718, 382)">
                <circle r="4.5" fill="#C8A98E" />
                <text x="10" y="12" text-anchor="start" fill="#E5D6B8" font-size="11">Ведено · Беной · Кезеной-Ам</text>
              </g>

              <!-- Itum-Kali / Shatoy -->
              <g transform="translate(635, 405)">
                <circle r="4.5" fill="#C8A98E" />
                <text x="0" y="18" text-anchor="middle" fill="#E5D6B8" font-size="11">Шатой · Итум-Кали</text>
              </g>

              <!-- GROZNY CENTRAL HUB MARKER -->
              <g transform="translate(650, 310)">
                <circle r="18" fill="rgba(200,169,142,0.2)" stroke="#C8A98E" stroke-width="1.2" />
                <circle r="8" fill="#C8A98E" stroke="#111214" stroke-width="2.5" />
                <rect x="-105" y="-54" width="210" height="34" rx="17" fill="#111214" stroke="#C8A98E" stroke-width="1.5" />
                <text x="0" y="-33" text-anchor="middle" fill="#F4F1EA" font-size="12.5" font-weight="600" letter-spacing="0.06em">ГРОЗНЫЙ · ЦЕНТР CORTEC</text>
              </g>
            </svg>

            <div class="skfo-map-bottom-bar">
              <div class="skfo-metric">
                <span class="skfo-metric-val">15 районов ЧР</span>
                <span class="skfo-metric-lbl">Выезд геодезиста за 24 часа</span>
              </div>
              <div class="skfo-metric">
                <span class="skfo-metric-val">7 субъектов СКФО</span>
                <span class="skfo-metric-lbl">Шеф-монтаж и доставка спецтранспортом</span>
              </div>
              <div class="skfo-metric">
                <span class="skfo-metric-val">8–9 баллов</span>
                <span class="skfo-metric-lbl">Сейсмостойкие узлы КМ/КМД (СП 14.13330)</span>
              </div>
              <div class="skfo-metric">
                <span class="skfo-metric-val">До 2500 м</span>
                <span class="skfo-metric-lbl">Высокогорные стеклопакеты с клапанами</span>
              </div>
            </div>
          </div>
        </div>

        <!-- REGIONAL PRIORITY CARDS (CHECHNYA + SKFO) -->
        <div class="regional-priority-grid reveal" style="margin-top: 32px;">
          <article class="regional-priority-card regional-priority-card--primary">
            <div class="regional-priority-head">
              <span class="eyebrow">Приоритет №1 · Базовый регион базирования</span>
              <h3>Чеченская Республика — проектный офис и шоурум в Грозном</h3>
            </div>
            <p>
              Прямое инженерное сопровождение объектов в Грозном (${site.contact.streetAddress}), оперативный выезд инженера-геодезиста с 3D-тахеометром на строящиеся резиденции и коммерческие здания во всех городах и горных районах республики:
            </p>
            <div class="regional-cities-chips">
              <a href="${prefix}blog/panoramnoe-osteklenie-grozny.html">Грозный</a>
              <a href="${prefix}blog/osteklenie-kottedzhey-gudermes-shali-argun.html">Гудермес</a>
              <a href="${prefix}blog/osteklenie-kottedzhey-gudermes-shali-argun.html">Аргун</a>
              <a href="${prefix}blog/osteklenie-kottedzhey-gudermes-shali-argun.html">Шали</a>
              <a href="${prefix}blog/okna-kbe-grozny-chechnya.html">Урус-Мартан</a>
              <a href="${prefix}blog/alyuminievye-okna-alutech-grozny.html">Курчалой</a>
              <a href="${prefix}blog/okna-kbe-grozny-chechnya.html">Ачхой-Мартан</a>
              <a href="${prefix}blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html">Ведено и Беной</a>
              <a href="${prefix}blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html">Итум-Кали и Шатой</a>
              <a href="${prefix}blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html">Кезеной-Ам</a>
              <a href="${prefix}blog/stoechno-rigelnoe-osteklenie-grozny.html">Наурская и Шелковская</a>
            </div>
          </article>

          <article class="regional-priority-card">
            <div class="regional-priority-head">
              <span class="eyebrow">Приоритет №2 · Межрегиональная логистика по СКФО</span>
              <h3>Республики Северного Кавказа и Кавказские Минеральные Воды</h3>
            </div>
            <p>
              Удаленное проектирование разделов КМ/КМД по чертежам DWG/BIM, выездная геодезия, поставка крупноформатных конструкций ALUTECH, KBE, KÖMMERLING со стеклом AGC и шеф-монтаж по всему Северо-Кавказскому федеральному округу:
            </p>
            <div class="regional-cities-chips">
              <a href="${prefix}blog/panoramnoe-osteklenie-magas-nazran-ingushetiya.html">Магас и Назрань (Ингушетия)</a>
              <a href="${prefix}blog/alyuminievye-fasady-i-okna-mahachkala-kaspiysk-dagestan.html">Махачкала, Каспийск, Дербент (Дагестан)</a>
              <a href="${prefix}blog/okna-kbe-kommerling-hasavyurt-kizlyar.html">Хасавюрт и Кизляр</a>
              <a href="${prefix}blog/arhitekturnoe-osteklenie-vladikavkaz-osetiya.html">Владикавказ и Фиагдон (РСО-Алания)</a>
              <a href="${prefix}blog/panoramnye-okna-i-portaly-nalchik-kbr.html">Нальчик и Приэльбрусье (КБР)</a>
              <a href="${prefix}blog/osteklenie-rezidenciy-pyatigorsk-kislovodsk-kmv.html">Пятигорск, Кисловодск, Ессентуки (КМВ)</a>
              <a href="${prefix}blog/seysmostoykoe-osteklenie-severnyy-kavkaz.html">Черкесск, Архыз, Домбай (КЧР)</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    ${renderBrandShowcase({ prefix, currentSlug: 'contact' })}
  `;
  }
};
