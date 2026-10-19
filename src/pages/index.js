const site = require('../data/site');
const { buildHomePageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'index',
  file: 'index.html',
  title: "CORTEC Грозный — Фасадное и панорамное остекление в ЧР и СКФО",
  description: "Проектирование КМ/КМД и шеф-монтаж панорамного остекления CORTEC в Грозном, Чечне и СКФО: алюминиевые фасады ALUTECH, порталы SL160, немецкие окна KBE и KÖMMERLING со стеклом AGC.",
  ogTitle: "CORTEC (г. Грозный) — Архитектурное остекление в ЧР и на Северном Кавказе: ALUTECH, KBE, KÖMMERLING, AGC",
  ogDescription: "Стоечно-ригельные и структурные фасады ALUTECH, немецкие профильные системы KBE и KÖMMERLING, мультифункциональное стекло AGC в Чеченской Республике и соседних регионах СКФО.",
  twitterDescription: "Проектирование КМ/КМД и реализация фасадного и панорамного остекления ALUTECH, KBE, KÖMMERLING и AGC в Грозном и СКФО.",
  preloadImg: 'hero-volumetric-node',
  schemaJson: buildHomePageSchema(),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- SCREEN 1: FULLSCREEN HERO SCENE -->
    <section class="hero-viewport" aria-label="Архитектурное остекление CORTEC">
      <div class="hero-media-wrap">
        <img src="assets/img/hero-volumetric-node.avif" srcset="assets/img/hero-volumetric-node-sm.avif 688w, assets/img/hero-volumetric-node.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Объемный угловой узел алюминиевого стоечно-ригельного фасада ALUTECH с двухкамерным стеклопакетом и теплым светом" title="Фасадное и панорамное остекление CORTEC на базе систем ALUTECH, KBE, KÖMMERLING и стекла AGC" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <span class="eyebrow">Светопрозрачная инженерия · ALUTECH · KBE · KÖMMERLING · AGC</span>
          <h1>
            Архитектура света.<br>
            <span class="halftone">Инженерия тишины.</span>
          </h1>
          <p class="lead-paragraph">
            Мы проектируем и создаем светопрозрачные оболочки современной архитектуры. В основе нашей работы — точное владение системами <a href="${prefix}alutech.html" class="text-link">архитектурного алюминия ALUTECH</a>, немецкими профильными технологиями <a href="${prefix}kbe.html" class="text-link">KBE</a> и <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a>, а также селективной оптикой <a href="${prefix}agc.html" class="text-link">AGC (Asahi Glass Co.)</a>.
          </p>
          <div class="btn-group">
            <a href="#brands-pavilion" class="btn-sand">Технологические бренды</a>
            <a href="${prefix}contact.html" class="btn-oval">Запросить расчет проекта</a>
          </div>
          <nav class="quiet-anchor-rail" aria-label="Быстрый переход к разделам экспозиции">
            <a href="#brands-pavilion">Технологические бренды</a>
            <a href="#macro-frame-heading">Фасады ALUTECH</a>
            <a href="#macro-glass-heading">Стекло AGC</a>
            <a href="#macro-kommerling-heading">KÖMMERLING 88</a>
            <a href="#macro-kbe-heading">Системы KBE</a>
            <a href="#engineering-notes-heading">Критерии выбора</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- SCREEN 2: INTERACTIVE BRAND LOGOS PAVILION (CLICKING EACH LOGO OPENS COMPANY HISTORY ON OUR SITE) -->
    <section class="section-space-lg brands-pavilion-section" id="brands-pavilion" aria-labelledby="brands-pavilion-heading">
      <div class="container">
        <div class="stagger-row reveal" style="margin-bottom: clamp(64px, 8vw, 108px);">
          <div class="stagger-left">
            <span class="eyebrow">Индустриальный альянс · История и технологии</span>
            <h2 id="brands-pavilion-heading">
              Четыре мировых бренда.<br>
              <span class="halftone">Нажмите на логотип, чтобы открыть историю и инженерию компании.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              Долговечность панорамного фасада рождается на стыке металлургии, полимерной химии и вакуумной оптики. В нашей экспозиции собраны четыре системообразующих производителя: нажмите на знак любого бренда, чтобы перейти к его истории и полному каталогу технологий на сайте CORTEC.
            </p>
          </div>
        </div>

        ${renderBrandShowcase(prefix)}
      </div>
    </section>

    <!-- SCREEN 3: APEX-STYLE STAGGERED EDITORIAL RHYTHM -->
    <section class="section-space" aria-labelledby="philosophy-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Философия материи</span>
            <h2 id="philosophy-heading">
              Ничего лишнего.<br>
              <span class="halftone">Только статика, теплотехника и чистая линия горизонта.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-right">
            <p class="lead-paragraph">
              <a href="${prefix}about.html" class="text-link">Команда CORTEC</a> объединяет инженеров-конструкторов КМ и КМД, технологов и мастеров шеф-монтажа с многолетним опытом реализации сложных фасадных и оконных проектов. Мы не придумываем компромиссных кустарных решений — мы профессионально работаем с сертифицированными профильными и стекольными платформами, раскрывая их проектный ресурс на сто процентов.
            </p>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <p class="body-paragraph">
              Когда со здания исчезает визуальный шум, на первый план выходят пропорции переплета, глубина посадки стекла в фальц, тень в примыкании и плавность хода тяжелой панорамной створки. Поэтому наша экспозиция построена вокруг самого главного — безупречно исполненного узла, <a href="${prefix}elements.html" class="text-link">тактильности скрытой фурнитуры и оптической чистоты многослойного стеклопакета AGC</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SCREEN 4-9: CONTINUOUS MACRO SCROLL SEQUENCE (ALUTECH -> HANDLE -> GLASS -> KBE -> KÖMMERLING -> AGC) -->
    <div class="macro-scroll-sequence">

      <!-- MACRO STAGE 1: FRAME & THERMAL NODE (ALUTECH) -->
      <section class="macro-stage" aria-labelledby="macro-frame-heading">
        <div class="macro-stage-media">
          <img src="assets/img/alutech-facade-node.avif" srcset="assets/img/alutech-facade-node-sm.avif 688w, assets/img/alutech-facade-node.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Макро-план примыкания стойки и ригеля алюминиевого фасада ALUTECH в темном анодированном графите" title="Стоечно-ригельное и структурное остекление фасадов ALUTECH" loading="lazy" decoding="async">
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-left reveal">
            <span class="eyebrow">Элемент I · Архитектурный алюминий ALUTECH</span>
            <h2 id="macro-frame-heading">
              Стоечно-ригельный узел.<br>
              <span class="halftone">Непрерывный терморазрыв и скрытая дренажная каскада.</span>
            </h2>
            <p class="body-paragraph">
              В <a href="${prefix}alutech.html#stoechno-rigelnye-fasady" class="text-link">фасадных и оконно-дверных системах ALUTECH</a> жесткость экструдированного алюминиевого сплава сочетается с многокамерными полиамидными термомостами, армированными стекловолокном. Принцип поэтапного перекрытия дренажных контуров и вентиляции фальца стеклопакета исключает промерзание и накопление конденсата даже при экстремальных ветровых и температурных нагрузках.
            </p>
          </div>
        </div>
      </section>

      <!-- MACRO STAGE 2: HANDLE & CONCEALED KINEMATICS -->
      <section class="macro-stage" aria-labelledby="macro-handle-heading">
        <div class="macro-stage-media">
          <img src="assets/img/minimalist-window-handle.avif" srcset="assets/img/minimalist-window-handle-sm.avif 688w, assets/img/minimalist-window-handle.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Минималистичная безрозеточная темная оконная ручка на матовом графитовом профиле" title="Минималистичные оконные ручки и скрытая фурнитура CORTEC" loading="lazy" decoding="async">
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-left reveal">
            <span class="eyebrow">Элемент II · Тактильная кинематика</span>
            <h2 id="macro-handle-heading">
              Прикосновение к форме.<br>
              <span class="halftone">Скрытая фурнитура и выверенное усилие поворота.</span>
            </h2>
            <p class="body-paragraph">
              Алюминиевое окно или <a href="${prefix}alutech.html#razdvizhnye-resheniya" class="text-link">подъемно-сдвижной портал</a> воспринимается через движение. Мы комплектуем конструкции <a href="${prefix}elements.html#furnitura-i-ruchki" class="text-link">скрытыми петлевыми группами</a>, интегрированными в фурнитурный паз без нарушения контура уплотнения, и минималистичными безрозеточными ручками в глубоком анодированном или матовом графитовом исполнении.
            </p>
          </div>
        </div>
      </section>

      <!-- MACRO STAGE 3: AGC ARCHITECTURAL GLASS -->
      <section class="macro-stage macro-stage--text-right" aria-labelledby="macro-glass-heading">
        <div class="macro-stage-media">
          <img src="assets/img/agc-stopray-glass.avif" srcset="assets/img/agc-stopray-glass-sm.avif 688w, assets/img/agc-stopray-glass.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Макросъемка торца просветленного стекла AGC Planibel Clearvision и мультифункционального покрытия Stopray" title="Архитектурное стекло AGC Stopray, Planibel Clearvision и триплекс Stratophone" loading="lazy" decoding="async">
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-right reveal">
            <span class="eyebrow">Элемент III · Оптическая физика AGC (Asahi Glass Co.)</span>
            <h2 id="macro-glass-heading">
              Кристальный торец AGC.<br>
              <span class="halftone">Магнетронное серебро Stopray и акустика Stratophone.</span>
            </h2>
            <p class="body-paragraph">
              Стекло занимает до 88% площади фасада. В партнерстве со стекольным концерном <a href="${prefix}agc.html" class="text-link">AGC (Asahi Glass Co.)</a> мы применяем ультрапрозрачное низкожелезистое стекло <a href="${prefix}agc.html#clearvision" class="text-link">Planibel Clearvision</a>, высокоселективные покрытия с двойным и тройным серебром <a href="${prefix}agc.html#stopray" class="text-link">Stopray Vision / Titanium</a> и звукоизоляционный триплекс <a href="${prefix}agc.html#stratophone" class="text-link">Stratophone</a>, гасящий низкочастотный шум города.
            </p>
          </div>
        </div>
      </section>

      <!-- MACRO STAGE 4: KÖMMERLING HYBRID ALUCLIP ZERO -->
      <section class="macro-stage" aria-labelledby="macro-kommerling-heading">
        <div class="macro-stage-media">
          <img src="assets/img/kommerling-aluclip-node.avif" srcset="assets/img/kommerling-aluclip-node-sm.avif 688w, assets/img/kommerling-aluclip-node.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Гибридный немецкий профиль KÖMMERLING AluClip Zero с анодированной алюминиевой накладкой и графитовым ядром" title="Немецкие профильные системы KÖMMERLING 88, AluClip Zero и proCoverTec" loading="lazy" decoding="async">
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-left reveal">
            <span class="eyebrow">Элемент IV · Немецкий гибрид KÖMMERLING</span>
            <h2 id="macro-kommerling-heading">
              Синтез полимера и алюминия.<br>
              <span class="halftone">KÖMMERLING 88, AluClip Zero и покрытие proCoverTec.</span>
            </h2>
            <p class="body-paragraph">
              В системах старейшего немецкого бренда <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a> (основан в 1897 году в Пирмазенсе) 7-камерная теплотехника пассивного дома соединяется со внешней броней из анодированного алюминия <a href="${prefix}kommerling.html#aluclip-zero" class="text-link">AluClip Zero</a>, выведенной в единую компланарную плоскость со стеклом, и коэкструзионным сатиновым покрытием <a href="${prefix}kommerling.html#procovertec" class="text-link">proCoverTec</a>.
            </p>
          </div>
        </div>
      </section>

      <!-- MACRO STAGE 5: MONUMENTAL KBE PROFILE -->
      <section class="macro-stage macro-stage--text-right" aria-labelledby="macro-kbe-heading">
        <div class="macro-stage-media">
          <img src="assets/img/kbe-graphite-profile.avif" srcset="assets/img/kbe-graphite-profile-sm.avif 688w, assets/img/kbe-graphite-profile.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Строгий темный многокамерный профиль KBE в антрацитовой ламинации с трехконтурным уплотнением" title="Немецкие профильные системы KBE в темной ламинации" loading="lazy" decoding="async">
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-right reveal">
            <span class="eyebrow">Элемент V · Берлинская школа KBE</span>
            <h2 id="macro-kbe-heading">
              Монолитный контур KBE.<br>
              <span class="halftone">Архитектурный графит, статика и рецептура greenline.</span>
            </h2>
            <p class="body-paragraph">
              Современные <a href="${prefix}kbe.html" class="text-link">оконно-дверные системы KBE</a> в исполнении CORTEC далеки от бытового пластика. Строгая геометрия профиля 76 и 88 мм по бессвинцовой технологии <em>greenline</em>, замкнутое стальное армирование, коэкструдированные черные EPDM-уплотнители и <a href="${prefix}kbe.html#laminaciya-i-otdelka" class="text-link">матовая ламинация на темной основе</a> превращают окно в строгий архитектурный монолит.
            </p>
          </div>
        </div>
      </section>

    </div>

    <!-- SCREEN 7: FOUR TECHNOLOGICAL PILLARS (NO CARDS, PURE STAGGERED TEXT) -->
    <section class="section-space-lg" aria-labelledby="directions-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Инженерный фундамент CORTEC</span>
            <h2 id="directions-heading">
              Четыре технологические школы.<br>
              <span class="halftone">Единый стандарт точности.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <h3 class="stagger-item-title">
              Архитектурный алюминий ALUTECH<br>
              <span class="halftone">Фасады, витражи, порталы и окна</span>
            </h3>
            <p class="body-paragraph">
              Решения для большой архитектуры и панорамных проемов: <a href="${prefix}alutech.html#stoechno-rigelnye-fasady" class="text-link">стоечно-ригельное</a> и <a href="${prefix}alutech.html#strukturnoe-osteklenie" class="text-link">структурное остекление</a> со скрытым креплением стеклопакета, крупноформатные подъемно-сдвижные системы ALT SL160 и теплые серии с терморазрывом.
            </p>
            <div class="btn-group">
              <a href="${prefix}alutech.html" class="btn-oval">История и системы ALUTECH</a>
            </div>
          </div>

          <div class="stagger-right">
            <h3 class="stagger-item-title">
              Немецкие системы KÖMMERLING и KBE<br>
              <span class="halftone">Гибриды AluClip Zero и теплотехника 76 / 88 мм</span>
            </h3>
            <p class="body-paragraph">
              Премиальные немецкие платформы концерна profine Group: компланарные дерево- и полимер-алюминиевые системы <a href="${prefix}kommerling.html#aluclip-zero" class="text-link">KÖMMERLING AluClip Zero</a>, покрытие <a href="${prefix}kommerling.html#procovertec" class="text-link">proCoverTec</a>, порталы PremiDoor Lux и энергоэффективные графитовые системы <a href="${prefix}kbe.html" class="text-link">KBE greenline</a>.
            </p>
            <div class="btn-group">
              <a href="${prefix}kommerling.html" class="btn-oval">KÖMMERLING</a>
              <a href="${prefix}kbe.html" class="btn-oval">Системы KBE</a>
            </div>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <h3 class="stagger-item-title">
              Архитектурное стекло AGC (Asahi Glass Co.)<br>
              <span class="halftone">Stopray, Planibel Clearvision и Stratophone</span>
            </h3>
            <p class="body-paragraph">
              Индивидуальное проектирование формул стеклопакетов на базе стекол мирового лидера <a href="${prefix}agc.html" class="text-link">AGC</a>: магнетронное напыление двойного и тройного серебра <a href="${prefix}agc.html#stopray" class="text-link">Stopray</a>, абсолютно прозрачное низкожелезистое стекло <a href="${prefix}agc.html#clearvision" class="text-link">Planibel Clearvision</a> и акустический триплекс <a href="${prefix}agc.html#stratophone" class="text-link">Stratophone</a>.
            </p>
            <div class="btn-group">
              <a href="${prefix}agc.html" class="btn-oval">История и стекло AGC</a>
            </div>
          </div>

          <div class="stagger-right">
            <h3 class="stagger-item-title">
              Скрытая кинематика и узлы примыкания<br>
              <span class="halftone">Фурнитура, EPDM и монтаж по ГОСТ</span>
            </h3>
            <p class="body-paragraph">
              Комплектация панорамных створок <a href="${prefix}elements.html#furnitura-i-ruchki" class="text-link">скрытолежащими петлевыми группами</a> грузоподъемностью до 400 кг, безрозеточными ручками, композитными дистанционными рамками Warm Edge и трехслойным изотермическим узлом примыкания.
            </p>
            <div class="btn-group">
              <a href="${prefix}elements.html" class="btn-oval">Инженерные элементы</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SCREEN 8: APEX 5-STRIP VERTICAL GALLERY OF DETAILS -->
    <section class="apex-gallery-section" aria-labelledby="gallery-heading">
      <div class="container reveal" style="margin-bottom: 72px;">
        <span class="eyebrow">Экспозиция деталей</span>
        <h2 id="gallery-heading">
          Культура сопряжения.<br>
          <span class="halftone">Пять граней светопрозрачной конструкции.</span>
        </h2>
      </div>

      <div class="apex-five-strip reveal">
        <div class="apex-strip-item">
          <img src="assets/img/detail-01-frame.avif" srcset="assets/img/detail-01-frame-sm.avif 424w, assets/img/detail-01-frame.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Угловое соединение темной анодированной алюминиевой рамы ALUTECH" title="Угловой стык алюминиевого оконного профиля ALUTECH" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-02-glass.avif" srcset="assets/img/detail-02-glass-sm.avif 424w, assets/img/detail-02-glass.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Структурное фасадное остекление с минимальным видимым швом в холодном стальном оттенке" title="Структурное остекление фасадов без наружных прижимных планок" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-03-hardware.avif" srcset="assets/img/detail-03-hardware-sm.avif 424w, assets/img/detail-03-hardware.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Скрытый запорный механизм и прецизионная фурнитура внутри темного оконного профиля" title="Скрытая оконная фурнитура и многозапорные механизмы" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-04-profile.avif" srcset="assets/img/detail-04-profile-sm.avif 424w, assets/img/detail-04-profile.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Терморазрыв из полиамида и контур уплотнения EPDM в профильной системе" title="Полиамидный термомост и уплотнители EPDM в системах ALUTECH" loading="lazy" decoding="async">
        </div>
        <div class="apex-strip-item">
          <img src="assets/img/detail-05-junction.avif" srcset="assets/img/detail-05-junction-sm.avif 424w, assets/img/detail-05-junction.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Беспороговое примыкание раздвижного панорамного портала к каменному полу с мягкой подсветкой" title="Подъемно-сдвижной портал с порогом в уровень чистого пола" loading="lazy" decoding="async">
        </div>
      </div>

      <div class="apex-gallery-Invite reveal">
        <p>
          Изучите инженерные характеристики каждого компонента или передайте нам архитектурный проект для расчета статики и теплотехники.
        </p>
        <a href="${prefix}elements.html" class="btn-oval">Знакомство с элементами</a>
      </div>
    </section>

    <!-- SCREEN 9: ORGANIC EDITORIAL ENGINEERING ANSWERS (FEEDS FAQ SCHEMA WITHOUT VISUAL NOISE) -->
    <section class="section-space" aria-labelledby="engineering-notes-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Инженерный регламент</span>
            <h2 id="engineering-notes-heading">
              Критерии выбора системы.<br>
              <span class="halftone">Сочетание алюминия и полимерных профилей в проекте.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <h3 class="stagger-item-title">Разделение задач между ALUTECH и KBE</h3>
            <p class="body-paragraph">
              Выбор между алюминиевыми и ПВХ-системами определяется статикой проема и сценарием эксплуатации помещения. <a href="${prefix}alutech.html" class="text-link">Алюминиевые системы ALUTECH</a> незаменимы при проектировании большепролетных стоечно-ригельных витражей, структурных фасадов и широкоформатных подъемно-сдвижных порталов с минимальной видимой шириной рамы. <a href="${prefix}kbe.html" class="text-link">Немецкие системы KBE</a> обеспечивают выдающуюся камерную теплоизоляцию и акустический покой в жилых зонах при более камерных габаритах створок.
            </p>
          </div>
          <div class="stagger-right">
            <h3 class="stagger-item-title">Комбинированное остекление единого архитектурного ансамбля</h3>
            <p class="body-paragraph">
              В частных резиденциях мы часто применяем комбинированный подход: фасадные витражи двусветной гостиной, входные группы и террасные порталы создаются из теплого алюминия ALUTECH, а окна спален и кабинетов — из многокамерного профиля KBE в идентичном матовом графитовом или антрацитовом покрытии. Единая формула <a href="${prefix}elements.html" class="text-link">мультифункциональных стеклопакетов</a> объединяет все фасады здания в цельную композицию.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
  }
};
