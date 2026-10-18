const { buildServicePageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'kbe',
  file: 'kbe.html',
  title: "Немецкие окна KBE 76 greenline в Грозном и Чечне | CORTEC",
  description: "Инженерные оконно-дверные ПВХ-системы KBE от CORTEC в Грозном, Чеченской Республике и СКФО: профили KBE 76 greenline без свинца в графитовой ламинации, армирование 2 мм и вклейка стеклопакета.",
  ogTitle: "Немецкие окна KBE — Инженерные ПВХ-системы в Грозном и ЧР | CORTEC",
  ogDescription: "Строгая геометрия KBE 76 greenline без свинца, темная графитовая ламинация, стальное армирование 2 мм и вклейка стеклопакетов в проектах CORTEC (Грозный).",
  twitterDescription: "Многокамерные немецкие окна KBE greenline в темных архитектурных тонах в Грозном, Чечне и СКФО.",
  preloadImg: 'kbe-graphite-profile',
  schemaJson: buildServicePageSchema({
    file: 'kbe.html',
    serviceName: 'Немецкие окна KBE — Проектирование и установка в Грозном и ЧР',
    serviceType: 'Энергоэффективные и шумоизоляционные оконно-дверные ПВХ-системы KBE',
    description: 'Инженерный расчет, изготовление и монтаж 12 категорий немецких оконно-дверных ПВХ-систем KBE по технологии greenline в темной архитектурной ламинации.',
    catalogName: 'Категории оконно-дверных конструкций KBE в CORTEC',
    offers: [
      { name: 'Пластиковые окна KBE в архитектурном исполнении', anchor: 'plastikovye-okna' },
      { name: 'Оконно-дверные ПВХ-системы KBE', anchor: 'okonno-dvernye-pvh-sistemy' },
      { name: 'Профильные решения различной монтажной глубины', anchor: 'montazhnaya-glubina' },
      { name: 'Энергоэффективные конструкции KBE', anchor: 'energoeffektivnye-konstrukcii' },
      { name: 'Шумоизоляционные решения с акустическим триплексом', anchor: 'shumoizolyacionnye-resheniya' },
      { name: 'Варианты энергосберегающих и мультифункциональных стеклопакетов', anchor: 'varianty-steklopaketov' },
      { name: 'Цветовые и декоративные решения профиля в массе', anchor: 'cvetovye-resheniya' },
      { name: 'Архитектурная ламинация и варианты отделки', anchor: 'laminaciya-i-otdelka' },
      { name: 'Раздвижные системы KBE для террас и веранд', anchor: 'razdvizhnye-sistemy-kbe' },
      { name: 'Большие оконные конструкции со статической вклейкой стеклопакета', anchor: 'bolshie-okonnye-konstrukcii' },
      { name: 'Внутрипрофильные вентиляционные решения', anchor: 'ventilyacionnye-resheniya' },
      { name: 'Решения с дополнительными функциями безопасности', anchor: 'funkcii-bezopasnosti' }
    ],
    faq: [
      {
        q: 'В чем заключается технология KBE greenline?',
        a: 'Технология greenline — разработанная немецким концерном KBE экологичная рецептура стабилизации ПВХ-профиля без использования солей свинца, замененных на безопасное соединение кальций-цинк (CaZn). Профили greenline устойчивы к ультрафиолету, перепадам температур и обладают благородной матовой шелковистой поверхностью.'
      },
      {
        q: 'Как обеспечивается жесткость больших створок в темной ламинации KBE?',
        a: 'Для крупногабаритных и темных ламинированных створок KBE инженеры CORTEC применяют оцинкованное замкнутое стальное армирование увеличенного сечения, технологию статической вклейки стеклопакета по периметру фальца створки и наружные пленки, отражающие инфракрасный спектр солнечного излучения.'
      }
    ],
    breadcrumbLabel: 'Немецкие окна KBE'
  }),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- SCREEN 1: FULLSCREEN HERO FOR KBE -->
    <section class="hero-viewport hero-viewport--right" aria-label="Немецкие профильные системы KBE">
      <div class="hero-media-wrap">
        <img src="assets/img/kbe-graphite-profile.avif" srcset="assets/img/kbe-graphite-profile-sm.avif 688w, assets/img/kbe-graphite-profile.avif 1376w" sizes="100vw" width="1344" height="768" alt="Инженерный разрез многокамерного профиля KBE в темной графитовой ламинации с двухкамерным стеклопакетом" title="Немецкие профильные оконно-дверные системы KBE в темной ламинации" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Немецкие окна KBE</span>
          </nav>
          <span class="eyebrow">Берлин, Германия · Основан в 1980 году</span>
          <h1>
            Немецкие окна KBE.<br>
            <span class="halftone">Монументальная теплотехника в строгом графитовом контуре.</span>
          </h1>
          <p class="lead-paragraph">
            CORTEC раскрывает немецкие полимерные профильные системы KBE как высокоточный архитектурный инструмент. Вместо компромиссных шаблонов — строгие прямолинейные грани, темная матовая фактура в массе, замкнутое стальное армирование, экологичная рецептура <em>greenline</em> и максимальная защита дома от холода и городского шума.
          </p>
          <div class="btn-group">
            <a href="${prefix}contact.html" class="btn-sand">Подобрать конфигурацию KBE</a>
            <a href="${prefix}kommerling.html" class="btn-oval">Системы KÖMMERLING</a>
          </div>
          <nav class="quiet-anchor-rail" aria-label="Категории оконно-дверных систем KBE">
            <a href="#history">История с 1980 г.</a>
            <a href="#plastikovye-okna">Пластиковые окна</a>
            <a href="#montazhnaya-glubina">Монтажная глубина</a>
            <a href="#energoeffektivnye-konstrukcii">Энергоэффективность</a>
            <a href="#shumoizolyacionnye-resheniya">Шумоизоляция</a>
            <a href="#laminaciya-i-otdelka">Темная ламинация</a>
            <a href="#razdvizhnye-sistemy-kbe">Раздвижные системы</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- HISTORY OF KBE (BERLIN, 1980 — PRESENT) -->
    <section class="section-space-lg" id="history" aria-labelledby="kbe-history-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">История компании · 1980 – 2026</span>
            <h2 id="kbe-history-heading">
              Берлинская школа экструзии.<br>
              <span class="halftone">От индустриальных пластиков до революции greenline.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              Марка KBE (Kunststoffproduktion für Bau und Elektrotechnik — «Производство пластмасс для строительства и электротехники») была основана в 1980 году в Западном Берлине (район Мариенфельде). С первых лет завод сделал ставку на высокоскоростную прецизионную экструзию жесткого конструкционного ПВХ для современной европейской архитектуры.
            </p>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">1985 — 1998 · Инженерный стандарт ГОСТ</span>
            <h3 class="stagger-item-title">Экспансия из Берлина и участие в разработке российских стандартов</h3>
            <p class="body-paragraph">
              Уже к 1990-м годам берлинский завод KBE стал одним из технологических лидеров Европы. Придя на рынок России и стран СНГ в 1995 году, инженеры KBE приняли непосредственное участие в формировании государственных строительных стандартов ГОСТ на оконные блоки и монтажные швы для суровых климатических зон.
            </p>
          </div>
          <div class="stagger-right">
            <span class="eyebrow">2004 — Настоящее время · Эра profine и greenline</span>
            <h3 class="stagger-item-title">Переход на кальций-цинк (CaZn) и платформы 76 / 88 мм</h3>
            <p class="body-paragraph">
              В составе немецкого концерна profine Group бренд KBE совершил экологическую революцию: в 2004 году все заводы полностью отказались от солей свинца в пользу технологии <em>greenline</em> (CaZn). Разработка широкоформатных систем KBE 76 и KBE 88 с темным коэкструдированным ядром позволила применять системы бренда в премиальных частных резиденциях.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOCK 1: ARCHITECTURE OF KBE PROFILE (CATEGORIES 1, 2, 3, 4) -->
    <section class="section-space" aria-labelledby="kbe-physics-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Физика многокамерного профиля</span>
            <h2 id="kbe-physics-heading">
              Строгая геометрия и сбережение тепла.<br>
              <span class="halftone">Технология greenline и системная глубина под климат объекта.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="plastikovye-okna" class="stagger-item-title">Пластиковые окна нового архитектурного стандарта</h3>
            <p class="body-paragraph">
              Современные пластиковые окна на базе немецких систем KBE проектируются по законам минималистичной архитектуры. Узкие видимые переплеты, четкие скосы водоотводящих граней и применение экологичной рецептуры <em>greenline</em> — замена солей свинца на безопасные соединения кальций-цинка (CaZn) — обеспечивают профилю долговечность свыше сорока лет, устойчивость к температурным деформациям и благородную шелковисто-матовую поверхность.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="okonno-dvernye-pvh-sistemy" class="stagger-item-title">Оконно-дверные ПВХ-системы</h3>
            <p class="body-paragraph">
              Комплексные оконно-дверные ПВХ-системы KBE объединяют поворотно-откидные окна, балконные и террасные блоки, а также входные двери с усиленной группой петель и многозапорными замками. Внутри основного профиля располагается камера под оцинкованное стальное армирование замкнутого или сложнопрофилированного сечения, которое берет на себя ветровые и статические нагрузки.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="montazhnaya-glubina" class="stagger-item-title">Решения различной монтажной глубины</h3>
            <p class="body-paragraph">
              Архитектура KBE позволяет варьировать монтажную глубину рамы и створки в зависимости от климатической зоны, толщины наружной стены и требований к теплозащите. Увеличенная системная глубина позволяет увеличить число внутренних изолирующих воздушных камер, разместить третий центральный контур уплотнения и установить сверхтеплые широкие стеклопакеты с глубокой посадкой в фальц, исключающей краевой эффект конденсации.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="energoeffektivnye-konstrukcii" class="stagger-item-title">Энергоэффективные конструкции</h3>
            <p class="body-paragraph">
              Многокамерное строение профиля KBE работает как последовательный каскад тепловых барьеров. Коэкструдированные уплотнители из термоэластопласта и EPDM интегрируются непосредственно в процессе экструзии профиля, обеспечивая непрерывный герметичный контур по всему периметру притвора. Такие энергоэффективные конструкции существенно снижают затраты на отопление зимой и кондиционирование летом, соответствуя стандартам домов с низким энергопотреблением.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE: ACOUSTICS & GLASS -->
    <section class="macro-stage macro-stage--text-right" aria-labelledby="kbe-acoustics-scene-heading">
      <div class="macro-stage-media">
        <img src="assets/img/multilayer-glass-edge.avif" srcset="assets/img/multilayer-glass-edge-sm.avif 688w, assets/img/multilayer-glass-edge.avif 1376w" sizes="100vw" width="1344" height="768" alt="Многослойный энергоэффективный и шумоизоляционный стеклопакет для систем KBE" title="Акустические и мультифункциональные стеклопакеты в окнах KBE" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-right reveal">
          <span class="eyebrow">Акустика и оптика</span>
          <h2 id="kbe-acoustics-scene-heading">
            Тишина как материал.<br>
            <span class="halftone">Гашение низкочастотных вибраций и теплового излучения.</span>
          </h2>
          <p class="body-paragraph">
            Широкий фальц остекления в профилях KBE позволяет устанавливать сложные акустические и мультифункциональные стеклопакеты толщиной до полусотни миллиметров, отсекая гул мегаполиса и автомагистралей.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 2: ACOUSTICS, GLAZING, COLOR & LAMINATION (CATEGORIES 5, 6, 7, 8) -->
    <section class="section-space" aria-labelledby="kbe-aesthetics-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Среда и эстетика поверхности</span>
            <h2 id="kbe-aesthetics-heading">
              Акустический покой и темная архитектурная фактура.<br>
              <span class="halftone">От многослойного триплекса до графитовой ламинации.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="shumoizolyacionnye-resheniya" class="stagger-item-title">Шумоизоляционные решения</h3>
            <p class="body-paragraph">
              Для защиты спален и рабочих кабинетов от уличного шума мы проектируем шумоизоляционные окна KBE с асимметричной формулой остекления. Разная толщина стекол в пакете (например, сочетание наружного триплекса с акустической поливинилбутиральной пленкой и внутренних стекол меньшего сечения) и разноширокие дистанционные рамки разрывают звуковой резонанс, а многоконтурное уплотнение притвора исключает проникновение звука через щели.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="varianty-steklopaketov" class="stagger-item-title">Варианты стеклопакетов</h3>
            <p class="body-paragraph">
              Каждая система KBE комплектуется <a href="${prefix}elements.html#steklopakety" class="text-link">инженерными стеклопакетами</a> под ориентацию фасада по сторонам света: энергосберегающими с мягким селективным серебряным напылением (i-стекло), солнцезащитными мультифункциональными для южных и западных панорам, ударопрочными с закаленным стеклом и теплыми композитными дистанционными рамками в графитовом или черном цвете.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="cvetovye-resheniya" class="stagger-item-title">Цветовые и декоративные решения</h3>
            <p class="body-paragraph">
              Мы уходим от стереотипного восприятия ПВХ, предлагая выверенные архитектурные палитры: глубокий антрацит, темный кварц, базальтовый серый, матовый черный и спокойные природные оттенки. Использование темной основы профиля в массе позволяет сохранить благородный графитовый цвет даже при открытой створке — без контрастных светлых полос во внутреннем фальце.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="laminaciya-i-otdelka" class="stagger-item-title">Ламинация и варианты отделки</h3>
            <p class="body-paragraph">
              Односторонняя или двусторонняя архитектурная ламинация выполняется многослойными акриловыми пленками, отражающими инфракрасный спектр солнечного излучения (технология снижения поверхностного нагрева темного профиля). Фактура отделки может имитировать пескоструйный или брашированный анодированный алюминий, матовый графит или сдержанный темный шпон, позволяя комбинировать окна KBE и <a href="${prefix}alutech.html" class="text-link">алюминиевые фасады ALUTECH</a> на одном здании без визуальных различий.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE: HARDWARE & HANDLE -->
    <section class="macro-stage" aria-labelledby="kbe-scale-heading">
      <div class="macro-stage-media">
        <img src="assets/img/minimalist-window-handle.avif" srcset="assets/img/minimalist-window-handle-sm.avif 688w, assets/img/minimalist-window-handle.avif 1376w" sizes="100vw" width="1344" height="768" alt="Минималистичная темная ручка и скрытая противовзломная фурнитура на профиле KBE" title="Скрытая фурнитура и минималистичные ручки для окон KBE" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-left reveal">
          <span class="eyebrow">Масштаб, воздух и защита</span>
          <h2 id="kbe-scale-heading">
            Крупные форматы и инженерная безопасность.<br>
            <span class="halftone">Статическая вклейка стеклопакета и скрытая кинематика.</span>
          </h2>
          <p class="body-paragraph">
            Передовые технологии сборки CORTEC позволяют создавать на базе KBE масштабные панорамные и раздвижные проемы с безупречной геометрией и противовзломной защитой.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 3: SLIDING, LARGE WINDOWS, VENTILATION & SECURITY (CATEGORIES 9, 10, 11, 12) -->
    <section class="section-space" aria-label="Раздвижные, крупногабаритные, вентиляционные и противовзломные системы KBE">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="razdvizhnye-sistemy-kbe" class="stagger-item-title">Раздвижные системы</h3>
            <p class="body-paragraph">
              Для выходов на террасы, веранды и лоджии в линейке KBE предусмотрены параллельно-сдвижные, наклонно-сдвижные (PSK) и подъемно-сдвижные портальные решения. Они экономят внутреннее пространство помещения, сохраняя высокую герметичность притвора, плавный ход тяжелых створок и единство профильной геометрии с остальными окнами дома.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="bolshie-okonnye-konstrukcii" class="stagger-item-title">Большие оконные конструкции</h3>
            <p class="body-paragraph">
              При создании больших оконных конструкций на базе KBE мы применяем технологию статической вклейки стеклопакета по периметру фальца створки в сочетании с усиленным стальным армированием. Стеклопакет, обладающий высокой собственной жесткостью в плоскости, принимает на себя часть статической нагрузки и исключает провисание крупногабаритных створок в процессе многолетней эксплуатации.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="ventilyacionnye-resheniya" class="stagger-item-title">Вентиляционные решения</h3>
            <p class="body-paragraph">
              Герметичное современное окно требует продуманного воздухообмена. Системы KBE поддерживают установку скрытых внутрипрофильных клапанов контролируемого притока воздуха, механизмов многоступенчатого и параллельно-щелевого проветривания по всему контуру створки, обеспечивающих свежий воздух без сквозняков, выхолаживания помещения и потери шумоизоляции.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="funkcii-bezopasnosti" class="stagger-item-title">Решения с дополнительными функциями безопасности</h3>
            <p class="body-paragraph">
              Безопасность резиденции обеспечивается на уровне конструкции: грибовидные противовзломные цапфы из закаленной стали, ответные планки, фиксируемые непосредственно в стальное армирование профиля KBE, защита от высверливания <a href="${prefix}elements.html#furnitura-i-ruchki" class="text-link">оконной ручки</a>, скрытые датчики контроля состояния створки для интеграции в систему безопасности дома, а также детская блокировка открывания (технология TiltFirst) и ударостойкий триплекс.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-offset-mid">
            <span class="eyebrow">Точный подбор систем KBE</span>
            <h3>
              Верификация серий и цифровых паспортов под проект.<br>
              <span class="halftone">Инженерная спецификация вместо абстрактных цифр.</span>
            </h3>
            <p class="body-paragraph" style="margin-top: 20px;">
              Конкретные профильные серии KBE, количество воздушных камер, монтажная глубина, толщина стального армирования и расчетные коэффициенты сопротивления теплопередаче и звукоизоляции утверждаются после анализа вашего проекта <a href="${prefix}about.html" class="text-link">инженерами CORTEC</a>. Мы подбираем только те конфигурации, которые точно соответствуют статическим и теплотехническим требованиям вашего здания.
            </p>
            <div class="btn-group">
              <a href="${prefix}contact.html" class="btn-sand">Запросить спецификацию KBE</a>
              <a href="${prefix}elements.html" class="btn-oval">Перейти к стеклам и фурнитуре</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  }
};
