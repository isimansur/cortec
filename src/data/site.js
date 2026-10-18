/**
 * ЕДИНЫЙ ИСТОЧНИК ДАННЫХ ПРОЕКТА CORTEC (Single Source of Truth)
 * Включает NAP-данные, гео-приоритеты (Приоритет №1 — Чеченская Республика, Приоритет №2 — республики СКФО),
 * навигацию и генератор локальной микроразметки Schema.org.
 */
const site = {
  brand: {
    name: 'CORTEC',
    subname: 'technologies',
    tagline: 'cortec technologies',
    legalName: 'CORTEC — Архитектурные светопрозрачные конструкции в Грозном и на Северном Кавказе',
    domain: 'https://cortectech.pro',
    host: 'cortectech.pro',
    themeColor: '#111214',
    copyrightYear: 2026
  },

  contact: {
    city: 'Грозный',
    region: 'Чеченская Республика',
    regionCode: 'RU-CE',
    district: 'Северо-Кавказский федеральный округ (СКФО)',
    postalCode: '364037',
    street: 'ул. Субры Кишиевой, 55',
    streetAddress: 'ул. Субры Кишиевой, 55',
    shortAddress: 'г. Грозный, ул. Субры Кишиевой, 55',
    fullAddress: 'Чеченская Республика, г. Грозный, ул. Субры Кишиевой, 55',
    phonePrimary: { display: '+7 (928) 000-76-66', href: 'tel:+79280007666', schema: '+7-928-000-76-66' },
    phoneCard1: { display: '+7 (989) 900-41-41', href: 'tel:+79899004141', schema: '+7-989-900-41-41' },
    phoneCard2: { display: '+7 (929) 400-99-99', href: 'tel:+79294009999', schema: '+7-929-400-99-99' },
    phonesSecondary: [
      { display: '+7 (989) 900-41-41', href: 'tel:+79899004141', schema: '+7-989-900-41-41' },
      { display: '+7 (929) 400-99-99', href: 'tel:+79294009999', schema: '+7-929-400-99-99' }
    ],
    whatsappPhone: '79280007666',
    whatsappUrl: 'https://wa.me/79280007666',
    whatsappDirectUrl: 'https://wa.me/79280007666?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20CORTEC!%20%D0%9D%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%8F%D1%8E%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D0%BD%D0%B0%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82.',
    whatsappDisplay: 'WhatsApp: +7 (928) 000-76-66',
    email: 'project@cortectech.pro',
    hours: 'Пн–Пт: 10:00 – 19:00',
    hoursDisplay: 'Пн–Пт 10:00–19:00',
    hoursIso: 'Mo-Fr 10:00-19:00',
    googleProfileUrl: 'https://share.google/5Y5mWzVmDDefmiI7j',
    yandexProfileId: '30993680039',
    yandexProfileUrl: 'https://yandex.ru/profile/30993680039',
    yandexMapUrl: 'https://yandex.ru/profile/30993680039?lang=ru',
    yandexShareUrl: 'https://yandex.ru/profile/30993680039?lang=ru&utm_source=copy_link&utm_medium=social&utm_campaign=share',
    yandexOrgCanonicalUrl: 'https://yandex.ru/profile/30993680039',
    yandexMapsCanonicalUrl: 'https://yandex.ru/maps/org/30993680039/',
    hasMapUrls: [
      'https://share.google/5Y5mWzVmDDefmiI7j',
      'https://yandex.ru/profile/30993680039',
      'https://yandex.ru/maps/org/30993680039/'
    ],
    sameAsUrls: [
      'https://share.google/5Y5mWzVmDDefmiI7j',
      'https://yandex.ru/profile/30993680039',
      'https://yandex.ru/profile/30993680039?lang=ru',
      'https://yandex.ru/maps/org/30993680039/',
      'https://wa.me/79280007666'
    ],
    geo: { lat: 43.320780, lng: 45.714519 }
  },

  regions: {
    priority1: {
      name: 'Чеченская Республика',
      iso: 'RU-CE',
      role: 'Проектный офис в Грозном, шоурум узлов и базовый шеф-монтаж',
      cities: [
        'Грозный',
        'Гудермес',
        'Аргун',
        'Шали',
        'Урус-Мартан',
        'Курчалой',
        'Ачхой-Мартан',
        'Ведено',
        'Итум-Кали',
        'Кезеной-Ам',
        'Беной',
        'Шатой',
        'Знаменское',
        'Наурская',
        'Шелковская'
      ]
    },
    priority2: [
      {
        name: 'Республика Ингушетия',
        iso: 'RU-IN',
        cities: ['Магас', 'Назрань', 'Карабулак', 'Малгобек', 'Сунжа', 'Джейрах']
      },
      {
        name: 'Республика Дагестан',
        iso: 'RU-DA',
        cities: ['Махачкала', 'Каспийск', 'Дербент', 'Хасавюрт', 'Кизляр', 'Буйнакск', 'Избербаш']
      },
      {
        name: 'Республика Северная Осетия — Алания',
        iso: 'RU-SE',
        cities: ['Владикавказ', 'Моздок', 'Беслан', 'Алагир', 'Фиагдон']
      },
      {
        name: 'Кабардино-Балкарская Республика',
        iso: 'RU-KB',
        cities: ['Нальчик', 'Прохладный', 'Баксан', 'Приэльбрусье']
      },
      {
        name: 'Ставропольский край (КМВ) и КЧР',
        iso: 'RU-STA',
        cities: ['Пятигорск', 'Кисловодск', 'Ессентуки', 'Минеральные Воды', 'Черкесск', 'Архыз', 'Домбай']
      }
    ]
  },

  og: {
    siteName: 'CORTEC',
    siteAlternateNames: [
      'CORTEC Technologies',
      'КОРТЕК Грозный',
      'CORTEC Грозный',
      'cortectech.pro'
    ],
    locale: 'ru_RU',
    image: 'https://cortectech.pro/assets/img/og-cortec-preview.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'Темный алюминиевый стоечно-ригельный фасадный узел ALUTECH со стеклопакетом AGC и логотипом CORTEC technologies (Грозный, Чеченская Республика)'
  },

  logoSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322 80" fill="none" aria-hidden="true">
        <path fill="currentColor" d="M50.50 23.27 A31.50 31.00 0 1 0 50.50 72.73 V54.37 A19.40 19.20 0 1 1 50.50 41.63 Z" />
        <path fill="currentColor" fill-rule="evenodd" d="M87.50 17.00 A31.50 31.00 0 1 0 87.50 79.00 A31.50 31.00 0 1 0 87.50 17.00 Z M87.50 28.80 A18.70 19.20 0 1 1 87.50 67.20 A18.70 19.20 0 1 1 87.50 28.80 Z" />
        <path fill="currentColor" d="M126.00 18.00 H163.00 V30.00 H139.50 V78.00 H126.00 Z" />
        <path fill="currentColor" d="M169.00 2.00 H182.50 V18.00 H202.00 V30.00 H182.50 V78.00 H169.00 Z" />
        <path fill="currentColor" fill-rule="evenodd" d="M263.61 53.00 A30.00 31.00 0 1 0 254.00 71.11 V56.08 A22.00 19.40 0 0 1 234.00 67.40 A17.60 19.40 0 0 1 216.99 53.00 Z M217.12 42.50 H250.88 A17.60 19.40 0 0 0 217.12 42.50 Z" />
        <path fill="currentColor" d="M320.50 23.27 A31.50 31.00 0 1 0 320.50 72.73 V54.37 A19.40 19.20 0 1 1 320.50 41.63 Z" />
      </svg>`,

  nav: [
    {
      slug: 'index',
      file: 'index.html',
      label: 'Экспозиция',
      sitelinkTitle: 'Главная CORTEC',
      description: 'Инженерное проектирование КМ/КМД и монтаж панорамного остекления в Грозном, ЧР и СКФО.'
    },
    {
      slug: 'alutech',
      file: 'alutech.html',
      label: 'ALUTECH',
      sublabel: 'Алюминиевые фасады, окна и порталы',
      group: 'systems',
      sitelinkTitle: 'Системы ALUTECH',
      description: 'Стоечно-ригельные и структурные фасады ALT F50, теплые окна ALT W72 и порталы ALT SL160.'
    },
    {
      slug: 'kbe',
      file: 'kbe.html',
      label: 'KBE',
      sublabel: 'Немецкие профильные системы 76 мм',
      group: 'systems',
      sitelinkTitle: 'Немецкие окна KBE',
      description: 'Многокамерные оконно-дверные ПВХ-системы KBE 76 greenline в темной графитовой ламинации.'
    },
    {
      slug: 'kommerling',
      file: 'kommerling.html',
      label: 'KÖMMERLING',
      sublabel: 'Системы 88 мм, AluClip Zero и PremiDoor',
      group: 'systems',
      sitelinkTitle: 'Системы KÖMMERLING',
      description: '7-камерные окна KÖMMERLING 88, алюминиевые накладки AluClip Zero и порталы PremiDoor 88 Lux.'
    },
    {
      slug: 'agc',
      file: 'agc.html',
      label: 'AGC Glass',
      sublabel: 'Архитектурное стекло Stopray и Stratophone',
      group: 'systems',
      sitelinkTitle: 'Архитектурное стекло AGC',
      description: 'Мультифункциональное стекло Stopray (Double Silver), просветленное Clearvision и триплекс Stratophone.'
    },
    {
      slug: 'elements',
      file: 'elements.html',
      label: 'Элементы',
      sublabel: 'Стеклопакеты, теплые рамки и скрытая фурнитура',
      group: 'systems',
      sitelinkTitle: 'Стеклопакеты и фурнитура',
      description: 'Теплые рамки Chromatech Ultra, скрытая фурнитура до 180 кг и минималистичные ручки без розетки.'
    },
    {
      slug: 'blog',
      file: 'blog.html',
      label: 'Журнал',
      sitelinkTitle: 'Инженерный журнал',
      description: 'Инженерные руководства по расчету ветровых, солнечных и сейсмических нагрузок фасадов и окон.'
    },
    {
      slug: 'about',
      file: 'about.html',
      label: 'Компания',
      sitelinkTitle: 'Компания CORTEC',
      description: 'Команда инженеров-конструкторов КМ/КМД, геодезия проемов и шеф-монтаж по ГОСТ 30971 в Грозном.'
    },
    {
      slug: 'contact',
      file: 'contact.html',
      label: 'Контакт',
      sitelinkTitle: 'Контакты в Грозном',
      description: 'Проектный отдел и шоурум узлов: г. Грозный, ул. Субры Кишиевой, 55. Тел.: +7 (928) 000-76-66.'
    }
  ],

  footerNav: [
    { file: 'index.html', label: 'Экспозиция' },
    { file: 'alutech.html', label: 'Системы ALUTECH' },
    { file: 'kbe.html', label: 'Немецкие окна KBE' },
    { file: 'kommerling.html', label: 'Системы KÖMMERLING' },
    { file: 'agc.html', label: 'Архитектурное стекло AGC' },
    { file: 'elements.html', label: 'Стеклопакеты и фурнитура' },
    { file: 'blog.html', label: 'Инженерный журнал' },
    { file: 'about.html', label: 'Компания' },
    { file: 'contact.html', label: 'Контакт' }
  ],

  footerSystems: [
    { file: 'alutech.html#stoechno-rigelnye-fasady', label: 'Стоечно-ригельные фасады ALUTECH' },
    { file: 'alutech.html#strukturnoe-osteklenie', label: 'Структурное остекление фасадов' },
    { file: 'alutech.html#razdvizhnye-resheniya', label: 'Подъемно-сдвижные порталы SL160' },
    { file: 'kbe.html#energoeffektivnye-konstrukcii', label: 'Энергоэффективные окна KBE 76' },
    { file: 'kommerling.html#aluclip-zero', label: 'Гибридные системы AluClip Zero' },
    { file: 'agc.html#stopray', label: 'Мультифункциональное стекло Stopray' },
    { file: 'elements.html#teplye-ramki', label: 'Теплые рамки Chromatech Ultra' },
    { file: 'elements.html#furnitura-i-ruchki', label: 'Скрытая фурнитура и ручки' }
  ]
};

site.areaServedSchema = [
  {
    '@type': 'AdministrativeArea',
    name: 'Чеченская Республика',
    identifier: 'RU-CE',
    containsPlace: site.regions.priority1.cities.map((c) => ({ '@type': 'City', name: c }))
  },
  ...site.regions.priority2.map((r) => ({
    '@type': 'AdministrativeArea',
    name: r.name,
    identifier: r.iso,
    containsPlace: r.cities.map((c) => ({ '@type': 'City', name: c }))
  }))
];

/**
 * Схема SiteNavigationElement для Google Sitelinks и Яндекс Быстрых ссылок (Навигационный ответ)
 */
site.siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${site.brand.domain}/#site-navigation`,
  name: 'Основные разделы сайта CORTEC',
  itemListElement: site.nav
    .filter((item) => item.slug !== 'index')
    .map((item, idx) => ({
      '@type': 'SiteNavigationElement',
      position: idx + 1,
      name: item.sitelinkTitle,
      description: item.description,
      url: `${site.brand.domain}/${item.file}`
    }))
};

