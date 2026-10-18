const { buildSystemWebPageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'kommerling',
  file: 'kommerling.html',
  title: "Окна KÖMMERLING 88, AluClip Zero и PremiDoor в Грозном | CORTEC",
  description: "Немецкие профильные системы KÖMMERLING в Грозном, Чеченской Республике и СКФО: 7-камерные окна 88 мм, алюминиевые накладки AluClip Zero, покрытие proCoverTec и раздвижные порталы PremiDoor Lux.",
  ogTitle: "Системы KÖMMERLING — 88 мм и AluClip Zero в Грозном и на Северном Кавказе | CORTEC",
  ogDescription: "Более 125 лет немецкой инженерии KÖMMERLING в проектах CORTEC (Грозный): 7-камерные системы 88 мм, накладки AluClip Zero и порталы PremiDoor Lux.",
  twitterDescription: "Флагманские немецкие системы KÖMMERLING 76 / 88, AluClip Zero и PremiDoor Lux в Грозном и СКФО.",
  preloadImg: 'kommerling-aluclip-node',
  schemaJson: buildSystemWebPageSchema({
    file: 'kommerling.html',
    name: 'Системы KÖMMERLING — Немецкие окна, AluClip Zero и порталы PremiDoor | CORTEC',
    description: 'История немецкого концерна KÖMMERLING с 1897 года и полный цикл технологий: системы KÖMMERLING 88, 76, гибридные накладки AluClip Zero, покрытие proCoverTec и подъемно-сдвижные порталы PremiDoor.',
    breadcrumbLabel: 'Системы KÖMMERLING'
  }),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- HERO SCENE: KÖMMERLING ALUCLIP ZERO -->
    <section class="hero-viewport">
      <div class="hero-media-wrap">
        <img
          src="assets/img/kommerling-aluclip-node.avif" srcset="assets/img/kommerling-aluclip-node-sm.avif 688w, assets/img/kommerling-aluclip-node.avif 1376w" sizes="100vw"
          alt="Гибридный немецкий профиль KÖMMERLING AluClip Zero с анодированной алюминиевой накладкой и графитовым ядром"
          width="1344"
          height="768"
          fetchpriority="high"
        >
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Системы KÖMMERLING</span>
          </nav>
          <span class="eyebrow">Пирмазенс, Германия · Основан в 1897 году</span>
          <h1>
            Системы KÖMMERLING.<br>
            <span class="halftone">Синтез немецкой полимерной химии и архитектурного алюминия.</span>
          </h1>
          <p class="lead-paragraph">
            Флагманский бренд немецкого концерна profine Group с более чем 125-летней инженерной историей. Семикамерная теплотехника пассивного дома, компланарные алюминиевые оклады AluClip Zero, коэкструзионное покрытие proCoverTec и панорамные порталы PremiDoor Lux.
          </p>
          <nav class="quiet-anchor-rail" aria-label="Разделы страницы KÖMMERLING">
            <a href="#history">История с 1897 г.</a>
            <a href="#kommerling-88">Система 88 мм</a>
            <a href="#aluclip-zero">AluClip Zero</a>
            <a href="#procovertec">proCoverTec</a>
            <a href="#premidoor">Порталы PremiDoor Lux</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- HISTORY OF KÖMMERLING (1897 — PRESENT) -->
    <section class="section-space-lg" id="history">
      <div class="container">
        <div class="stagger-row reveal" style="margin-bottom: clamp(80px, 10vw, 130px);">
          <div class="stagger-left">
            <span class="eyebrow">История компании · 1897 – 2026</span>
            <h2>
              От лаборатории Карла Кёммерлинга<br>
              <span class="halftone">до эталона гибридной архитектуры Европы.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              История марки началась в 1897 году в немецком городе Пирмазенс (земля Рейнланд-Пфальц), когда Карл Кёммерлинг основал предприятие по разработке высокопрочных синтетических адгезивов и полимерных компаундов. Собственная научная база в области химии высокомолекулярных соединений позволила компании задолго до конкурентов приступить к экструзии сложных конструкционных пластиков.
            </p>
          </div>
        </div>

        <div class="editorial-stagger">
          <article class="stagger-row reveal">
            <div class="stagger-left">
              <span class="eyebrow">1897 — 1957</span>
              <h3 class="stagger-item-title">Зарождение немецкой полимерной школы в Пирмазенсе</h3>
              <p class="body-paragraph">
                На протяжении первой половины XX века лаборатории KÖMMERLING в Пирмазенсе создавали синтетические эластомеры, герметики и клеящие составы для европейской промышленности. Глубокое понимание молекулярной стойкости полимеров к ультрафиолету, перепадам температур и статическому старению заложило фундамент для будущего прорыва в архитектурном остеклении.
              </p>
            </div>
            <div class="stagger-right">
              <span class="eyebrow">1967 — 1990-е</span>
              <h3 class="stagger-item-title">Первая экструзия оконного профиля и захват лидерства в Европе</h3>
              <p class="body-paragraph">
                В 1967 году с заводской линии в Пирмазенсе сошел первый серийный оконный профиль KÖMMERLING. Компания одной из первых в мире внедрила многокамерное строение рамы, ударновязкие модификаторы для сурового климата и систему высокоточного контроля геометрии фильер, превратившись в синоним бескомпромиссного немецкого оконного инжиниринга.
              </p>
            </div>
          </article>

          <article class="stagger-row reveal">
            <div class="stagger-left">
              <span class="eyebrow">2003 — 2015</span>
              <h3 class="stagger-item-title">Флагман концерна profine Group и экологическая формула greenline</h3>
              <p class="body-paragraph">
                В 2003 году KÖMMERLING стал премиальным ядром международного концерна profine GmbH. Инженеры бренда полностью исключили свинец из стабилизаторов ПВХ, перейдя на экологически чистое кальций-цинковое соединение (CaZn), которое повысило долговечность профиля до 50 лет и придало поверхности благородный шелковисто-матовый оптический тон.
              </p>
            </div>
            <div class="stagger-right">
              <span class="eyebrow">Современная эра</span>
              <h3 class="stagger-item-title">Коэкструзия proCoverTec и компланарный дизайн AluClip Zero</h3>
              <p class="body-paragraph">
                Сегодня завод KÖMMERLING в Пирмазенсе — один из крупнейших и самых технологичных экструзионных центров мира. Бренд стер границу между полимерными и алюминиевыми системами, выпустив гибридную платформу AluClip Zero (створка и рама в одной фасадной плоскости) и коэкструзионное защитное покрытие proCoverTec.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE 2: PREMIDOOR LUX -->
    <section class="macro-scroll-sequence">
      <article class="macro-stage macro-stage--text-right" id="premidoor">
        <div class="macro-stage-media">
          <img
            src="assets/img/kommerling-premidoor-node.avif" srcset="assets/img/kommerling-premidoor-node-sm.avif 688w, assets/img/kommerling-premidoor-node.avif 1376w" sizes="100vw"
            alt="Низкий безбарьерный порог и узкий переплет портала KÖMMERLING PremiDoor 76 и 88 Lux"
            width="1344"
            height="768"
            loading="lazy"
          >
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-right reveal">
            <span class="eyebrow">Панорамные порталы · PremiDoor 76 / 88 Lux</span>
            <h2>
              Архитектура узкого переплета.<br>
              <span class="halftone">PremiDoor Lux и безбарьерный горизонт.</span>
            </h2>
            <p class="body-paragraph">
              В модификации PremiDoor Lux инженеры KÖMMERLING отказались от массивного профиля в глухой части портала, заменив его прямым наружным остеклением через алюминиевый штапик. Видимая ширина переплета снижена до 40 мм, а конструкции шириной до 6,5 метров и высотой до 2,9 метра открывают террасу одним плавным скольжением.
            </p>
          </div>
        </div>
      </article>
    </section>

    <!-- TECHNOLOGIES OF KÖMMERLING -->
    <section class="section-space-lg" id="technologies">
      <div class="container">
        <div class="stagger-row reveal" style="margin-bottom: clamp(80px, 10vw, 130px);">
          <div class="stagger-left">
            <span class="eyebrow">Инженерный каталог · Технологии KÖMMERLING</span>
            <h2>
              Ключевые системы<br>
              <span class="halftone">и технологические платформы бренда.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              CORTEC проектирует и комплектует объекты на базе старших архитектурных серий KÖMMERLING в сочетании с мультифункциональными стеклопакетами <a href="${prefix}agc.html" class="text-link">AGC Stopray и Planibel Clearvision</a> и алюминиевыми фасадами <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>.
            </p>
          </div>
        </div>

        <div class="editorial-stagger">
          <!-- 1 & 2 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="kommerling-88">
              <span class="eyebrow">01 · Пассивный дом</span>
              <h3 class="stagger-item-title">Семикамерная платформа KÖMMERLING 88 (MD)</h3>
              <p class="body-paragraph">
                Интеллектуальная 7-камерная система с монтажной глубиной 88 мм и тремя контурами высокоэластичного уплотнения (средний контур с тепловым лепестком). Позволяет устанавливать сверхтеплые двухкамерные стеклопакеты толщиной до 58 мм с акустическим триплексом, обеспечивая стандарт пассивного дома уже в базовой комплектации.
              </p>
            </div>
            <div class="stagger-right" id="kommerling-76">
              <span class="eyebrow">02 · Архитектурный баланс</span>
              <h3 class="stagger-item-title">Системы KÖMMERLING 76 AD и 76 MD</h3>
              <p class="body-paragraph">
                Пяти- и шестикамерные системы глубиной 76 мм с уменьшенной высотой видимого переплета. При узких световых гранях рамы и створки конструкция сохраняет высокую моментную жесткость и принимает энергоэффективное заполнение толщиной до 50 мм, пропуская в интерьер максимум естественного дневного света.
              </p>
            </div>
          </article>

          <!-- 3 & 4 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="aluclip-zero">
              <span class="eyebrow">03 · Компланарный гибрид</span>
              <h3 class="stagger-item-title">AluClip Zero, AluClip и AddOn со встроенными жалюзи</h3>
              <p class="body-paragraph">
                Дизайнерская система накладок из анодированного и порошково-окрашенного алюминия. В серии AluClip Zero створка и рама выведены в единую компланарную плоскость без выступающих перепадов (включая модификацию со вклеенным заподлицо стеклом), а версия AddOn интегрирует межстекольные солнцезащитные ламели и дополнительный контур шумоизоляции.
              </p>
            </div>
            <div class="stagger-right" id="procovertec">
              <span class="eyebrow">04 · Коэкструзия цвета</span>
              <h3 class="stagger-item-title">Защитно-функциональное покрытие proCoverTec</h3>
              <p class="body-paragraph">
                Разработанная в Пирмазенсе технология жидкофазной коэкструзии тонкослойного функционального полимера поверх профиля. Создает благородную матовую поверхность с металлизированным сатиновым отливом, которая отражает инфракрасное солнечное излучение, препятствует нагреву темных рам и обладает грязеотталкивающим гидрофобным эффектом.
              </p>
            </div>
          </article>

          <!-- 5 & 6 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="premislide">
              <span class="eyebrow">05 · Сдвижная кинематика</span>
              <h3 class="stagger-item-title">Портальные системы PremiDoor 76/88 и PremiSlide 76</h3>
              <p class="body-paragraph">
                Полная линейка панорамных раздвижных решений: от подъемно-сдвижных порталов PremiDoor 88 для проемов шириной до 6,5 метров с весом створки до 400 кг до компактной сдвижной системы PremiSlide 76 с интеллектуальным доводчиком кареток и герметичным прижимом по всему периметру.
              </p>
            </div>
            <div class="stagger-right" id="gluing-tech">
              <span class="eyebrow">06 · Статика и вклейка</span>
              <h3 class="stagger-item-title">Структурная вклейка стеклопакета и темные профили в массе</h3>
              <p class="body-paragraph">
                Для создания панорамных створок от пола до потолка в темных оттенках антрацита, базальта и черного обсидиана применяется периметральная вклейка стеклопакета в фальц створки. Жесткий диск стекла работает совместно с замкнутым стальным армированием, полностью исключая провисание и температурные деформации.
              </p>
            </div>
          </article>
        </div>

        <div class="apex-gallery-Invite reveal">
          <p>
            Передайте архитектурные планы вашего дома или коммерческого объекта — наши инженеры подготовят расчет систем KÖMMERLING в комплектации со стеклом AGC.
          </p>
          <a href="${prefix}contact.html" class="btn-sand">Запросить расчет KÖMMERLING</a>
        </div>
      </div>
    </section>
  `;
  }
};
