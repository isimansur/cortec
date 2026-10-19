const { buildSystemWebPageSchema } = require('../core/schema-builder');
const { pic } = require('../components/Picture');
const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: 'agc',
  file: 'agc.html',
  title: "Архитектурное стекло AGC Stopray и Stratophone в Грозном | CORTEC",
  description: "Архитектурные стеклопакеты AGC в проектах CORTEC в Грозном, Чеченской Республике и СКФО: солнцезащитные покрытия Stopray с двойным серебром, просветленное стекло Clearvision и триплекс Stratophone.",
  ogTitle: "Архитектурное стекло AGC — Stopray и Stratophone в Грозном и СКФО | CORTEC",
  ogDescription: "Селективные покрытия AGC Stopray против южного зноя (+40 °C), кристальное стекло Planibel Clearvision и акустический триплекс Stratophone в Грозном.",
  twitterDescription: "Стеклопакеты на базе AGC Stopray, Planibel Clearvision, Energy Light и Stratophone в Чечне и СКФО.",
  preloadImg: 'agc-stopray-glass',
  schemaJson: buildSystemWebPageSchema({
    file: 'agc.html',
    name: 'Архитектурное стекло AGC — Stopray, Planibel Clearvision и Stratophone | CORTEC',
    description: 'История концерна AGC (Asahi Glass Co.) с 1907 года и каталог архитектурного стекла для систем ALUTECH, KBE и KÖMMERLING.',
    breadcrumbLabel: 'Архитектурное стекло AGC'
  }),
  renderMain({ prefix = '' } = {}) {
    return `
    <!-- HERO SCENE: AGC STOPRAY & PLANIBEL CLEARVISION -->
    <section class="hero-viewport hero-viewport--right">
      <div class="hero-media-wrap">
        <img
          src="assets/img/agc-stopray-glass.avif" srcset="assets/img/agc-stopray-glass-sm.avif 688w, assets/img/agc-stopray-glass.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw"
          alt="Торцы многослойного архитектурного стекла AGC Planibel Clearvision и Stopray с магнетронным покрытием"
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
            <span>Архитектурное стекло AGC</span>
          </nav>
          <span class="eyebrow">Токио · Брюссель · Основан в 1907 году</span>
          <h1>
            Архитектурное стекло AGC.<br>
            <span class="halftone">Оптическая физика, магнетронное серебро и тишина.</span>
          </h1>
          <p class="lead-paragraph">
            Крупнейший в мире концерн по производству плоского и архитектурного стекла. В проектах CORTEC стекло занимает до 88% площади фасада — поэтому мы комплектуем рамы <a href="${prefix}alutech.html" class="text-link">ALUTECH</a>, <a href="${prefix}kbe.html" class="text-link">KBE</a> и <a href="${prefix}kommerling.html" class="text-link">KÖMMERLING</a> селективными формулами AGC Stopray, Planibel Clearvision и Stratophone.
          </p>
          <nav class="quiet-anchor-rail" aria-label="Разделы страницы AGC">
            <a href="#history">История с 1907 г.</a>
            <a href="#stopray">Stopray Double/Triple Silver</a>
            <a href="#clearvision">Planibel Clearvision</a>
            <a href="#stratophone">Акустика Stratophone</a>
            <a href="#jumbo">Jumbo 6000×3210</a>
          </nav>
        </div>
      </div>
    </section>

    <!-- HISTORY OF AGC (ASAHI GLASS CO., 1907 — PRESENT) -->
    <section class="section-space-lg" id="history">
      <div class="container">
        <div class="stagger-row reveal" style="margin-bottom: clamp(80px, 10vw, 130px);">
          <div class="stagger-left">
            <span class="eyebrow">История компании · 1907 – 2026</span>
            <h2>
              От первой печи Тошия Ивасаки<br>
              <span class="halftone">к мировому лидерству в архитектурной оптике.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              Концерн Asahi Glass Co. (AGC) был основан в 1907 году в Японии Тошия Ивасаки (представителем династии Mitsubishi) как первое в стране промышленное производство листового стекла. За столетие компания превратилась в глобальную технологическую империю, задающую стандарты остекления небоскребов, музеев и частных резиденций на всех континентах.
            </p>
          </div>
        </div>

        <div class="editorial-stagger">
          <article class="stagger-row reveal">
            <div class="stagger-left">
              <span class="eyebrow">1907 — 1950-е</span>
              <h3 class="stagger-item-title">Индустриальный прорыв в Амагасаки и собственные огнеупоры</h3>
              <p class="body-paragraph">
                Преодолев сложнейший технологический барьер варки оптически ровного листового стекла на заводе в Амагасаки, инженеры Asahi Glass создали собственные лаборатории силикатной химии и огнеупорной керамики. Уже к середине XX века компания стала ведущим инноватором Азии в области термической закалки и многослойного ламинирования стекла.
              </p>
            </div>
            <div class="stagger-right">
              <span class="eyebrow">1960-е — 1981</span>
              <h3 class="stagger-item-title">Эволюция Float-процесса и альянс с бельгийской Glaverbel</h3>
              <p class="body-paragraph">
                Внедрение флоат-технологии (формирование идеально гладкой стеклянной ленты на расплаве олова) и стратегическое объединение со старейшим европейским производителем Glaverbel (Бельгия) в 1981 году открыли эру вакуумного магнетронного напыления оксидов металлов и серебра — фундамента современных покрытий Stopray и iplus.
              </p>
            </div>
          </article>

          <article class="stagger-row reveal">
            <div class="stagger-left">
              <span class="eyebrow">1997 — 2010-е</span>
              <h3 class="stagger-item-title">Крупнейшие флоат-линии и коутеры Jumbo в России и Европе</h3>
              <p class="body-paragraph">
                Вхождение в состав концерна Борского стекольного завода и строительство с нуля передового стекольного комплекса в подмосковном Клину обеспечили прямое производство архитектурного стекла Jumbo-формата (6000 × 3210 мм) с многослойным селективным напылением непосредственно для российских девелоперских и частных объектов.
              </p>
            </div>
            <div class="stagger-right">
              <span class="eyebrow">2018 — Настоящее время</span>
              <h3 class="stagger-item-title">Единый глобальный бренд AGC и архитектура нулевого энергопотребления</h3>
              <p class="body-paragraph">
                В 2018 году корпорация официально утвердила имя AGC Inc. как единый глобальный символ высоких технологий в стекле, электронике и фторполимерах. Сегодня стекла AGC формируют облик знаковых небоскребов и камерных вилл, совмещая рекордное светопропускание с защитой от инфракрасного перегрева и городского шума.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FULL-BLEED MACRO SCENE 2: AGC JUMBO STRUCTURAL CORNER -->
    <section class="macro-scroll-sequence">
      <article class="macro-stage macro-stage--text-left" id="jumbo">
        <div class="macro-stage-media">
          <img
            src="assets/img/agc-planibel-facade.avif" srcset="assets/img/agc-planibel-facade-sm.avif 688w, assets/img/agc-planibel-facade.avif 1376w" sizes="(max-width: 768px) 50vw, 100vw"
            alt="Бесшовный структурный стеклянный угол из крупноформатного стекла AGC Planibel Clearvision и Stopray"
            width="1344"
            height="768"
            loading="lazy"
          >
        </div>
        <div class="macro-stage-content">
          <div class="macro-stage-text-left reveal">
            <span class="eyebrow">Крупный формат · Jumbo 6000 × 3210 мм</span>
            <h2>
              Растворение границ.<br>
              <span class="halftone">Структурные углы и кристальная геометрия.</span>
            </h2>
            <p class="body-paragraph">
              Использование листов Jumbo-формата и угловых стеклопакетов со ступенчатым зубом позволяет стыковать панорамные полотна без угловых металлических стоек. Насыщенный нейтрально-платиновый или графитовый рефлекс покрытия Stopray сохраняет приватность днем, а вечером превращает фасад в чистую световую призму.
            </p>
          </div>
        </div>
      </article>
    </section>

    <!-- TECHNOLOGIES OF AGC -->
    <section class="section-space-lg" id="technologies">
      <div class="container">
        <div class="stagger-row reveal" style="margin-bottom: clamp(80px, 10vw, 130px);">
          <div class="stagger-left">
            <span class="eyebrow">Инженерный каталог · Технологии AGC</span>
            <h2>
              Архитектурные покрытия<br>
              <span class="halftone">и формулы стекол в проектах CORTEC.</span>
            </h2>
          </div>
          <div class="stagger-right">
            <p class="lead-paragraph">
              Для каждого фасада мы выполняем расчет светопропускания (LT), солнечного фактора (SF/g) и индекса звукоизоляции ($R_w$), подбирая точную комбинацию внешних, внутренних и ламинированных стекол AGC.
            </p>
          </div>
        </div>

        <div class="editorial-stagger">
          <!-- 1 & 2 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="stopray">
              <span class="eyebrow">01 · Double &amp; Triple Silver</span>
              <h3 class="stagger-item-title">Высокоселективное стекло AGC Stopray (Vision, Ultra, Titanium)</h3>
              <p class="body-paragraph">
                Флагманская линейка стекол с двойным и тройным вакуумно-магнетронным слоем серебра. Обладает максимальным индексом селективности (до 2,15): пропуская в резиденцию максимум естественного дневного спектра, покрытие отражает до 72% солнечной тепловой энергии летом и блокирует утечку тепла зимой.
              </p>
            </div>
            <div class="stagger-right" id="clearvision">
              <span class="eyebrow">02 · Low-Iron Crystal</span>
              <h3 class="stagger-item-title">Ультрапрозрачное просветленное стекло Planibel Clearvision</h3>
              <p class="body-paragraph">
                Низкожелезистое флоат-стекло со сниженным в 10 раз содержанием оксидов железа. Полностью лишено характерного бутылочно-зеленоватого оттенка на торцах и в толстых закаленных пакетах (8–12 мм), обеспечивая эталонный индекс цветопередачи $R_a = 100\\%$ и светопропускание до 92%.
              </p>
            </div>
          </article>

          <!-- 3 & 4 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="stratophone">
              <span class="eyebrow">03 · Акустика и безопасность</span>
              <h3 class="stagger-item-title">Звукоизоляционный триплекс Stratophone и защитный Stratobel</h3>
              <p class="body-paragraph">
                Многослойное ламинированное стекло с прозрачной вибродемпфирующей акустической PVB-мембраной внутри. Мембрана работает как пружинный поглотитель звуковых волн, гася низкочастотный гул магистралей и ветровой резонанс, а при разрушении удерживает осколки на пленке, защищая дом от взлома.
              </p>
            </div>
            <div class="stagger-right" id="energy">
              <span class="eyebrow">04 · Мультифункциональный комфорт</span>
              <h3 class="stagger-item-title">Линейка AGC Energy Light, Energy NT и теплосбережение iplus</h3>
              <p class="body-paragraph">
                Универсальные мультифункциональные и низкоэмиссионные (Low-E) покрытия с идеально нейтральной оптикой без зеркального эффекта. Подходят как для частного домостроения с высокими требованиями к инсоляции, так и для закаливаемых крупноформатных витражей.
              </p>
            </div>
          </article>

          <!-- 5 & 6 -->
          <article class="stagger-row reveal">
            <div class="stagger-left" id="thermobel">
              <span class="eyebrow">05 · Структурное остекление</span>
              <h3 class="stagger-item-title">Стеклопакеты со структурным силиконом, зубом и моллированием</h3>
              <p class="body-paragraph">
                Производство двухкамерных стеклопакетов толщиной до 62 мм с УФ-стойким вторичным контуром из двухкомпонентного структурного силикона (для фасадов <a href="${prefix}alutech.html#strukturnoe-osteklenie" class="text-link">ALUTECH ALT F50 SG</a>), эмалированием по периметру (стемалит) и радиусным гнутьем (моллированием).
              </p>
            </div>
            <div class="stagger-right" id="lacobel">
              <span class="eyebrow">06 · Интерьер и спандрели</span>
              <h3 class="stagger-item-title">Окрашенные и матированные стекла Lacobel T и Matelac T</h3>
              <p class="body-paragraph">
                Закаливаемые стекла с заводским керамическим покрытием глубоких графитовых, бронзовых и антрацитовых оттенков для непрозрачных межэтажных поясов фасада (спандрелей), облицовки входных порталов и минималистичных интерьерных перегородок.
              </p>
            </div>
          </article>
        </div>

        <div class="apex-gallery-Invite reveal">
          <p>
            Подберем точную оптическую и акустическую формулу стеклопакета AGC под ориентацию фасадов вашего объекта по сторонам света.
          </p>
          <a href="${prefix}contact.html" class="btn-sand">Подобрать формулу стекла AGC</a>
        </div>
      </div>
    </section>
  `;
  }
};
