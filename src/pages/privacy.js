const site = require('../data/site');

module.exports = {
  slug: 'privacy',
  file: 'privacy.html',
  title: 'Политика конфиденциальности и обработки персональных данных — CORTEC',
  description: `Политика обработки персональных данных (152-ФЗ) компании CORTEC (${site.contact.shortAddress}) при обращении за расчетом светопрозрачных конструкций.`,
  ogTitle: 'Политика конфиденциальности — CORTEC technologies',
  ogDescription: 'Порядок обработки и защиты контактных данных заказчиков и архитекторов в соответствии с 152-ФЗ.',
  twitterDescription: 'Политика конфиденциальности CORTEC.',
  preloadImg: '',
  schemaJson: '',
  noindex: true,
  renderMain({ prefix = '' } = {}) {
    return `
    <section class="section-space-lg" style="padding-top: clamp(128px, 16vw, 180px);">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
              <a href="${prefix}index.html">CORTEC</a>
              <span aria-hidden="true">/</span>
              <span>Политика конфиденциальности</span>
            </nav>
            <span class="eyebrow">Правовая информация · 152-ФЗ</span>
            <h1 style="margin-bottom: 28px;">
              Политика конфиденциальности.<br>
              <span class="halftone">Обработка и защита данных проекта.</span>
            </h1>
            <p class="lead-paragraph">
              Настоящая Политика определяет порядок обработки и защиты контактных данных и проектной документации, которые вы передаете в инженерный отдел CORTEC через сайт <a href="${prefix}index.html" class="text-link">${site.brand.host}</a>, электронную почту или мессенджеры.
            </p>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h2 class="stagger-item-title">1. Общие положения и оператор</h2>
            <p class="body-paragraph">
              Настоящая Политика составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и действует в отношении всей информации, которую компания <strong>${site.brand.name}</strong> (адрес офиса: ${site.contact.postalCode}, ${site.contact.region}, г. ${site.contact.city}, ${site.contact.streetAddress}; электронная почта: <a href="mailto:${site.contact.email}" class="text-link">${site.contact.email}</a>; телефон: <a href="${site.contact.phonePrimary.href}" class="text-link">${site.contact.phonePrimary.display}</a>) получает от посетителей веб-сайта <code>${site.brand.domain}</code>.
            </p>
          </article>
          <article class="stagger-right">
            <h2 class="stagger-item-title">2. Состав обрабатываемых данных</h2>
            <p class="body-paragraph">
              Мы запрашиваем и обрабатываем исключительно минимальный объем сведений, необходимый для подготовки инженерно-технического предложения и обратной связи с вами: имя (или название архитектурного бюро), контактный номер телефона, адрес электронной почты, а также параметры вашего объекта (населенный пункт, габариты проемов, чертежи КМ/АР).
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h2 class="stagger-item-title">3. Цели обработки персональных данных</h2>
            <p class="body-paragraph">
              Переданные вами данные используются исключительно для: связи инженера-конструктора с заявителем, выполнения статического и теплотехнического расчета систем ALUTECH, KBE, KÖMMERLING и стекла AGC, подготовки спецификаций и коммерческих предложений, а также согласования выезда геодезиста на объект.
            </p>
          </article>
          <article class="stagger-right">
            <h2 class="stagger-item-title">4. Конфиденциальность чертежей и контактов</h2>
            <p class="body-paragraph">
              CORTEC соблюдает строгую конфиденциальность в отношении переданных архитектурных планов, ведомостей проемов и контактных данных заказчиков. Персональные данные никогда не передаются третьим лицам и рекламным сервисам, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h2 class="stagger-item-title">5. Сроки хранения и отзыв согласия</h2>
            <p class="body-paragraph">
              Пользователь может в любой момент запросить актуализацию или полное удаление своих контактных данных, направив письмо на адрес <a href="mailto:${site.contact.email}" class="text-link">${site.contact.email}</a> с пометкой «Отзыв согласия на обработку персональных данных» либо обратившись по телефону <a href="${site.contact.phonePrimary.href}" class="text-link">${site.contact.phonePrimary.display}</a>.
            </p>
            <div class="btn-group">
              <a href="${prefix}contact.html" class="btn-sand">Вернуться к контактам</a>
              <a href="${prefix}index.html" class="btn-oval">На главную экспозицию</a>
            </div>
          </article>
        </div>
      </div>
    </section>
    `;
  }
};
