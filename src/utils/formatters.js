/**
 * formatters.js — Pure formatting helpers for AksiLestari.
 *
 * All utilities in this module are pure, deterministic, UI-agnostic,
 * and dependency-free.
 */

/**
 * Formats a numeric value into Indonesian Rupiah currency representation.
 * Example: 10000 -> "Rp10.000"
 *
 * @param {number | string | null | undefined} value
 * @returns {string}
 */
export function formatRupiah(value) {
  const num = typeof value === 'number' ? value : Number(value) || 0
  return `Rp${num.toLocaleString('id-ID')}`
}

/**
 * Formats a file size in bytes into human-readable representation.
 * Example: 1048576 -> "1 MB", 0 -> "0 B"
 *
 * @param {number | null | undefined} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(1))
  return `${formatted} ${sizes[i] || 'MB'}`
}

/**
 * Formats a date value using Indonesian locale conventions.
 *
 * @param {Date | string | number | null | undefined} value
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDate(
  value,
  options = { day: 'numeric', month: 'short', year: 'numeric' }
) {
  if (!value) return ''
  try {
    const date = value instanceof Date ? value : new Date(value)
    if (isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('id-ID', options).format(date)
  } catch {
    return ''
  }
}

/**
 * Formats a timestamp into date and time string using Indonesian locale.
 * Default style: medium date and short time (e.g., "25 Sep 2026 14.30").
 *
 * @param {Date | string | number | null | undefined} value
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDateTime(
  value,
  options = { dateStyle: 'medium', timeStyle: 'short' }
) {
  if (!value) return ''
  try {
    const date = value instanceof Date ? value : new Date(value)
    if (isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('id-ID', options).format(date)
  } catch {
    return ''
  }
}
