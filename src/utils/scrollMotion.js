/**
 * Lightweight frame-rate-independent scroll motion smoothing utilities.
 *
 * Provides a damped interpolation model that separates TARGET scroll progress
 * from VISUAL scroll progress, creating subtle inertia without lag.
 *
 * Model: alpha = 1 - exp(-deltaTime / smoothingTime)
 *        current += (target - current) * alpha
 */

/**
 * Frame-rate-independent exponential smoothing toward a target value.
 * @param {number} current - Current visual value
 * @param {number} target - Target value from scroll calculation
 * @param {number} deltaTime - Time elapsed since last frame (ms)
 * @param {number} smoothingTime - Time constant controlling responsiveness (ms). Lower = snappier.
 * @returns {number} New smoothed value
 */
export function smoothTowards(current, target, deltaTime, smoothingTime) {
  if (smoothingTime <= 0 || deltaTime <= 0) return target
  const alpha = 1 - Math.exp(-deltaTime / smoothingTime)
  return current + (target - current) * alpha
}

/**
 * Check whether a visual value has settled close enough to its target.
 * @param {number} current
 * @param {number} target
 * @param {number} epsilon - Settling threshold
 * @returns {boolean}
 */
export function hasSettled(current, target, epsilon = 0.001) {
  return Math.abs(target - current) < epsilon
}

/**
 * Smoothstep easing: 3t² - 2t³, clamped to [0, 1].
 * Useful for crossfade weight calculation from continuous distance.
 * @param {number} t - Input value (will be clamped to [0, 1])
 * @returns {number} Eased value
 */
export function smoothStep(t) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}
