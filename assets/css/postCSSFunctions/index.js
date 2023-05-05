export const postCSSFunctions = {
  // get percent of 1em or 'target'
  percent: (per, target) => `calc(${target || '1em'} * ${per / 100})`,

  // easy way to get some distance
  units: (multiplier) => `${multiplier}rem`,

  // get "i" cols excluding gutter
  cols: (i) =>
    `calc(((100vw - var(--grid-outer-margin) * 2) - (var(--grid-col-count) - 1) * var(--grid-gutter)) / var(--grid-col-count) * ${i} + (var(--grid-gutter) * (${i} - 1)))`,

  // get "i" cols including gutter
  push: (i) =>
    `calc(((100vw - var(--grid-outer-margin) * 2) - (var(--grid-col-count) - 1) * var(--grid-gutter)) / var(--grid-col-count) * ${i} + (var(--grid-gutter) * ${i}))`,

  // given a px value, return a vw that is 1-zoom with that px value on a >beginFrom screen (everything scales [zoom] amount)
  mimic: (px, zoom = 0.5, beginFrom = 1680) =>
    `calc(${px} + ${
      parseInt(px) * zoom
    } * (100vw - ${beginFrom}px) / ${beginFrom})`,
}
