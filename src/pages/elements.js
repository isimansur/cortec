const { buildItemListPageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'elements',
  file: 'elements.html',
  title: "Стеклопакеты и скрытая фурнитура окон в Грозном и ЧР | CORTEC",
  description: "Комплектующие светопрозрачных конструкций CORTEC в Грозном и на Северном Кавказе: двухкамерные стеклопакеты с теплой рамкой Chromatech Ultra, триплекс, скрытая фурнитура до 180 кг и ручки.",
  ogTitle: "Стеклопакеты и фурнитура CORTEC (г. Грозный): архитектурное стекло, скрытая фурнитура и ручки",
  ogDescription: "Макро-экспозиция компонентов светопрозрачных систем в Грозном: торцы многослойных стеклопакетов AGC, скрытые петли, терморазрывы и узлы примыкания.",
  twitterDescription: "Мультифункциональные стекла, теплые рамки, скрытые петли и безрозеточные ручки для систем ALUTECH, KBE и KÖMMERLING в Грозном.",
  preloadImg: 'multilayer-glass-edge',
  schemaJson: buildItemListPageSchema({
    file: 'elements.html',
    listName: 'Инженерные компоненты светопрозрачных конструкций CORTEC',
    items: [
      { name: 'Мультифункциональные и селективные двухкамерные стеклопакеты', anchor: 'steklopakety' },
      { name: 'Закаленное стекло и акустический стратофон-триплекс', anchor: 'zakalennoe-steklo-tripleks' },
      { name: 'Теплые композитные дистанционные рамки и заполнение аргоном', anchor: 'teplye-ramki' },
      { name: 'Минималистичные безрозеточные ручки и скрытая фурнитура', anchor: 'furnitura-i-ruchki' },
      { name: 'Уплотнители EPDM и узлы монтажного примыкания', anchor: 'uzly-primykaniya' }
    ],
    breadcrumbLabel: 'Стеклопакеты и фурнитура'
  }),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- SCREEN 1: HERO FOR ELEMENTS (GLASS EDGE MACRO) -->
    <section class="hero-viewport hero-viewport--right" aria-label="Компоненты светопрозрачных конструкций">
      <div class="hero-media-wrap">
        <img src="assets/img/multilayer-glass-edge.avif" srcset="assets/img/multilayer-glass-edge-sm.avif 688w, assets/img/multilayer-glass-edge.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Чистый архитектурный торец многослойного двухкамерного стеклопакета с преломлением теплого света" title="Двухкамерный мультифункциональный стеклопакет с теплой дистанционной рамкой" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Стеклопакеты и фурнитура</span>
          </nav>
          <span class="eyebrow">Анатомия светопрозрачного узла</span>
          <h1>
            Стеклопакеты и фурнитура.<br>
            <span class="halftone">Совершенство, собранное из отдельных дисциплин.</span>
          </h1>
          <p class="lead-paragraph">
            Профильная система <a href="${prefix}alutech.html" class="text-link">ALUTECH</a> или <a href="${prefix}kbe.html" class="text-link">KBE</a> раскрывает свой потенциал только в союзе с правильно рассчитанной формулой стеклопакета, прецизионной скрытой механикой и безупречной герметизацией монтажного шва. Здесь мы показываем ключевые элементы конструкции крупным планом.
          </p>
          <nav class="quiet-anchor-rail" aria-label="Разделы страницы элементов">
            <a href="#steklopakety">Селективные стеклопакеты</a>
            <a href="#zakalennoe-steklo-tripleks">Триплекс и закалка</a>
            <a href="#teplye-ramki">Теплые рамки Chromatech</a>
            <a href="#furnitura-i-ruchki">Скрытые петли и ручки</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- BLOCK 1: ARCHITECTURAL GLASS -->
    <section class="section-space" aria-labelledby="glass-discipline-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Дисциплина I · Архитектурное стекло</span>
            <h2 id="glass-discipline-heading">
              Формула света и тепла.<br>
              <span class="halftone">Магнетронные покрытия, закалка и композитный контур.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="steklopakety" class="stagger-item-title">Мультифункциональные и селективные покрытия</h3>
            <p class="body-paragraph">
              В панорамном остеклении стекло выполняет роль селективного фильтра. Невидимые глазу слои оксидов металлов и серебра, нанесенные методом магнетронного напыления в вакууме, отражают длинноволновое инфракрасное тепло обратно в комнату зимой и отсекают избыточную солнечную радиацию летом, сохраняя естественную цветопередачу пейзажа за окном.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="zakalennoe-steklo-tripleks" class="stagger-item-title">Закаленное стекло и акустический триплекс</h3>
            <p class="body-paragraph">
              Для <a href="${prefix}alutech.html#krupnoformatnye-elementy" class="text-link">крупноформатных витражей ALUTECH</a> и <a href="${prefix}kbe.html#bolshie-okonnye-konstrukcii" class="text-link">большепролетных окон KBE</a> мы применяем термически закаленное стекло, прочность которого на изгиб и термошок в пять раз превышает показатели обычного листа, а также многослойный триплекс со звукопоглощающей пленкой. Шлифованная и полированная кромка снимает внутренние краевые напряжения стеклопакета.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-offset-mid">
            <h3 id="teplye-ramki" class="stagger-item-title">Теплые дистанционные рамки и заполнение инертным газом</h3>
            <p class="body-paragraph">
              Традиционная алюминиевая рамка по периметру стеклопакета является мостиком холода. Мы заменяем ее на композитные полимерно-армированные дистанционные рамки в глубоком черном или антрацитовом матовом цвете. Камеры заполняются аргоном высокой чистоты, а двухконтурная вторичная герметизация полисульфидным или структурным силиконовым составом сохраняет газонаполнение десятилетиями.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED SCENE: MINIMALIST HANDLE -->
    <section class="macro-stage" aria-labelledby="furnitura-i-ruchki">
      <div class="macro-stage-media">
        <img src="assets/img/minimalist-window-handle.avif" srcset="assets/img/minimalist-window-handle-sm.avif 688w, assets/img/minimalist-window-handle.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Минималистичная темная оконная ручка на фоне матовой графитовой рамы" title="Безрозеточные оконные ручки в темном анодированном исполнении" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-left reveal">
          <span class="eyebrow">Дисциплина II · Ручки и фурнитура</span>
          <h2 id="furnitura-i-ruchki">
            Скрытая механика.<br>
            <span class="halftone">Чистая плоскость рамы без видимых петель и розеток.</span>
          </h2>
          <p class="body-paragraph">
            Ручка — единственная деталь окна, с которой человек взаимодействует тактильно каждый день. Мы подбираем безрозеточные и минималистичные модели из анодированного алюминия и нержавеющей стали, настроенные на плавный, упругий ход без люфтов.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 2: HARDWARE & JUNCTIONS -->
    <section class="section-space" aria-label="Скрытая фурнитура и монтажные узлы">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 class="stagger-item-title">Скрытые петлевые группы и многозапорный прижим</h3>
            <p class="body-paragraph">
              Скрытая фурнитура полностью размещается в фальцевом зазоре между рамой и створкой. Это решает сразу две задачи: во-первых, в закрытом положении ничто не нарушает чистую геометрию темного профиля; во-вторых, петли не пережимают уплотнительный контур, исключая продувание и промерзание в зоне навесов.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="uzly-primykaniya" class="stagger-item-title">Уплотнители EPDM и культура монтажного узла</h3>
            <p class="body-paragraph">
              Даже самая совершенная конструкция теряет смысл при некорректном примыкании к стене. CORTEC проектирует узлы примыкания с выносом или точной установкой в зону эффективного утеплителя, используя паропроницаемые наружные мембраны, пароизоляционные внутренние ленты и эластичные синтетические каучуковые уплотнители EPDM, не теряющие упругости при экстремальных отрицательных температурах.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- APEX 5-STRIP VERTICAL GALLERY -->
    <section class="apex-gallery-section" aria-labelledby="elements-gallery-heading">
      <div class="container reveal" style="margin-bottom: 72px;">
        <span class="eyebrow">Пять материальных планов</span>
        <h2 id="elements-gallery-heading">
          Точность в каждой плоскости.<br>
          <span class="halftone">От угловой запрессовки до беспорогового рельса.</span>
        </h2>
      </div>

      <div class="apex-five-strip reveal">
        <div class="apex-strip-item">
          <img src="assets/img/detail-01-frame.avif" srcset="assets/img/detail-01-frame-sm.avif 424w, assets/img/detail-01-frame.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Прецизионный угловой стык анодированной алюминиевой рамы в цвете темный графит" title="Угловое соединение алюминиевого профиля ALUTECH" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-02-glass.avif" srcset="assets/img/detail-02-glass-sm.avif 424w, assets/img/detail-02-glass.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Плоскость структурного фасадного остекления с холодным стальным отливом" title="Структурное остекление фасадов без прижимных планок" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-03-hardware.avif" srcset="assets/img/detail-03-hardware-sm.avif 424w, assets/img/detail-03-hardware.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Внутренний запорный узел скрытой фурнитуры в темном профильном пазу" title="Прецизионный запорный механизм скрытой фурнитуры" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-04-profile.avif" srcset="assets/img/detail-04-profile-sm.avif 424w, assets/img/detail-04-profile.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Многоуровневый EPDM-уплотнитель и полиамидный терморазрыв в разрезе" title="Терморазрыв из полиамида и контур уплотнения EPDM" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-05-junction.avif" srcset="assets/img/detail-05-junction-sm.avif 424w, assets/img/detail-05-junction.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Узел примыкания раздвижного портала в уровень с каменным полом" title="Беспороговое примыкание подъемно-сдвижного портала" loading="lazy" decoding="async">
        </div>
      </div>

      <div class="apex-gallery-Invite reveal">
        <p>
          Обсудите подбор формулы стеклопакета, фурнитуры и цветовой отделки профилей с ведущим инженером CORTEC.
        </p>
        <a href="${prefix}contact.html" class="btn-oval">Связаться с инженером</a>
      </div>
    </section>
  `;
  }
};
