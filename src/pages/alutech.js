const { buildServicePageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'alutech',
  file: 'alutech.html',
  title: "Алюминиевые системы ALUTECH в Грозном и ЧР — Фасады и окна | CORTEC",
  description: "Проектирование КМ/КМД и монтаж систем ALUTECH в Грозном, Чеченской Республике и СКФО: стоечно-ригельные фасады ALT F50, структурное остекление, теплые окна ALT W72 и порталы SL160.",
  ogTitle: "Системы ALUTECH — Алюминиевые фасады и окна в Грозном и СКФО | CORTEC",
  ogDescription: "Инженерия архитектурного алюминия ALUTECH в Чеченской Республике и на Северном Кавказе: фасады ALT F50, теплые окна ALT W72 и порталы SL160.",
  twitterDescription: "Проектирование КМ/КМД и монтаж стоечно-ригельного, структурного и панорамного остекления ALUTECH в Грозном и ЧР.",
  preloadImg: 'hero-volumetric-node',
  schemaJson: buildServicePageSchema({
    file: 'alutech.html',
    serviceName: 'Проектирование и монтаж алюминиевых светопрозрачных конструкций ALUTECH',
    serviceType: 'Архитектурное алюминиевое остекление ALUTECH',
    description: 'Статический и теплотехнический расчет, комплектация и монтаж 10 направлений архитектурного алюминия ALUTECH: стоечно-ригельных фасадов, структурного остекления, интегрируемых окон, витражей, входных групп и подъемно-сдвижных порталов.',
    catalogName: 'Категории алюминиевых конструкций ALUTECH в CORTEC',
    offers: [
      { name: 'Стоечно-ригельные фасадные системы ALUTECH', anchor: 'stoechno-rigelnye-fasady' },
      { name: 'Структурное и полуструктурное остекление фасадов', anchor: 'strukturnoe-osteklenie' },
      { name: 'Интегрируемые фасадные окна со скрытой створкой', anchor: 'integriruemye-fasadnye-okna' },
      { name: 'Пространственные светопрозрачные конструкции', anchor: 'svetoprozrachnye-konstrukcii' },
      { name: 'Оконно-дверные алюминиевые системы с терморазрывом', anchor: 'okonno-dvernye-sistemy' },
      { name: 'Панорамные витражные конструкции', anchor: 'vitrazhnye-konstrukcii' },
      { name: 'Алюминиевые входные группы', anchor: 'vhodnye-gruppy' },
      { name: 'Подъемно-сдвижные порталы и раздвижные решения', anchor: 'razdvizhnye-resheniya' },
      { name: 'Крупноформатные светопрозрачные элементы', anchor: 'krupnoformatnye-elementy' },
      { name: 'Архитектурные решения различной теплоэффективности', anchor: 'resheniya-teploeffektivnosti' }
    ],
    faq: [
      {
        q: 'Как работает система отвода конденсата и вентиляции в стоечно-ригельных фасадах ALUTECH?',
        a: 'В стоечно-ригельных системах ALUTECH реализован принцип поэтапного перекрытия дренажных уровней: каналы горизонтального ригеля располагаются выше дренажного лотка вертикальной стойки. Любая влага или конденсат из фальца стеклопакета перетекает из ригеля в стойку и выводится наружу без соприкосновения с полиамидным термомостом.'
      },
      {
        q: 'Чем структурное остекление ALUTECH отличается от классического стоечно-ригельного фасада?',
        a: 'При структурном остеклении отсутствуют наружные декоративные прижимные крышки. Стеклопакет фиксируется к несущему каркасу скрытыми внутренними механическими прижимами, вставляемыми в торцевой паз стеклопакета, а узкий наружный шов заполняется атмосферостойким структурным силиконовым герметиком и уплотнителями EPDM, создавая идеально гладкую стеклянную поверхность фасада.'
      }
    ],
    breadcrumbLabel: 'Системы ALUTECH',
    rootCrumbLabel: 'Главная CORTEC'
  }),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- SCREEN 1: FULLSCREEN HERO FOR ALUTECH -->
    <section class="hero-viewport" aria-label="Архитектурные алюминиевые системы ALUTECH">
      <div class="hero-media-wrap">
        <img src="assets/img/hero-volumetric-node.avif" srcset="assets/img/hero-volumetric-node-sm.avif 688w, assets/img/hero-volumetric-node.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw" width="1344" height="768" alt="Объемный стоечно-ригельный фасадный узел ALUTECH в темном анодированном профиле с теплым внутренним светом" title="Архитектурные алюминиевые фасады и витражи ALUTECH" fetchpriority="high" decoding="async">
      </div>
      <div class="hero-content">
        <div class="hero-content-inner reveal">
          <nav class="blog-breadcrumbs" aria-label="Навигационная цепочка">
            <a href="${prefix}index.html">Главная CORTEC</a>
            <span aria-hidden="true">/</span>
            <span>Системы ALUTECH</span>
          </nav>
          <span class="eyebrow">Минск · Европа · Основан в 1996 году</span>
          <h1>
            Системы ALUTECH.<br>
            <span class="halftone">Несущая тишина металла и панорамного стекла.</span>
          </h1>
          <p class="lead-paragraph">
            Архитектурный алюминий ALUTECH позволяет перекрывать масштабные световые проемы при минимальной видимой ширине переплетов. Команда CORTEC работает с профильными системами бренда в сегменте фасадного, витражного и оконно-дверного остекления, точно соблюдая технологию сборки узлов, вентиляции фальца и теплотехнического контура.
          </p>
          <div class="btn-group">
            <a href="${prefix}contact.html" class="btn-sand">Запросить инженерный расчет</a>
            <a href="${prefix}elements.html" class="btn-oval">Стеклопакеты и фурнитура</a>
          </div>
          <nav class="quiet-anchor-rail" aria-label="Быстрые ссылки по разделам ALUTECH">
            <a href="#history">История с 1996 г.</a>
            <a href="#stoechno-rigelnye-fasady">Стоечно-ригельные фасады</a>
            <a href="#strukturnoe-osteklenie">Структурное остекление</a>
            <a href="#integriruemye-fasadnye-okna">Интегрируемые окна</a>
            <a href="#okonno-dvernye-sistemy">Оконно-дверные системы</a>
            <a href="#razdvizhnye-resheniya">Раздвижные порталы</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- HISTORY OF ALUTECH (1996 — PRESENT) -->
    <section class="section-space-lg" id="history" aria-labelledby="alutech-history-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">История компании · 1996 – 2026</span>
            <h2 id="alutech-history-heading">
              От первого сборочного цеха<br>
              <span class="halftone">до крупнейшего алюминиевого комплекса Восточной Европы.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              Группа компаний «АЛЮТЕХ» была основана в 1996 году в Минске. За три десятилетия инженерного развития холдинг построил вертикально интегрированную металлургическую и экструзионную экосистему полного цикла — от собственного литья первичных алюминиевых слитков до прецизионного анодирования.
            </p>
          </div>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">2004 — 2012 · Завод «АлюминТехно»</span>
            <h3 class="stagger-item-title">Запуск собственного литья, экструзии и линий анодирования</h3>
            <p class="body-paragraph">
              Создание завода «АлюминТехно» ознаменовало переход к полному контролю над металлургией сплавов EN AW-6060 и 6063. Высокоточные прессовые комплексы, вертикальные линии полимерно-порошковой окраски и крупнейший в регионе цех глубокого архитектурного анодирования подтверждены швейцарскими сертификатами Qualicoat (Class 2 / Seaside) и Qualanod.
            </p>
          </div>
          <div class="stagger-right">
            <span class="eyebrow">2014 — Настоящее время · R&amp;D и испытания в Розенхайме</span>
            <h3 class="stagger-item-title">Сертификация в IFT Rosenheim и экспорт в 65 стран мира</h3>
            <p class="body-paragraph">
              Флагманские архитектурные серии ALT F50, ALT W72 и порталы ALT SL160 проходят климатические, ветровые и акустические испытания в немецком институте IFT Rosenheim и собственном испытательном центре ALUTECH. Сегодня конструкции бренда формируют фасады бизнес-центров и частных вилл в Европе, Азии, Северной Америке и на Ближнем Востоке.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOCK 1: STOECHNO-RIGELNYE & STRUCTURAL GLAZING -->
    <section class="section-space" aria-labelledby="facade-engineering-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Фасадная инженерия</span>
            <h2 id="facade-engineering-heading">
              Стоечно-ригельные фасады и структурное остекление.<br>
              <span class="halftone">Каскадный отвод влаги и монолитная плоскость стекла.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="stoechno-rigelnye-fasady" class="stagger-item-title">Стоечно-ригельные фасадные системы</h3>
            <p class="body-paragraph">
              Классическая и наиболее надежная конструктивная схема для вертикальных и наклонных фасадов большой площади. В системах ALUTECH реализован принцип многоуровневого перекрытия дренажно-вентиляционных каналов: влага и возможный конденсат из горизонтального ригельного паза направляются в вертикальный канал стойки и выводятся наружу без контакта с термоизолирующим контуром. Термомосты из полиамида, армированного стекловолокном, в сочетании с вспененными изоляторами и многолепестковыми уплотнителями EPDM сохраняют герметичность фасада при значительных ветровых прогибах и суточных температурных деформациях.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="strukturnoe-osteklenie" class="stagger-item-title">Структурное остекление</h3>
            <p class="body-paragraph">
              Когда архитектурный замысел требует цельной зеркальной или прозрачной стеклянной оболочки без наружных прижимных крышек, применяется структурное и полуструктурное остекление ALUTECH. Фиксация тяжелого <a href="${prefix}elements.html#steklopakety" class="text-link">многослойного стеклопакета</a> к несущему каркасу осуществляется скрытым способом — через внутренние дистанционные пазы и механические прижимы из нержавеющей стали. Наружный шов между соседними стеклопакетами шириной всего в несколько миллиметров герметизируется высокомодульным атмосферостойким силиконом или закрывается тонким плоским профилем, формируя эстетику непрерывного стекла.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="integriruemye-fasadnye-okna" class="stagger-item-title">Интегрируемые фасадные окна</h3>
            <p class="body-paragraph">
              Для естественного проветривания стеклянных фасадов без разрушения их внешнего ритма в стоечно-ригельный или структурный каркас встраиваются интегрируемые фасадные окна ALUTECH. Верхнеподвесные и параллельно-выдвижные створки со скрытым профилем открывания снаружи неотличимы от глухих ячеек витража: стеклянная плоскость фасада остается однородной как в закрытом, так и в открытом состоянии.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="svetoprozrachnye-konstrukcii" class="stagger-item-title">Светопрозрачные конструкции сложной геометрии</h3>
            <p class="body-paragraph">
              Пространственная система соединителей, шарнирных стоек и угловых переходников ALUTECH позволяет проектировать сложные светопрозрачные конструкции: зенитные фонари, двускатные и купольные стеклянные перекрытия, зимние сады и ломаные полигональные фасады с сохранением непрерывного контура теплоизоляции и каскадного водоотвода.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE: PROFILE & EPDM -->
    <section class="macro-stage macro-stage--text-right" aria-labelledby="thermal-break-heading">
      <div class="macro-stage-media">
        <img src="assets/img/detail-04-profile.avif" srcset="assets/img/detail-04-profile-sm.avif 424w, assets/img/detail-04-profile.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Алюминиевый профиль ALUTECH с полиамидным термомостом и каскадным контуром уплотнения EPDM" title="Термомост из полиамида и уплотнители EPDM в алюминиевых системах ALUTECH" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-right reveal">
          <span class="eyebrow">Внутренняя анатомия узла</span>
          <h2 id="thermal-break-heading">
            Термомост и контур EPDM.<br>
            <span class="halftone">Разделение внешней стихии и микроклимата дома.</span>
          </h2>
          <p class="body-paragraph">
            Высокая энергоэффективность теплых систем ALUTECH достигается за счет широких многокамерных термомостов из полиамида PA66 GF25, коэкструдированных центральных уплотнителей и камер из вспененного полиэтилена вокруг фальца стеклопакета. Это подавляет конвективный и радиационный теплообмен внутри профиля.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 2: WINDOWS, DOORS, STAINED GLASS & ENTRANCE GROUPS -->
    <section class="section-space" aria-labelledby="windows-doors-heading">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Окна, витражи и входные зоны</span>
            <h2 id="windows-doors-heading">
              Оконно-дверные системы и витражные конструкции.<br>
              <span class="halftone">Тонкий переплет и ресурс десятилетий.</span>
            </h2>
          </div>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="okonno-dvernye-sistemy" class="stagger-item-title">Оконно-дверные алюминиевые системы</h3>
            <p class="body-paragraph">
              Алюминиевые окна и двери ALUTECH проектируются для объектов, где важны высокая статическая жесткость створки, минимальная видимая ширина рамы и стабильность геометрии при больших габаритах. Угловые соединения собираются на литых алюминиевых закладных методом запрессовки или штифтования с двухкомпонентным клеевым герметиком, обеспечивая монолитность створки на протяжении всего срока службы здания. Доступны исполнения со скрытой створкой и <a href="${prefix}elements.html#furnitura-i-ruchki" class="text-link">скрытыми петлевыми группами</a>.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="vitrazhnye-konstrukcii" class="stagger-item-title">Витражные конструкции</h3>
            <p class="body-paragraph">
              Панорамные витражи во всю высоту этажа объединяют интерьер с окружающим ландшафтом. Мы рассчитываем моменты инерции стоек и импостов под конкретный ветровой район, высотность и массу двухкамерного стеклопакета, подбирая сечения профилей так, чтобы конструкция оставалась визуально легкой, но обладала нормативным запасом прочности.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="vhodnye-gruppy" class="stagger-item-title">Входные группы</h3>
            <p class="body-paragraph">
              Входные двери и тамбурные группы ALUTECH рассчитываются на интенсивный ежедневный трафик и высокие эксплуатационные нагрузки. Усиленные дверные профили, трехконтурное притворное уплотнение, выпадающие или низкие термоизолированные пороги, скрытые или роликовые петли и многозапорные замки гарантируют плавное закрывание и защиту от продувания в любое время года.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="resheniya-teploeffektivnosti" class="stagger-item-title">Архитектурные решения различной теплоэффективности</h3>
            <p class="body-paragraph">
              В зависимости от назначения контура здания CORTEC применяет системы ALUTECH различного класса теплоизоляции: от холодных и умеренно теплых серий для внутренних перегородок, веранд и буферных тамбуров до супертеплых пассивных систем с многокамерными термомостами и вспененными вкладышами для отапливаемых жилых пространств с панорамным остеклением.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE: SLIDING PORTAL THRESHOLD -->
    <section class="macro-stage" aria-labelledby="sliding-portal-heading">
      <div class="macro-stage-media">
        <img src="assets/img/detail-05-junction.avif" srcset="assets/img/detail-05-junction-sm.avif 424w, assets/img/detail-05-junction.avif 848w" sizes="(max-width: 768px) 50vw, 25vw" width="832" height="1248" alt="Беспороговая рельсовая направляющая подъемно-сдвижного портала ALUTECH в уровень с каменным полом" title="Подъемно-сдвижные порталы ALUTECH с беспороговым примыканием" loading="lazy" decoding="async">
      </div>
      <div class="macro-stage-content">
        <div class="macro-stage-text-left reveal">
          <span class="eyebrow">Движение стеклянных стен</span>
          <h2 id="sliding-portal-heading">
            Раздвижные решения и крупноформатные элементы.<br>
            <span class="halftone">Подъемно-сдвижные порталы с порогом в уровень чистого пола.</span>
          </h2>
          <p class="body-paragraph">
            Инженерия панорамных порталов ALUTECH позволяет сдвигать в сторону целые стеклянные стены легким поворотом ручки, стирая границу между гостиной и террасой.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 3: SLIDING SOLUTIONS & LARGE-FORMAT ELEMENTS + SPECIFICATION APPROACH -->
    <section class="section-space" aria-label="Раздвижные порталы и крупноформатное остекление ALUTECH">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <article class="stagger-left">
            <h3 id="razdvizhnye-resheniya" class="stagger-item-title">Раздвижные решения (подъемно-сдвижные порталы)</h3>
            <p class="body-paragraph">
              В основе крупноформатных порталов ALUTECH лежит подъемно-сдвижная кинематика (HS): при повороте ручки створка плавно приподнимается на несколько миллиметров над контуром уплотнения и катится по направляющей из нержавеющей стали на роликовых каретках практически без трения. В любой точке проема створку можно опустить, герметично зафиксировав ее собственным весом по двум контурам EPDM-уплотнителей. Нижняя рама монтируется в стяжку заподлицо с чистовым полом и оснащается скрытой системой линейного водоотвода.
            </p>
          </article>
          <article class="stagger-right">
            <h3 id="krupnoformatnye-elementy" class="stagger-item-title">Крупноформатные светопрозрачные элементы</h3>
            <p class="body-paragraph">
              Работа с джамбо-форматами и тяжелыми стеклопакетами требует особого подхода к статике и монтажу. Мы выполняем расчет прогиба стекла и линзообразования, применяем закаленные и многослойные стекла (триплекс) увеличенной толщины, усиливаем узлы примыкания к несущим перекрытиям стальными кронштейнами с паронитовыми терморазрывами и организуем механизированный монтаж вакуумными манипуляторами.
            </p>
          </article>
        </div>

        <div class="stagger-row reveal">
          <div class="stagger-offset-mid">
            <span class="eyebrow">Порядок подбора системных серий</span>
            <h3>
              Проектная верификация индексов и характеристик.<br>
              <span class="halftone">Никаких шаблонных таблиц — расчет под ваш архитектурный раздел.</span>
            </h3>
            <p class="body-paragraph" style="margin-top: 20px;">
              Линейка архитектурного алюминия ALUTECH включает десятки модификаций стоек, ригелей, оконных и портальных профилей с различными моментами инерции ($I_x$, $I_y$), монтажной глубиной и приведенным сопротивлением теплопередаче ($R_0$). Мы не публикуем абстрактные рекламные цифры: конкретный системный индекс и точный цифровой паспорт узла формируются <a href="${prefix}about.html" class="text-link">инженерами CORTEC</a> после анализа ветровых нагрузок, габаритов проемов и теплотехнического расчета вашего объекта.
            </p>
            <div class="btn-group">
              <a href="${prefix}contact.html" class="btn-sand">Передать проект на расчет ALUTECH</a>
              <a href="${prefix}kbe.html" class="btn-oval">Перейти к системам KBE</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  }
};
