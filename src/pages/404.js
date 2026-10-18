const { renderBrandShowcase } = require('../components/BrandShowcase');

module.exports = {
  slug: '404',
  file: '404.html',
  title: 'Страница не найдена (404) — CORTEC technologies',
  description: 'Запрашиваемая страница не найдена или была перемещена. Перейдите в основные разделы архитектурного остекления CORTEC: ALUTECH, KBE, KÖMMERLING и AGC.',
  ogTitle: 'Страница не найдена (404) — CORTEC technologies',
  ogDescription: 'Вернитесь на главную экспозицию или выберите интересующую инженерную систему остекления.',
  twitterDescription: 'Страница не найдена — CORTEC technologies.',
  preloadImg: '',
  schemaJson: '',
  noindex: true,
  renderMain({ prefix = '' } = {}) {
    return `
    <section class="section-space-lg" style="padding-top: clamp(136px, 18vw, 200px);">
      <div class="container editorial-stagger">
        <div class="stagger-row reveal">
          <div class="stagger-left">
            <span class="eyebrow">Код ответа 404 · Навигация CORTEC</span>
            <h1 style="margin-bottom: 28px;">
              Страница не найдена.<br>
              <span class="halftone">Вернемся к точной геометрии.</span>
            </h1>
            <p class="lead-paragraph">
              Возможно, ссылка устарела или в адресе допущена опечатка. Выберите нужный инженерный раздел ниже или свяжитесь напрямую с проектным отделом CORTEC в Грозном.
            </p>
            <div class="btn-group">
              <a href="${prefix}index.html" class="btn-sand">На главную экспозицию</a>
              <a href="${prefix}contact.html" class="btn-oval">Контакты в Грозном</a>
              <a href="https://wa.me/79280007666" target="_blank" rel="noopener noreferrer" class="btn-oval">WhatsApp: +7 (928) 000-76-66</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderBrandShowcase({ prefix, currentSlug: '404' })}
    `;
  }
};
