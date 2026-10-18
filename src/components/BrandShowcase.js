const brands = require('../data/brands');

function renderBrandShowcase(arg = '') {
  const prefix = typeof arg === 'string' ? arg : (arg && arg.prefix) || '';
  const cards = brands.map((b) => `          <!-- ${b.name} -->
          <a href="${prefix}${b.href}" class="brand-logo-card" aria-label="${b.ariaLabel}">
            <span class="brand-origin">${b.origin}</span>
            <div class="brand-type-wrap">
              <span class="brand-type-name">${b.name}</span>
              <span class="brand-type-sub">${b.sub}</span>
            </div>
            <p class="brand-summary">${b.summary}</p>
            <span class="brand-history-cta">${b.cta}</span>
          </a>`).join('\n\n');

  return `<div class="brand-logos-showcase reveal">
${cards}
        </div>`;
}

module.exports = { renderBrandShowcase };
