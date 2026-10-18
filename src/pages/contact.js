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

    ${renderBrandShowcase({ prefix, currentSlug: 'contact' })}
  `;
  }
};
