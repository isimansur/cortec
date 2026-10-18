/**
 * Макро-компонент адаптивного AVIF-изображения
 * Вместо 7 строк HTML: pic('hero-volumetric-node', 'Описание', { prefix, priority: true })
 */
function pic(name, alt, opts = {}) {
  const prefix = opts.prefix || '';
  const loadingAttr = opts.eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"';
  const clsAttr = opts.className ? ` class="${opts.className}"` : '';
  const widthAttr = opts.width ? ` width="${opts.width}"` : '';
  const heightAttr = opts.height ? ` height="${opts.height}"` : '';

  return `<picture>
          <source media="(max-width: 768px)" srcset="${prefix}assets/img/${name}-sm.avif" type="image/avif">
          <img src="${prefix}assets/img/${name}.avif" alt="${alt}"${clsAttr}${widthAttr}${heightAttr}${loadingAttr}>
        </picture>`;
}

module.exports = { pic };
