/**
 * Deterministic mathematical helpers for scroll story interpolation.
 */

/**
 * Smooth cubic ease interpolation: 3t^2 - 2t^3 clamped between 0 and 1.
 * @param {number} t - Input value
 * @returns {number} Eased value
 */
export function smoothStep(t) {
  const clamped = Math.max(0, Math.min(1, t))
  return clamped * clamped * (3 - 2 * clamped)
}

/**
 * Maps normalized scroll runway progress p in [0, 1] to continuous stage index s in [0, 2].
 * Provides stable reading plateaus around integer stages and smooth cubic transitions.
 * @param {number} p - Normalized scroll progress [0, 1]
 * @returns {number} Continuous stage coordinate [0, 2]
 */
export function getStagePosition(p) {
  // Stage 0 Plateau: 0.00 -> 0.18
  if (p <= 0.18) return 0

  // Transition 0 -> 1: 0.18 -> 0.44
  if (p <= 0.44) {
    const t = (p - 0.18) / (0.44 - 0.18)
    return smoothStep(t)
  }

  // Stage 1 Plateau: 0.44 -> 0.62
  if (p <= 0.62) return 1

  // Transition 1 -> 2: 0.62 -> 0.88
  if (p <= 0.88) {
    const t = (p - 0.62) / (0.88 - 0.62)
    return 1 + smoothStep(t)
  }

  // Stage 2 Plateau: 0.88 -> 1.00
  return 2
}
