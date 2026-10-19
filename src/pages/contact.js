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
  preloadImg: 'contact-skfo-glass-map-hero',
  schemaJson: buildContactPageSchema(),
  renderMain({ prefix = '' } = {}) {
    const secondaryPhonesHtml = site.contact.phonesSecondary
      .map((p) => `<a href="${p.href}" class="text-link">${p.display}</a>`)
      .join('\n                  ');

    return `
    <!-- SCREEN 1: HERO FOR CONTACT -->
    <section class="hero-viewport" aria-label="Контакты проектного отдела CORTEC в Грозном и карта обслуживания СКФО">
      <div class="hero-media-wrap">
        <img src="${prefix}assets/img/contact-skfo-glass-map-hero.avif" srcset="${prefix}assets/img/contact-skfo-glass-map-hero-sm.avif 688w, ${prefix}assets/img/contact-skfo-glass-map-hero.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Архитектурный 3D-макет рельефной карты Северного Кавказа (СКФО) из многослойного просветленного стекла AGC и анодированных алюминиевых профилей ALUTECH с центральным узлом в Грозном" title="Офис CORTEC в Грозном и география проектирования по Чеченской Республике и СКФО" fetchpriority="high" decoding="async">
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
                <label for="contact-info">Номер телефона</label>
                <input type="tel" id="contact-info" name="contact" autocomplete="tel" inputmode="numeric" maxlength="18" pattern="\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}" title="Введите номер в формате +7 (928) 000-00-00" oninput="let d=this.value.replace(/\\D/g,'');if(!d){this.value='';return;}if(d[0]==='8'||d[0]==='7')d=d.slice(1);d=d.slice(0,10);let f='+7';if(d.length>0)f+=' ('+d.slice(0,3);if(d.length>=4)f+=') '+d.slice(3,6);if(d.length>=7)f+='-'+d.slice(6,8);if(d.length>=9)f+='-'+d.slice(8,10);this.value=f;" required placeholder="+7 (928) 000-00-00">
              </div>

              <div class="form-field">
                <span class="form-label-text">Тип объекта и локация (в один клик)</span>
                <input type="hidden" id="object-type-input" name="objectType" value="Частная резиденция">
                <div class="tactile-pills-group" role="group" aria-label="Выбор типа объекта">
                  <button type="button" class="tactile-pill is-selected" data-pill-group="object" data-pill-value="Частная резиденция">Частная резиденция</button>
                  <button type="button" class="tactile-pill" data-pill-group="object" data-pill-value="Коммерческий фасад">Коммерческий фасад</button>
                  <button type="button" class="tactile-pill" data-pill-group="object" data-pill-value="Высокогорное шале">Высокогорное шале</button>
                  <button type="button" class="tactile-pill" data-pill-group="object" data-pill-value="Нужна 3D-геодезия проемов">3D-геодезия проемов</button>
                </div>
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
                <textarea id="message" name="message" placeholder="Укажите населенный пункт, стадию готовности проемов и ориентировочные габариты"></textarea>
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

    <!-- BLOCK 2: STYLIZED SKFO SERVICE AREAS MAP & INTERACTIVE REGIONAL PASSPORT -->
    <section class="section-space" id="skfo-service-map" aria-labelledby="skfo-map-heading">
      <div class="container">
        <div class="skfo-map-header reveal">
          <div>
            <span class="eyebrow">География проектирования КМ/КМД, геодезии и шеф-монтажа</span>
            <h2 id="skfo-map-heading">
              Карта районов обслуживания.<br>
              <span class="halftone">Выберите город на карте или в списке ниже, чтобы открыть инженерный регламент зоны.</span>
            </h2>
          </div>
          <p class="body-paragraph skfo-map-intro">
            Центральное конструкторское бюро и шоурум узлов расположены в <strong>г. Грозный (${site.contact.streetAddress})</strong>. Выездные бригады геодезистов и шеф-инженеров CORTEC выполняют 3D-тахеометрию проемов, доставку спецтранспортом и монтаж по ГОСТ 30971 во всех районах Чеченской Республики и субъектах СКФО.
          </p>
        </div>

        <div class="skfo-map-canvas reveal" role="region" aria-label="Интерактивная инженерная карта районов обслуживания CORTEC в СКФО">
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
              <span class="skfo-coord-badge">CORTEC HQ · 43.3208° N, 45.7145° E · ГРОЗНЫЙ</span>
              <div class="skfo-legend">
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--hq"></i>Центр CORTEC (Грозный)</span>
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--p1"></i>Районы ЧР (Приоритет №1)</span>
                <span class="skfo-legend-item"><i class="skfo-dot skfo-dot--p2"></i>Субъекты СКФО (Приоритет №2)</span>
              </div>
            </div>

            <div class="skfo-svg-scroll-wrap">
              <svg class="skfo-vector-svg" viewBox="0 0 1200 540" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Интерактивная схема инженерной логистики CORTEC из Грозного по городам Чеченской Республики и Северного Кавказа">
                <defs>
                  <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#C8A98E" stop-opacity="0.38" />
                    <stop offset="55%" stop-color="#C8A98E" stop-opacity="0.08" />
                    <stop offset="100%" stop-color="#C8A98E" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <!-- Subtle Hairline Coordinate Horizon -->
                <g stroke="rgba(255,255,255,0.045)" stroke-width="1">
                  <line x1="60" y1="265" x2="1140" y2="265" stroke="rgba(200,169,142,0.14)" stroke-dasharray="3 9" />
                  <line x1="670" y1="40" x2="670" y2="500" stroke="rgba(200,169,142,0.14)" stroke-dasharray="3 9" />
                </g>

                <!-- Delicate Concentric Coverage Arcs around Grozny (670, 265) -->
                <circle cx="670" cy="265" r="125" stroke="rgba(200,169,142,0.22)" stroke-width="0.85" stroke-dasharray="3 7" />
                <circle cx="670" cy="265" r="265" stroke="rgba(255,255,255,0.08)" stroke-width="0.75" stroke-dasharray="4 10" />
                <circle cx="670" cy="265" r="440" stroke="rgba(255,255,255,0.05)" stroke-width="0.75" stroke-dasharray="4 12" />
                <circle cx="670" cy="265" r="150" fill="url(#hqGlow)" />

                <!-- Soft Contour of Chechen Republic (Priority #1 Core Zone) -->
                <path
                  d="M575 190 L655 150 L765 165 L800 245 L780 355 L700 415 L600 405 L565 320 Z"
                  fill="rgba(200,169,142,0.055)"
                  stroke="rgba(200,169,142,0.32)"
                  stroke-width="1"
                />

                <!-- Trajectory Arcs from Grozny (670, 265) to All Nodes -->
                <g class="skfo-arcs-group" stroke="rgba(200,169,142,0.26)" stroke-width="1" stroke-dasharray="4 7">
                  <!-- West SKFO -->
                  <path data-arc="kmv" d="M670 265 Q460 155 245 145" />
                  <path data-arc="kchr" d="M245 145 Q175 195 125 255" />
                  <path data-arc="nalchik" d="M670 265 Q495 270 330 295" />
                  <path data-arc="elbrus" d="M330 295 Q265 355 215 415" />
                  <path data-arc="vladikavkaz" d="M670 265 Q560 345 455 390" />
                  <path data-arc="magas" d="M670 265 Q595 280 515 295" />
                  <!-- East SKFO (Dagestan) -->
                  <path data-arc="kizlyar" d="M670 265 Q765 175 865 135" />
                  <path data-arc="khasavyurt" d="M670 265 Q760 250 845 245" />
                  <path data-arc="makhachkala" d="M670 265 Q835 295 995 320" />
                  <path data-arc="derbent" d="M995 320 Q1035 395 1065 460" />
                </g>

                <!-- Internal Priority #1 Solid Hairlines (Chechnya) -->
                <g stroke="rgba(200,169,142,0.45)" stroke-width="1">
                  <line x1="670" y1="265" x2="660" y2="172" />
                  <line x1="670" y1="265" x2="758" y2="218" />
                  <line x1="670" y1="265" x2="736" y2="296" />
                  <line x1="670" y1="265" x2="604" y2="322" />
                  <line x1="670" y1="265" x2="752" y2="368" />
                  <line x1="670" y1="265" x2="646" y2="392" />
                </g>

                <!-- INTERACTIVE NODES (WELL-SPACED, ZERO OVERLAP) -->

                <!-- 1. Cherkessk & Arkhyz -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="kchr" transform="translate(125, 255)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p2" r="4" />
                  <text x="0" y="-15" text-anchor="middle" class="skfo-lbl">Черкесск · Архыз</text>
                </g>

                <!-- 2. Pyatigorsk & Kislovodsk (KMV) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="kmv" transform="translate(245, 145)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="10" />
                  <circle class="skfo-core skfo-core--p2" r="4.5" />
                  <text x="0" y="-16" text-anchor="middle" class="skfo-lbl">Пятигорск · Кисловодск</text>
                </g>

                <!-- 3. Prielbrusye -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="elbrus" transform="translate(215, 415)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p2" r="4" />
                  <text x="0" y="22" text-anchor="middle" class="skfo-lbl">Приэльбрусье</text>
                </g>

                <!-- 4. Nalchik (KBR) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="nalchik" transform="translate(330, 295)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="10" />
                  <circle class="skfo-core skfo-core--p2" r="4.5" />
                  <text x="0" y="-15" text-anchor="middle" class="skfo-lbl">Нальчик</text>
                </g>

                <!-- 5. Vladikavkaz & Fiagdon -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="vladikavkaz" transform="translate(455, 390)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="10" />
                  <circle class="skfo-core skfo-core--p2" r="4.5" />
                  <text x="0" y="22" text-anchor="middle" class="skfo-lbl">Владикавказ · Фиагдон</text>
                </g>

                <!-- 6. Magas & Nazran -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="magas" transform="translate(515, 295)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="10" />
                  <circle class="skfo-core skfo-core--p2" r="4.5" />
                  <text x="-12" y="4" text-anchor="end" class="skfo-lbl">Магас · Назрань</text>
                </g>

                <!-- 7. Naurskaya & Shelkovskaya (Chechnya North) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="naurskaya" transform="translate(660, 172)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="0" y="-14" text-anchor="middle" class="skfo-lbl skfo-lbl--gold">Наурская · Шелковская</text>
                </g>

                <!-- 8. Gudermes (Chechnya East) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="gudermes" transform="translate(758, 218)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="0" y="-14" text-anchor="middle" class="skfo-lbl skfo-lbl--gold">Гудермес</text>
                </g>

                <!-- 9. Argun & Shali (Chechnya Central-East) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="argun" transform="translate(736, 296)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="12" y="4" text-anchor="start" class="skfo-lbl skfo-lbl--gold">Аргун · Шали</text>
                </g>

                <!-- 10. Urus-Martan (Chechnya Southwest) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="urus" transform="translate(604, 322)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="-10" y="16" text-anchor="end" class="skfo-lbl skfo-lbl--gold">Урус-Мартан</text>
                </g>

                <!-- 11. Vedeno & Kezenoy-Am (Chechnya Southeast Mountains) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="vedeno" transform="translate(752, 368)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="12" y="5" text-anchor="start" class="skfo-lbl skfo-lbl--gold">Ведено · Кезеной-Ам</text>
                </g>

                <!-- 12. Shatoy & Itum-Kali (Chechnya High Gorge) -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="itumkali" transform="translate(646, 392)">
                  <circle class="skfo-hit" r="22" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p1" r="4" />
                  <text x="0" y="21" text-anchor="middle" class="skfo-lbl skfo-lbl--gold">Шатой · Итум-Кали</text>
                </g>

                <!-- 13. Kizlyar -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="kizlyar" transform="translate(865, 135)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="9" />
                  <circle class="skfo-core skfo-core--p2" r="4" />
                  <text x="0" y="-15" text-anchor="middle" class="skfo-lbl">Кизляр</text>
                </g>

                <!-- 14. Khasavyurt -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="khasavyurt" transform="translate(845, 245)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="9.5" />
                  <circle class="skfo-core skfo-core--p2" r="4.2" />
                  <text x="12" y="4" text-anchor="start" class="skfo-lbl">Хасавюрт</text>
                </g>

                <!-- 15. Makhachkala & Kaspiysk -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="makhachkala" transform="translate(995, 320)">
                  <circle class="skfo-hit" r="26" fill="transparent" />
                  <circle class="skfo-ring" r="11" />
                  <circle class="skfo-core skfo-core--p2" r="5" />
                  <text x="14" y="4" text-anchor="start" class="skfo-lbl">Махачкала · Каспийск</text>
                </g>

                <!-- 16. Derbent -->
                <g class="skfo-node" tabindex="0" role="button" data-region-id="derbent" transform="translate(1065, 460)">
                  <circle class="skfo-hit" r="24" fill="transparent" />
                  <circle class="skfo-ring" r="9.5" />
                  <circle class="skfo-core skfo-core--p2" r="4.2" />
                  <text x="0" y="22" text-anchor="middle" class="skfo-lbl">Дербент</text>
                </g>

                <!-- 0. GROZNY CENTRAL HUB MARKER -->
                <g class="skfo-node is-active" tabindex="0" role="button" data-region-id="grozny" transform="translate(670, 265)">
                  <circle class="skfo-hit" r="28" fill="transparent" />
                  <circle class="skfo-ring" r="16" />
                  <circle r="7" fill="#C8A98E" stroke="#111214" stroke-width="2" />
                  <rect x="-56" y="-38" width="112" height="24" rx="12" fill="#111214" stroke="#C8A98E" stroke-width="1.2" />
                  <text x="0" y="-22" text-anchor="middle" fill="#F4F1EA" font-size="11.5" font-weight="600" letter-spacing="0.08em">ГРОЗНЫЙ</text>
                </g>
              </svg>
            </div>

            <!-- LIVE INTERACTIVE REGIONAL PASSPORT BAR (UPDATES ON TAP / CLICK) -->
            <div class="skfo-live-passport" id="skfo-live-passport" aria-live="polite">
              <div class="skfo-passport-main">
                <span class="skfo-passport-badge" id="skfo-passport-badge">Приоритет №1 · Штаб-квартира и шоурум</span>
                <h3 class="skfo-passport-title" id="skfo-passport-title">г. Грозный (ул. Субры Кишиевой, 55)</h3>
                <p class="skfo-passport-desc" id="skfo-passport-desc">
                  Проектный отдел КМ/КМД, полноразмерная экспозиция узлов ALUTECH, KBE, KÖMMERLING и стекла AGC. Выезд инженера-геодезиста с 3D-тахеометром по Грозному — в день обращения.
                </p>
              </div>
              <div class="skfo-passport-specs">
                <div class="skfo-passport-spec">
                  <span class="skfo-spec-lbl">Климатика и статика</span>
                  <strong class="skfo-spec-val" id="skfo-passport-wind">III ветровой р-н · 8–9 баллов</strong>
                </div>
                <div class="skfo-passport-spec">
                  <span class="skfo-spec-lbl">Рекомендуемый узел</span>
                  <strong class="skfo-spec-val" id="skfo-passport-sys">ALT F50 / W72 · Stopray · КМ/КМД</strong>
                </div>
                <div class="skfo-passport-actions">
                  <a href="${prefix}blog/panoramnoe-osteklenie-grozny.html" id="skfo-passport-link" class="btn-oval">Инженерный разбор зоны →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- REGIONAL PRIORITY CARDS (TACTILE SELECTOR + SEO LINKS) -->
        <div class="regional-priority-grid reveal" style="margin-top: 32px;">
          <article class="regional-priority-card regional-priority-card--primary">
            <div class="regional-priority-head">
              <span class="eyebrow">Приоритет №1 · Базовый регион базирования</span>
              <h3>Чеченская Республика — проектный офис и шоурум в Грозном</h3>
            </div>
            <p>
              Нажмите на любой город или район ниже, чтобы подсветить его на карте и посмотреть параметры остекления, или перейдите к подробному техническому обзору:
            </p>
            <div class="regional-cities-chips">
              <a href="${prefix}blog/panoramnoe-osteklenie-grozny.html" data-region-trigger="grozny">Грозный</a>
              <a href="${prefix}blog/osteklenie-kottedzhey-gudermes-shali-argun.html" data-region-trigger="gudermes">Гудермес</a>
              <a href="${prefix}blog/osteklenie-kottedzhey-gudermes-shali-argun.html" data-region-trigger="argun">Аргун и Шали</a>
              <a href="${prefix}blog/okna-kbe-grozny-chechnya.html" data-region-trigger="urus">Урус-Мартан и Ачхой-Мартан</a>
              <a href="${prefix}blog/alyuminievye-okna-alutech-grozny.html" data-region-trigger="argun">Курчалой</a>
              <a href="${prefix}blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html" data-region-trigger="vedeno">Ведено, Беной и Кезеной-Ам</a>
              <a href="${prefix}blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html" data-region-trigger="itumkali">Шатой и Итум-Кали</a>
              <a href="${prefix}blog/stoechno-rigelnoe-osteklenie-grozny.html" data-region-trigger="naurskaya">Наурская и Шелковская</a>
            </div>
          </article>

          <article class="regional-priority-card">
            <div class="regional-priority-head">
              <span class="eyebrow">Приоритет №2 · Межрегиональная логистика по СКФО</span>
              <h3>Республики Северного Кавказа и Кавказские Минеральные Воды</h3>
            </div>
            <p>
              Удаленное проектирование разделов КМ/КМД по чертежам DWG/BIM, выездная геодезия, поставка крупноформатных конструкций ALUTECH, KBE, KÖMMERLING со стеклом AGC и шеф-монтаж по всему СКФО:
            </p>
            <div class="regional-cities-chips">
              <a href="${prefix}blog/panoramnoe-osteklenie-magas-nazran-ingushetiya.html" data-region-trigger="magas">Магас и Назрань (Ингушетия)</a>
              <a href="${prefix}blog/alyuminievye-fasady-i-okna-mahachkala-kaspiysk-dagestan.html" data-region-trigger="makhachkala">Махачкала и Каспийск (Дагестан)</a>
              <a href="${prefix}blog/alyuminievye-fasady-i-okna-mahachkala-kaspiysk-dagestan.html" data-region-trigger="derbent">Дербент</a>
              <a href="${prefix}blog/okna-kbe-kommerling-hasavyurt-kizlyar.html" data-region-trigger="khasavyurt">Хасавюрт и Кизляр</a>
              <a href="${prefix}blog/arhitekturnoe-osteklenie-vladikavkaz-osetiya.html" data-region-trigger="vladikavkaz">Владикавказ и Фиагдон (РСО-Алания)</a>
              <a href="${prefix}blog/panoramnye-okna-i-portaly-nalchik-kbr.html" data-region-trigger="nalchik">Нальчик (КБР)</a>
              <a href="${prefix}blog/panoramnye-okna-i-portaly-nalchik-kbr.html" data-region-trigger="elbrus">Приэльбрусье</a>
              <a href="${prefix}blog/osteklenie-rezidenciy-pyatigorsk-kislovodsk-kmv.html" data-region-trigger="kmv">Пятигорск и Кисловодск (КМВ)</a>
              <a href="${prefix}blog/seysmostoykoe-osteklenie-severnyy-kavkaz.html" data-region-trigger="kchr">Черкесск, Архыз, Домбай (КЧР)</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    ${renderBrandShowcase({ prefix, currentSlug: 'contact' })}
  `;
  }
};
