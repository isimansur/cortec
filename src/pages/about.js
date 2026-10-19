const site = require('../data/site');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');
const { buildAboutPageSchema } = require('../core/schema-builder');

module.exports = {
  slug: 'about',
  file: 'about.html',
  title: "Компания CORTEC — Проектирование КМ/КМД в Грозном, ЧР и СКФО",
  description: "Инженеры-конструкторы КМ/КМД и технологи CORTEC в Грозном (ул. Субры Кишиевой, 55). Проектирование, комплектация и шеф-монтаж фасадных и оконных систем ALUTECH, KBE, KÖMMERLING и стекла AGC в ЧР и СКФО.",
  ogTitle: "Компания CORTEC — Инженерный подход в Грозном и на Северном Кавказе",
  ogDescription: "Практика проектирования светопрозрачных конструкций КМ/КМД в Чеченской Республике и СКФО: работа с технологиями ALUTECH, KBE, KÖMMERLING и AGC.",
  twitterDescription: "Инженерное проектирование КМ/КМД, статика и теплотехника светопрозрачных конструкций в Грозном и СКФО.",
  preloadImg: 'alutech-facade-node',
  schemaJson: buildAboutPageSchema(),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- SCREEN 1: HERO FOR ABOUT -->
    <section class="hero-viewport" aria-label="Компания CORTEC">
      <div class="hero-media-wrap">
        <img src="assets/img/alutech-facade-node.avif" srcset="assets/img/alutech-facade-node-sm.avif 688w, assets/img/alutech-facade-node.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Архитектурный узел остекления CORTEC в глубоком графитовом цвете с теплым светом внутри" title="Инженерное проектирование и монтаж светопрозрачных конструкций CORTEC" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Компания</span>
          </nav>
          <span class="eyebrow">Компания CORTEC · Инженерная практика</span>
          <h1>
            Компания CORTEC.<br>
            <span class="halftone">Сформированная годами инженерной практики.</span>
          </h1>
          <p class="lead-paragraph">
            CORTEC создан инженерами-проектировщиками, технологами и руководителями монтажных служб, за плечами которых — годы работы над сложными светопрозрачными объектами в ведущих отраслевых компаниях. Мы объединились под новым именем, чтобы работать без конвейерных компромиссов и уделять максимум внимания каждому узлу.
          </p>
          <nav class="quiet-anchor-rail" aria-label="Разделы страницы Компания">
            <a href="#honest-position-heading">Инженерная позиция</a>
            <a href="#about-cta-heading">Консультация КМ/КМД</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- BLOCK 1: ENGINEERING PHILOSOPHY -->
    <section class="section-space" aria-labelledby="honest-position-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Честная позиция</span>
            <h2 id="honest-position-heading">
              Почему мы говорим на языке узлов, а не чужих рендеров.<br>
              <span class="halftone">Уважение к архитектору и заказчику.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-right">
            <p class="lead-paragraph">
              Мы не приписываем себе объекты, реализованные участниками нашей команды в прошлых структурах, и не заполняем сайт стоковыми фотографиями домов. Вместо этого мы показываем то, за что отвечаем лично каждый день: культуру инженерной проработки, точность сопряжения профилей <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>, <a href="${prefix}kbe.html" class="text-link">KBE</a> и <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a>, селективную оптику <a href="${prefix}agc.html" class="text-link">архитектурного стекла AGC</a> и герметичность монтажного примыкания.
            </p>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 class="stagger-item-title">Углубленная работа с технологиями брендов</h3>
            <p class="body-paragraph">
              CORTEC не изобретает профили кустарным путем — мы опираемся на фундаментальную системную базу лидеров индустрии. В сегменте архитектурного алюминия мы работаем со стоечно-ригельными, структурными, оконно-дверными и портальными решениями <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>. В сегменте высокоэффективных полимерных и гибридных конструкций — с немецкими инженерными системами <a href="${prefix}kbe.html" class="text-link">KBE 76</a> и <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING 88 AluClip Zero</a> в сочетании со стеклом <a href="${prefix}agc.html" class="text-link">AGC Stopray и Stratophone</a>. Наша задача — грамотно рассчитать, укомплектовать и смонтировать эти системы в строгом соответствии с системными каталогами производителей.
            </p>
          </article>
          <article class="stagger-right">
            <h3 class="stagger-item-title">Проектирование КМ и КМД до запуска в производство</h3>
            <p class="body-paragraph">
              Любой проект в CORTEC начинается с геодезической съемки проемов и разработки рабочей документации. Мы выполняем статический расчет стоек, ригелей и импостов на ветровые и весовые нагрузки, проверяем изотермы узлов примыкания для исключения точки росы на внутренних откосах и согласовываем сечения с архитектором объекта.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 class="stagger-item-title">Культура сборки и шеф-монтаж</h3>
            <p class="body-paragraph">
              Долговечность фасада или панорамного портала решается в деталях: точности запила и опрессовки углов на двухкомпонентный клей, непрерывности контура бутиловой и EPDM-герметизации, правильном расклинивании тяжелого стеклопакета рихтовочными подкладками и выверенном монтаже в зону утеплителя по ГОСТ 30971. Каждый этап контролируется ведущим инженером проекта.
            </p>
          </article>
          <article class="stagger-right">
            <h3 class="stagger-item-title">Диалог с архитекторами и частными заказчиками</h3>
            <p class="body-paragraph">
              Мы освобождаем автора проекта от рутинных расчетов: помогаем выбрать между стоечно-ригельным и полуструктурным решением, интегрировать безбарьерный порог раздвижного портала в конструкцию теплого пола или согласовать единый графитовый оттенок алюминиевых витражей ALUTECH и оконных блоков KBE и KÖMMERLING.
            </p>
          </article>
        </div>
      </div>
    </section>

    ${renderBrandShowcase({ prefix, currentSlug: 'about' })}

    <!-- FULL-BLEED QUIET SCENE -->
    <section class="macro-stage macro-stage--text-right" aria-labelledby="about-cta-heading">
      <div class="macro-stage-media">
        <img src="assets/img/kbe-graphite-profile.avif" srcset="assets/img/kbe-graphite-profile-sm.avif 688w, assets/img/kbe-graphite-profile.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Прецизионный срез темного инженерного профиля и двухкамерного стеклопакета" title="Инженерный расчет и комплектация профильных систем" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-right reveal">
          <span class="eyebrow">Приглашение к диалогу</span>
          <h2 id="about-cta-heading">
            Начните с инженерной консультации.<br>
            <span class="halftone">Разберем ваш проект по чертежам и узлам.</span>
          </h2>
          <p class="body-paragraph">
            Пришлите нам архитектурные планы, фасады или ведомость оконных и дверных проемов. Мы подготовим обоснованное техническое решение на базе систем ALUTECH, KBE, KÖMMERLING и стекла AGC.
          </p>
          <div class="btn-group">
            <a href="${prefix}contact.html" class="btn-sand">Перейти к контактам</a>
            <a href="${site.contact.whatsappUrl}?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20CORTEC!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D0%BE%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F." target="_blank" rel="noopener noreferrer" class="btn-oval">Написать в WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  `;
  }
};
