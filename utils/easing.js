export const easeInQuad = (t) => t * t
export const easeOutQuad = (t) => t * (2 - t)

export const easeInCubic = (t) => t * t * t
export const easeOutCubic = (t) => --t * t * t + 1

export const easeInQuart = (t) => t * t * t * t
export const easeOutQuart = (t) => 1 - --t * t * t * t

export const easeInQuint = (t) => t * t * t * t * t
export const easeOutQuint = (t) => 1 + --t * t * t * t * t
export const easeInOutQuint = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
