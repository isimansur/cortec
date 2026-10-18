const cluster1Chechnya = require('./cluster-1-chechnya');
const cluster2Caucasus = require('./cluster-2-caucasus');
const cluster3Alutech = require('./cluster-3-alutech');
const cluster4KbeKommerling = require('./cluster-4-kbe-kommerling');
const cluster5AgcGlass = require('./cluster-5-agc-glass');
const cluster6KmKmd = require('./cluster-6-km-kmd-montazh');

const BLOG_CLUSTERS = [
  {
    id: 'all',
    label: 'Все материалы',
    description: 'Полная база инженерных знаний CORTEC по фасадным, портальным и оконным технологиям на Северном Кавказе.'
  },
  {
    id: 'chechnya',
    label: 'Чеченская Республика',
    description: 'Проектирование КМ/КМД и шеф-монтаж в Грозном, Гудермесе, Шали, Аргуне, Урус-Мартане, Курчалое, Ведено и Итум-Кали.'
  },
  {
    id: 'caucasus',
    label: 'Северный Кавказ',
    description: 'Инженерные решения для Ингушетии (Магас, Назрань), Дагестана (Махачкала, Каспийск, Дербент, Хасавюрт), Осетии, КБР и КМВ.'
  },
  {
    id: 'alutech',
    label: 'Алюминий ALUTECH',
    description: 'Стоечно-ригельные и структурные фасады ALT F50, теплые окна ALT W72, тяжелые двери, анодирование и зенитные фонари.'
  },
  {
    id: 'kbe-kommerling',
    label: 'KBE & KÖMMERLING',
    description: 'Немецкая полимерная химия profine Group: гибрид AluClip Zero, статика темной ламинации со вклейкой стеклопакета и рецептура greenline.'
  },
  {
    id: 'agc',
    label: 'Оптика AGC Glass',
    description: 'Селективные покрытия Stopray с двойным серебром, просветленное стекло Planibel Clearvision, триплекс Stratophone и теплые рамки.'
  },
  {
    id: 'km-kmd',
    label: 'КМ/КМД и монтаж',
    description: 'Скрытая фурнитура до 180 кг, безрозеточные ручки, лазерная тахеометрия проемов и трехслойный монтаж по ГОСТ 30971.'
  }
];

const BLOG_POSTS = [
  ...cluster1Chechnya,
  ...cluster2Caucasus,
  ...cluster3Alutech,
  ...cluster4KbeKommerling,
  ...cluster5AgcGlass,
  ...cluster6KmKmd
].map((post, idx) => ({
  ...post,
  index: idx + 1,
  num: String(idx + 1).padStart(2, '0')
}));

const postMap = new Map(BLOG_POSTS.map((p) => [p.slug, p]));

function getPostBySlug(slug) {
  return postMap.get(slug) || null;
}

function getRelatedPosts(post) {
  const related = [];
  for (const rSlug of post.relatedSlugs || []) {
    const found = postMap.get(rSlug);
    if (found && found.slug !== post.slug) related.push(found);
  }
  if (related.length < 3) {
    for (const candidate of BLOG_POSTS) {
      if (candidate.slug !== post.slug && !related.find((r) => r.slug === candidate.slug)) {
        related.push(candidate);
      }
      if (related.length >= 3) break;
    }
  }
  return related.slice(0, 3);
}

module.exports = {
  BLOG_CLUSTERS,
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts
};