/**
 * Каноническая схема организации (Google Business Profile + Яндекс Бизнес / Яндекс Карты)
 */
site.organizationSchema = {
  '@type': ['Organization', 'LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${site.brand.domain}/#organization`,
  name: site.brand.name,
  alternateName: site.og.siteAlternateNames,
  legalName: 'CORTEC — Архитектурные светопрозрачные конструкции (г. Грозный, Чеченская Республика)',
  url: `${site.brand.domain}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${site.brand.domain}/assets/img/cortec-logo.svg`
  },
  image: site.og.image,
  telephone: site.contact.phonePrimary.schema,
  email: site.contact.email,
  hasMap: site.contact.hasMapUrls,
  sameAs: site.contact.sameAsUrls,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'улица Субры Кишиевой, 55',
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    postalCode: site.contact.postalCode,
    addressCountry: 'RU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.contact.geo.lat,
    longitude: site.contact.geo.lng
  },
  areaServed: site.areaServedSchema,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00'
    }
  ],
  priceRange: '$$$',
  description: 'Инженерная компания по проектированию КМ/КМД, комплектации и шеф-монтажу архитектурных алюминиевых светопрозрачных конструкций ALUTECH, немецких оконно-дверных систем KBE и KÖMMERLING со стеклом AGC в Чеченской Республике и регионах Северного Кавказа.',
  knowsAbout: [
    'Панорамное и фасадное остекление в Грозном и Чеченской Республике',
    'Стоечно-ригельное фасадное остекление ALUTECH ALT F50',
    'Структурное и полуструктурное остекление фасадов',
    'Алюминиевые окна и двери с терморазрывом ALUTECH ALT W72',
    'Подъемно-сдвижные порталы ALUTECH ALT SL160 и KÖMMERLING PremiDoor 88',
    'Немецкие оконно-дверные системы KBE 76 greenline и KÖMMERLING 88 AluClip Zero',
    'Архитектурное мультифункциональное стекло AGC Stopray, Planibel Clearvision и Stratophone',
    'Сейсмостойкое остекление 8–9 баллов на Северном Кавказе'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.contact.phonePrimary.schema,
      contactType: 'engineering and sales',
      email: site.contact.email,
      areaServed: ['RU-CE', 'RU-IN', 'RU-DA', 'RU-SE', 'RU-KB', 'RU-STA', 'RU-KC'],
      availableLanguage: ['Russian']
    },
    {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneCard1.schema,
      contactType: 'customer support',
      areaServed: ['RU-CE', 'RU-IN', 'RU-DA', 'RU-SE', 'RU-KB', 'RU-STA', 'RU-KC'],
      availableLanguage: ['Russian']
    },
    {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneCard2.schema,
      contactType: 'customer support',
      areaServed: ['RU-CE', 'RU-IN', 'RU-DA', 'RU-SE', 'RU-KB', 'RU-STA', 'RU-KC'],
      availableLanguage: ['Russian']
    }
  ]
};

module.exports = site;
