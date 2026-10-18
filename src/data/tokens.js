/**
 * МЕТАДАННЫЕ ДИЗАЙН-ТОКЕНОВ CORTEC
 * Используется для автоматической генерации документации и живого UI-Kit (/design-system/)
 */
module.exports = {
  colors: [
    { token: '--ds-bg-obsidian', hex: '#0A0B0D', desc: 'Матовый обсидиан (фасад шоурума, матовые визитки Plike, код-блоки)' },
    { token: '--ds-bg-deep', hex: '#111214', desc: 'Основной фон страниц (анодированный темный графит)' },
    { token: '--ds-bg-surface', hex: '#141619', desc: 'Поверхность карточек брендов, инженерных узлов и таблиц' },
    { token: '--ds-bg-elevated', hex: '#1A1D22', desc: 'Приподнятые поверхности в состоянии фокуса / наведения' },
    { token: '--ds-text-primary', hex: '#F7F8FA', desc: 'Основной архитектурный белый для заголовков и ключевых цифр' },
    { token: '--ds-text-secondary', hex: 'rgba(230, 234, 240, 0.68)', desc: 'Инженерный наборный текст (оптимальный контраст на темном фоне)' },
    { token: '--ds-text-muted', hex: 'rgba(214, 206, 198, 0.44)', desc: 'Полутоновый акцент .halftone для вторых частей заголовков' },
    { token: '--ds-text-micro', hex: 'rgba(224, 214, 204, 0.38)', desc: 'Микро-типографика: индексы, подписи узлов, нижний колонтитул визитки' },
    { token: '--ds-accent-sand', hex: '#C8A98E', desc: 'Теплый анодированный песочно-бронзовый акцент (ховеры, линии, бейджи)' },
    { token: '--ds-accent-sand-light', hex: '#DFC3AA', desc: 'Светлый блик анодированной бронзы для активных состояний' }
  ],
  typography: [
    { role: 'H1 Display Hero', token: '--ds-font-display', size: 'clamp(2.1rem, 4.4vw, 4.25rem)', weight: '200–300', sample: 'Архитектура света и тишины.' },
    { role: 'H2 Section Headline', token: '--ds-font-display', size: 'clamp(1.65rem, 3.1vw, 3.1rem)', weight: '200–300', sample: 'Четыре столпа светопрозрачной инженерии.' },
    { role: 'H3 Node Title', token: '--ds-font-display', size: 'clamp(1.2rem, 1.8vw, 1.65rem)', weight: '300', sample: 'Стоечно-ригельный контур ALT F50' },
    { role: 'Lead Editorial', token: '--ds-font-sans', size: 'clamp(1.05rem, 1.25vw, 1.28rem)', weight: '300', sample: 'Точный баланс статики, теплофизики и чистого горизонта.' },
    { role: 'Technical Mono / Eyebrow', token: '--ds-font-mono', size: '0.75rem (12px) · tracking 0.16em', weight: '400', sample: '6M1 Stopray Vision — 16Ar — 4.4.2 Stratophone · Rw 44 дБ' }
  ]
};
