document.addEventListener('DOMContentLoaded', () => {
const splitHeadingIntoWords = (heading) => {
if (heading.dataset.splitDone === 'true') return;
heading.dataset.splitDone = 'true';
let wordIndex = 0;
const processNode = (node) => {
if (node.nodeType === Node.TEXT_NODE) {
const text = node.textContent || '';
if (!text.trim()) return node.cloneNode(false);
const frag = document.createDocumentFragment();
const tokens = text.split(/(\s+)/);
tokens.forEach((token) => {
if (!token) return;
if (/^\s+$/.test(token)) {
frag.appendChild(document.createTextNode(' '));
} else {
const mask = document.createElement('span');
mask.className = 'word-mask';
const inner = document.createElement('span');
inner.className = 'word-inner';
inner.style.setProperty('--word-index', String(wordIndex++));
inner.textContent = token;
mask.appendChild(inner);
frag.appendChild(mask);
}
});
return frag;
}
if (node.nodeType === Node.ELEMENT_NODE) {
if (node.tagName === 'BR') {
return node.cloneNode(false);
}
const clone = node.cloneNode(false);
Array.from(node.childNodes).forEach((child) => {
clone.appendChild(processNode(child));
});
return clone;
}
return node.cloneNode(false);
};
const newChildren = document.createDocumentFragment();
Array.from(heading.childNodes).forEach((child) => {
newChildren.appendChild(processNode(child));
});
heading.innerHTML = '';
heading.appendChild(newChildren);
};
const isDesktop = window.matchMedia('(min-width: 1025px)');
if (isDesktop.matches) {
document.querySelectorAll('h1, h2:not(.blog-card-title)').forEach(splitHeadingIntoWords);
requestAnimationFrame(() => {
document.body.classList.add('is-loaded');
});
} else {
document.body.classList.add('is-loaded');
}
const header = document.querySelector('.site-header');
let headerTicking = false;
let cachedMaxScroll = 1;
const recalcMaxScroll = () => {
cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
};
recalcMaxScroll();
window.addEventListener('resize', recalcMaxScroll, { passive: true });
window.addEventListener('load', recalcMaxScroll, { once: true, passive: true });
const updateHeaderAndProgress = () => {
headerTicking = false;
const scrollY = window.scrollY;
if (header) {
if (scrollY > 32) {
header.classList.add('is-scrolled');
} else {
header.classList.remove('is-scrolled');
}
}
const progress = Math.min(1, Math.max(0, scrollY / cachedMaxScroll));
document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
};
window.addEventListener(
'scroll',
() => {
if (!headerTicking) {
headerTicking = true;
requestAnimationFrame(updateHeaderAndProgress);
}
},
{ passive: true }
);
updateHeaderAndProgress();
const menuBtn = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.main-nav');
const dropdown = document.querySelector('.nav-dropdown');
const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
if (dropdown && dropdownTrigger) {
dropdownTrigger.addEventListener('click', (e) => {
e.stopPropagation();
const isOpen = dropdown.classList.toggle('is-open');
dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
if (!dropdown.contains(e.target)) {
dropdown.classList.remove('is-open');
dropdownTrigger.setAttribute('aria-expanded', 'false');
}
});
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
dropdown.classList.remove('is-open');
dropdownTrigger.setAttribute('aria-expanded', 'false');
}
});
}
if (menuBtn && nav) {
menuBtn.addEventListener('click', () => {
const isOpen = nav.classList.toggle('is-open');
menuBtn.textContent = isOpen ? 'Закрыть' : 'Меню';
menuBtn.setAttribute('aria-expanded', String(isOpen));
document.body.style.overflow = isOpen ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach((link) => {
link.addEventListener('click', () => {
nav.classList.remove('is-open');
menuBtn.textContent = 'Меню';
menuBtn.setAttribute('aria-expanded', 'false');
document.body.style.overflow = '';
});
});
}
document.querySelectorAll('.editorial-stagger').forEach((stagger, idx) => {
if (stagger.querySelector('.stagger-rays-backdrop')) return;
const rows = Array.from(stagger.querySelectorAll(':scope > .stagger-row'));
const singleColRows = rows.filter((r) => r.children.length === 1).length;
if (singleColRows < 2) return;
const flip = idx % 2 === 1;
const backdrop = document.createElement('div');
backdrop.className = `stagger-rays-backdrop${flip ? ' is-flipped' : ''}`;
backdrop.setAttribute('aria-hidden', 'true');
backdrop.innerHTML = `
<svg class="stagger-rays-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="rayNodeGlow-${idx}" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="#F4F1EA" stop-opacity="0.65" />
<stop offset="40%" stop-color="#C8A98E" stop-opacity="0.22" />
<stop offset="100%" stop-color="#C8A98E" stop-opacity="0" />
</radialGradient>
</defs>
<!-- 4 ultra-thin hairline rays with non-scaling stroke -->
<path vector-effect="non-scaling-stroke" class="stagger-ray-line" d="M -60 920 Q 210 450 510 -40" />
<path vector-effect="non-scaling-stroke" class="stagger-ray-line stagger-ray-line--accent" d="M -60 920 Q 420 470 980 -40" />
<path vector-effect="non-scaling-stroke" class="stagger-ray-line" d="M -60 920 Q 620 530 1460 90" />
<path vector-effect="non-scaling-stroke" class="stagger-ray-line" d="M -60 920 Q 740 680 1480 460" />
<!-- Subtle micro-nodes along the rays -->
<g class="stagger-ray-nodes">
<circle cx="242" cy="422" r="5.5" fill="url(#rayNodeGlow-${idx})" />
<circle cx="242" cy="422" r="1.6" class="stagger-node-core" />
<circle cx="512" cy="396" r="6" fill="url(#rayNodeGlow-${idx})" />
<circle cx="512" cy="396" r="1.8" class="stagger-node-core" />
<circle cx="812" cy="128" r="5.5" fill="url(#rayNodeGlow-${idx})" />
<circle cx="812" cy="128" r="1.6" class="stagger-node-core" />
<circle cx="786" cy="466" r="6" fill="url(#rayNodeGlow-${idx})" />
<circle cx="786" cy="466" r="1.8" class="stagger-node-core" />
<circle cx="1146" cy="566" r="5.5" fill="url(#rayNodeGlow-${idx})" />
<circle cx="1146" cy="566" r="1.6" class="stagger-node-core" />
</g>
<!-- Slow, meditative gliding micro-nodes (45s - 60s cycle) -->
<g class="stagger-travellers">
<circle r="2" class="stagger-traveller-dot">
<animateMotion dur="48s" begin="-12s" repeatCount="indefinite" path="M -60 920 Q 420 470 980 -40" />
</circle>
<circle r="2.2" class="stagger-traveller-dot stagger-traveller-dot--gold">
<animateMotion dur="58s" begin="-26s" repeatCount="indefinite" path="M -60 920 Q 620 530 1460 90" />
</circle>
</g>
</svg>
`;
stagger.insertBefore(backdrop, stagger.firstChild);
});
const revealItems = document.querySelectorAll('.reveal, .apex-five-strip, .editorial-stagger');
if ('IntersectionObserver' in window && revealItems.length > 0) {
const revealObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
revealObserver.unobserve(entry.target);
}
});
},
{ threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
);
revealItems.forEach((el) => revealObserver.observe(el));
} else {
revealItems.forEach((el) => el.classList.add('is-visible'));
}
const macroStages = document.querySelectorAll('.macro-stage');
if ('IntersectionObserver' in window && macroStages.length > 0) {
const stageObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('is-inview');
} else {
entry.target.classList.remove('is-inview');
}
});
},
{ threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
);
macroStages.forEach((stage) => stageObserver.observe(stage));
}
const parallaxScenes = document.querySelectorAll('.hero-viewport, .macro-stage');
let currentScrollY = window.scrollY;
let targetScrollY = window.scrollY;
let rafRunning = false;
const updateParallaxFrame = () => {
if (!isDesktop.matches) {
rafRunning = false;
return;
}
currentScrollY += (targetScrollY - currentScrollY) * 0.14;
const vh = window.innerHeight;
const imgAmp = -38;
const txtAmp = 16;
parallaxScenes.forEach((scene) => {
const rect = scene.getBoundingClientRect();
if (rect.bottom < -200 || rect.top > vh + 200) return;
const centerOffset = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
const imgShift = (centerOffset * imgAmp).toFixed(2);
const textShift = (centerOffset * txtAmp).toFixed(2);
scene.style.setProperty('--stage-parallax-y', `${imgShift}px`);
scene.style.setProperty('--text-parallax-y', `${textShift}px`);
});
if (Math.abs(targetScrollY - currentScrollY) > 0.25) {
requestAnimationFrame(updateParallaxFrame);
} else {
rafRunning = false;
}
};
if (isDesktop.matches) {
window.addEventListener(
'scroll',
() => {
targetScrollY = window.scrollY;
if (!rafRunning) {
rafRunning = true;
requestAnimationFrame(updateParallaxFrame);
}
},
{ passive: true }
);
updateParallaxFrame();
}
const focusCards = document.querySelectorAll('.brand-logo-card, .apex-strip-item');
if ('IntersectionObserver' in window && focusCards.length > 0) {
const focusObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('is-mobile-focus');
} else {
entry.target.classList.remove('is-mobile-focus');
}
});
},
{ threshold: 0.45, rootMargin: '-15% 0px -15% 0px' }
);
focusCards.forEach((c) => focusObserver.observe(c));
}
const heroViewport = document.querySelector('.hero-viewport');
if (heroViewport && isDesktop.matches) {
heroViewport.addEventListener('mousemove', (e) => {
const rect = heroViewport.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
heroViewport.style.setProperty('--hero-x', `${x.toFixed(1)}px`);
heroViewport.style.setProperty('--hero-y', `${y.toFixed(1)}px`);
});
}
const magneticButtons = document.querySelectorAll('.btn-sand, .btn-oval, .header-cta');
magneticButtons.forEach((btn) => {
btn.addEventListener('mousemove', (e) => {
if (!isDesktop.matches) return;
const rect = btn.getBoundingClientRect();
const relX = e.clientX - rect.left;
const relY = e.clientY - rect.top;
const magX = ((relX / rect.width) - 0.5) * 10;
const magY = ((relY / rect.height) - 0.5) * 8 - 2;
btn.style.setProperty('--mag-x', `${magX.toFixed(1)}px`);
btn.style.setProperty('--mag-y', `${magY.toFixed(1)}px`);
btn.style.setProperty('--glow-x', `${relX.toFixed(0)}px`);
btn.style.setProperty('--glow-y', `${relY.toFixed(0)}px`);
});
btn.addEventListener('mouseleave', () => {
btn.style.setProperty('--mag-x', '0px');
btn.style.setProperty('--mag-y', '0px');
});
});
const brandCards = document.querySelectorAll('.brand-logo-card');
brandCards.forEach((card) => {
card.addEventListener('mousemove', (e) => {
if (!isDesktop.matches) return;
const rect = card.getBoundingClientRect();
card.style.setProperty('--glow-x', `${(e.clientX - rect.left).toFixed(0)}px`);
card.style.setProperty('--glow-y', `${(e.clientY - rect.top).toFixed(0)}px`);
});
});
const stripItems = document.querySelectorAll('.apex-strip-item');
stripItems.forEach((item) => {
item.addEventListener('mousemove', (e) => {
if (!isDesktop.matches) return;
const rect = item.getBoundingClientRect();
const relX = e.clientX - rect.left;
const relY = e.clientY - rect.top;
const normX = relX / rect.width - 0.5;
const normY = relY / rect.height - 0.5;
const tiltX = (normY * -7).toFixed(2);
const tiltY = (normX * 7).toFixed(2);
item.style.setProperty('--tilt-x', `${tiltX}deg`);
item.style.setProperty('--tilt-y', `${tiltY}deg`);
item.style.setProperty('--glow-x', `${relX.toFixed(0)}px`);
item.style.setProperty('--glow-y', `${relY.toFixed(0)}px`);
});
item.addEventListener('mouseleave', () => {
item.style.setProperty('--tilt-x', '0deg');
item.style.setProperty('--tilt-y', '0deg');
});
});
const stripCarousel = document.querySelector('.apex-five-strip');
if (stripCarousel && window.innerWidth <= 768) {
const middleCard = stripCarousel.children[2];
if (middleCard) {
requestAnimationFrame(() => {
const scrollLeft =
middleCard.offsetLeft - (stripCarousel.clientWidth - middleCard.clientWidth) / 2;
stripCarousel.scrollTo({ left: scrollLeft, behavior: 'instant' });
});
}
}
const contactForm = document.querySelector('#cortec-contact-form');
const feedbackEl = document.querySelector('#form-feedback');
const phoneInput = document.querySelector('#contact-info');
const objectTypeInput = document.querySelector('#object-type-input');
const tactilePills = document.querySelectorAll('.tactile-pill[data-pill-group="object"]');
if (phoneInput) {
const formatRussianPhone = (rawVal) => {
let digits = rawVal.replace(/\D/g, '');
if (!digits) return '';
if (digits[0] === '8' || digits[0] === '7') {
digits = digits.slice(1);
}
digits = digits.slice(0, 10);
let formatted = '+7';
if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);
return formatted;
};
phoneInput.addEventListener('keydown', (e) => {
if (e.ctrlKey || e.metaKey || e.altKey) return;
const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End', 'Enter'];
if (allowedKeys.includes(e.key)) {
if (e.key === 'Backspace' && phoneInput.value === '+7') {
e.preventDefault();
phoneInput.value = '';
}
return;
}
if (!/^\d$/.test(e.key) && !(e.key === '+' && phoneInput.value.length === 0)) {
e.preventDefault();
}
});
phoneInput.addEventListener('input', () => {
phoneInput.value = formatRussianPhone(phoneInput.value);
phoneInput.setCustomValidity('');
});
}
if (tactilePills.length > 0 && objectTypeInput) {
tactilePills.forEach((pill) => {
pill.addEventListener('click', () => {
tactilePills.forEach((p) => p.classList.remove('is-selected'));
pill.classList.add('is-selected');
objectTypeInput.value = pill.dataset.pillValue || '';
});
});
}
if (contactForm && feedbackEl) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
const formData = new FormData(contactForm);
const name = (formData.get('name') || '').toString().trim();
const contact = (formData.get('contact') || '').toString().trim();
const digitsOnly = contact.replace(/\D/g, '');
if (digitsOnly.length < 11) {
if (phoneInput) {
phoneInput.setCustomValidity('Пожалуйста, введите полный номер телефона (10 цифр после +7).');
phoneInput.reportValidity();
}
return;
}
const objectType = (formData.get('objectType') || '').toString().trim();
const system = (formData.get('system') || '').toString().trim();
const message = (formData.get('message') || '').toString().trim();
const domainHost = contactForm.dataset.domain || 'cortectech.pro';
const whatsappPhone = contactForm.dataset.whatsapp || '79280007666';
const lines = [
`Здравствуйте, CORTEC! Заявка с сайта ${domainHost}:`,
name ? `• Имя: ${name}` : '',
contact ? `• Телефон: ${contact}` : '',
objectType ? `• Тип объекта: ${objectType}` : '',
system ? `• Система: ${system}` : '',
message ? `• Задача / объект: ${message}` : ''
].filter(Boolean);
const waUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
window.open(waUrl, '_blank', 'noopener,noreferrer');
feedbackEl.textContent = name
? `${name}, заявка сформирована и открыта в WhatsApp инженера CORTEC (+7 928 000-76-66).`
: 'Заявка сформирована и открыта в WhatsApp инженера CORTEC (+7 928 000-76-66).';
});
}
const skfoNodes = document.querySelectorAll('.skfo-node[data-region-id]');
const skfoPassport = document.querySelector('#skfo-live-passport');
if (skfoNodes.length > 0 && skfoPassport) {
const badgeEl = document.querySelector('#skfo-passport-badge');
const titleEl = document.querySelector('#skfo-passport-title');
const descEl = document.querySelector('#skfo-passport-desc');
const windEl = document.querySelector('#skfo-passport-wind');
const sysEl = document.querySelector('#skfo-passport-sys');
const linkEl = document.querySelector('#skfo-passport-link');
const arcPaths = document.querySelectorAll('.skfo-arcs-group path[data-arc]');
const regionChips = document.querySelectorAll('[data-region-trigger]');
const REGION_PASSPORTS = {
grozny: {
badge: 'Приоритет №1 · Штаб-квартира и шоурум',
title: 'г. Грозный (ул. Субры Кишиевой, 55)',
desc: 'Проектный отдел КМ/КМД, полноразмерная экспозиция узлов ALUTECH, KBE, KÖMMERLING и стекла AGC. Выезд инженера-геодезиста с 3D-тахеометром по Грозному — в день обращения.',
wind: 'III ветровой р-н · 8–9 баллов',
sys: 'ALT F50 / W72 · Stopray · КМ/КМД',
href: 'blog/panoramnoe-osteklenie-grozny.html'
},
gudermes: {
badge: 'Приоритет №1 · Чеченская Республика (Восток)',
title: 'Гудермес и Гудермесский район',
desc: 'Оперативный выезд бригады геодезистов (40 минут из штаб-квартиры в Грозном). Остекление частных резиденций и коммерческих объектов с повышенной солнцезащитой.',
wind: 'III–IV ветровой р-н · 8 баллов',
sys: 'ALUTECH W72 · KBE 76 · AGC Stopray',
href: 'blog/osteklenie-kottedzhey-gudermes-shali-argun.html'
},
argun: {
badge: 'Приоритет №1 · Центральная агломерация ЧР',
title: 'Аргун, Шали и Курчалой',
desc: 'Прямая логистика спецтранспортом с пирамидами для джамбо-стеклопакетов (20–35 минут от Грозного). Монтаж порталов SL160 и витражей F50 по ГОСТ 30971.',
wind: 'III ветровой р-н · 8–9 баллов',
sys: 'ALT SL160 / F50 · KÖMMERLING 88',
href: 'blog/osteklenie-kottedzhey-gudermes-shali-argun.html'
},
urus: {
badge: 'Приоритет №1 · Юго-Западное направление ЧР',
title: 'Урус-Мартан и Ачхой-Мартан',
desc: 'Комплексное остекление загородных домов и коттеджей: немецкие системы KBE 76 / KÖMMERLING 88 и теплые алюминиевые входные группы ALUTECH W72 HD.',
wind: 'III ветровой р-н · 8 баллов',
sys: 'KBE 76 · KÖMMERLING 88 · ALT W72',
href: 'blog/okna-kbe-grozny-chechnya.html'
},
vedeno: {
badge: 'Приоритет №1 · Горный кластер (до 1900 м)',
title: 'Ведено, Беной и озеро Кезеной-Ам',
desc: 'Остекление высокогорных шале и туристических комплексов. Стеклопакеты с компенсацией барометрического давления и закаленным триплексом AGC.',
wind: 'IV–V ветровой р-н · Высокогорье',
sys: 'ALT F50 / W72 · Закаленный триплекс AGC',
href: 'blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html'
},
itumkali: {
badge: 'Приоритет №1 · Аргунское ущелье (до 2200 м)',
title: 'Шатой, Итум-Кали и Ведучи',
desc: 'Инженерный расчет ветровых и снеговых нагрузок для горного рельефа. Усиленные стойки ALT F50, сейсмостойкие плавающие узлы примыкания к камню и бетону.',
wind: 'V ветровой р-н · Сейсмика 9 баллов',
sys: 'ALT F50 / SKL50 · Сейсмоузлы КМД',
href: 'blog/osteklenie-v-gornyh-raionah-chechni-vedeno-itum-kali.html'
},
naurskaya: {
badge: 'Приоритет №1 · Северные степные районы ЧР',
title: 'Наурская, Шелковская и Надтеречный р-н',
desc: 'Защита от экстремальной летней инсоляции (+42 °C) и пыльных ветров: магнетронное напыление AGC Stopray и двухконтурное EPDM-уплотнение притворов.',
wind: 'IV ветровой р-н · Высокая инсоляция',
sys: 'AGC Stopray · KBE 76 · ALT W62/W72',
href: 'blog/stoechno-rigelnoe-osteklenie-grozny.html'
},
magas: {
badge: 'Приоритет №2 · Республика Ингушетия',
title: 'Магас, Назрань и Джейрахский район',
desc: 'Выезд геодезиста с 3D-тахеометром из Грозного за 1 час. Панорамные фасады, окна со скрытой створкой и точные узлы примыкания к каменной облицовке.',
wind: 'III–IV ветровой р-н · 8–9 баллов',
sys: 'ALT F50 / W72 · KÖMMERLING AluClip',
href: 'blog/panoramnoe-osteklenie-magas-nazran-ingushetiya.html'
},
makhachkala: {
badge: 'Приоритет №2 · Республика Дагестан (Каспий)',
title: 'Махачкала и Каспийск',
desc: 'Проектирование с учетом штормовой ветровой нагрузки Каспия и морского аэрозоля: анодированный алюминий ALUTECH и нержавеющая фурнитура.',
wind: 'IV–V ветровой р-н · Морской климат',
sys: 'ALT F50 / SL160 · Анодирование · Stopray',
href: 'blog/alyuminievye-fasady-i-okna-mahachkala-kaspiysk-dagestan.html'
},
derbent: {
badge: 'Приоритет №2 · Южный Дагестан',
title: 'Дербент и прибрежный кластер',
desc: 'Остекление отелей, вилл и коммерческих пространств: селективное стекло AGC с низким солярным фактором и крупноформатные раздвижные порталы.',
wind: 'IV ветровой р-н · Субтропическая инсоляция',
sys: 'ALT SL160 · AGC Energy Light / Stopray',
href: 'blog/alyuminievye-fasady-i-okna-mahachkala-kaspiysk-dagestan.html'
},
khasavyurt: {
badge: 'Приоритет №2 · Западный Дагестан',
title: 'Хасавюрт и Кизилюрт',
desc: 'Быстрая логистика по федеральной трассе Р-217 «Кавказ» напрямую из Грозного (45 минут). Энергоэффективные окна KBE 76, KÖMMERLING 88 и витражи ALUTECH.',
wind: 'III–IV ветровой р-н · 8–9 баллов',
sys: 'KBE 76 · KÖMMERLING 88 · ALT W72',
href: 'blog/okna-kbe-kommerling-hasavyurt-kizlyar.html'
},
kizlyar: {
badge: 'Приоритет №2 · Северный Дагестан',
title: 'Кизляр и Кизлярский район',
desc: 'Инженерная защита от летнего перегрева (+42 °C) и ветровой нагрузки: мультифункциональные стеклопакеты AGC Stopray и немецкие системы KBE 76 / KÖMMERLING 88.',
wind: 'IV ветровой р-н · Высокая инсоляция',
sys: 'AGC Stopray · KBE 76 · KÖMMERLING 88',
href: 'blog/okna-kbe-kommerling-hasavyurt-kizlyar.html'
},
vladikavkaz: {
badge: 'Приоритет №2 · РСО-Алания',
title: 'Владикавказ, Фиагдон и Цей',
desc: 'Архитектурное остекление городских особняков и горных шале в Куртатинском ущелье: просветленное стекло AGC Clearvision и порталы PremiDoor 88 / SL160.',
wind: 'III–V ветровой р-н · Горные долины',
sys: 'ALT W72 / SL160 · AGC Clearvision',
href: 'blog/arhitekturnoe-osteklenie-vladikavkaz-osetiya.html'
},
nalchik: {
badge: 'Приоритет №2 · Кабардино-Балкария (КБР)',
title: 'Нальчик и предгорные резиденции',
desc: 'Крупноформатные панорамные окна, угловые витражи со структурным швом SG и подъемно-сдвижные террасные системы с безбарьерным порогом.',
wind: 'III ветровой р-н · 8 баллов',
sys: 'ALT SL160 · KÖMMERLING PremiDoor 88',
href: 'blog/panoramnye-okna-i-portaly-nalchik-kbr.html'
},
elbrus: {
badge: 'Приоритет №2 · Высокогорный кластер КБР',
title: 'Приэльбрусье (Терскол, Поляна Азау)',
desc: 'Спецпроекты остекления на высотах свыше 2000 м: расчет снеговой нагрузки на зенитные фонари ALT SKL50 и выравнивание давления в стеклопакетах.',
wind: 'V–VI ветровой р-н · Высота 2000+ м',
sys: 'ALT SKL50 / F50 · Триплекс AGC',
href: 'blog/panoramnye-okna-i-portaly-nalchik-kbr.html'
},
kmv: {
badge: 'Приоритет №2 · Кавказские Минеральные Воды',
title: 'Пятигорск, Кисловодск и Ессентуки',
desc: 'Остекление частных вилл, санаторных и гостиничных комплексов: акустический триплекс AGC Stratophone (до 44 дБ) и панорамные порталы.',
wind: 'III–IV ветровой р-н · Курортная зона',
sys: 'ALT W72 / SL160 · AGC Stratophone',
href: 'blog/osteklenie-rezidenciy-pyatigorsk-kislovodsk-kmv.html'
},
kchr: {
badge: 'Приоритет №2 · Карачаево-Черкесия (КЧР)',
title: 'Черкесск, Архыз и Домбай',
desc: 'Сейсмостойкие витражные фасады и панорамные окна для всесезонных горных курортов с двухкамерными энергосберегающими стеклопакетами (Ug до 0.6).',
wind: 'IV–V ветровой р-н · Сейсмика 8–9 баллов',
sys: 'ALT F50 / W72 · KÖMMERLING 88',
href: 'blog/seysmostoykoe-osteklenie-severnyy-kavkaz.html'
}
};
const activateRegion = (regionId) => {
const data = REGION_PASSPORTS[regionId];
if (!data) return;
skfoNodes.forEach((node) => {
node.classList.toggle('is-active', node.dataset.regionId === regionId);
});
arcPaths.forEach((path) => {
path.classList.toggle('is-highlighted', path.dataset.arc === regionId);
});
regionChips.forEach((chip) => {
chip.classList.toggle('is-active-chip', chip.dataset.regionTrigger === regionId);
});
if (badgeEl) badgeEl.textContent = data.badge;
if (titleEl) titleEl.textContent = data.title;
if (descEl) descEl.textContent = data.desc;
if (windEl) windEl.textContent = data.wind;
if (sysEl) sysEl.textContent = data.sys;
if (linkEl) linkEl.setAttribute('href', data.href);
};
skfoNodes.forEach((node) => {
node.addEventListener('click', () => activateRegion(node.dataset.regionId));
node.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
activateRegion(node.dataset.regionId);
}
});
});
regionChips.forEach((chip) => {
chip.addEventListener('mouseenter', () => activateRegion(chip.dataset.regionTrigger));
chip.addEventListener('focus', () => activateRegion(chip.dataset.regionTrigger));
});
}
const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const isSaveData = Boolean(conn && (conn.saveData || (conn.effectiveType && conn.effectiveType.includes('2g'))));
if (!isSaveData) {
const prefetchedUrls = new Set();
const prefetchInternalPage = (anchor) => {
if (!anchor || !anchor.href) return;
try {
const url = new URL(anchor.href, window.location.href);
if (url.origin !== window.location.origin) return;
if (url.pathname === window.location.pathname && url.hash) return;
const cleanHref = url.origin + url.pathname;
if (prefetchedUrls.has(cleanHref)) return;
prefetchedUrls.add(cleanHref);
const link = document.createElement('link');
link.rel = 'prefetch';
link.href = cleanHref;
link.as = 'document';
document.head.appendChild(link);
} catch (_) {}
};
document.addEventListener(
'pointerenter',
(e) => {
const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
if (a) prefetchInternalPage(a);
},
{ passive: true, capture: true }
);
document.addEventListener(
'touchstart',
(e) => {
const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
if (a) prefetchInternalPage(a);
},
{ passive: true }
);
}
});