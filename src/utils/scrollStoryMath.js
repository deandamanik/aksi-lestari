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
  // State 01 Reading Plateau: 0.00 -> 0.22 (generous reading time upon entry)
  if (p <= 0.22) return 0

  // Transition 01 -> 02: 0.22 -> 0.38 (smooth cubic handoff)
  if (p <= 0.38) {
    const t = (p - 0.22) / (0.38 - 0.22)
    return smoothStep(t)
  }

  // State 02 Reading Plateau: 0.38 -> 0.60 (clear reading plateau)
  if (p <= 0.60) return 1

  // Transition 02 -> 03: 0.60 -> 0.76 (smooth cubic handoff)
  if (p <= 0.76) {
    const t = (p - 0.60) / (0.76 - 0.60)
    return 1 + smoothStep(t)
  }

  // State 03 Reading Plateau & Terminal Hold: 0.76 -> 1.00 (reading + subtle hold before release)
  return 2
}
