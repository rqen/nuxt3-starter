// remap nr-range [low, high] to [min, max]
// ex: (0, 100, 0, 1)(50) => 0.5
export const interpolate = (low, high, min, max) => (val) =>
  ((max - min) * (val - low)) / (high - low) + min
