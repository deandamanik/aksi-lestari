/**
 * Authentication redirection and returnTo helpers.
 * Handles extracting, building, and resolving return destinations
 * to preserve user context across login flows without open-redirect risks.
 */

/**
 * Normalizes and extracts safe return location coordinates from a React Router location object.
 * Preserves pathname, search, and hash.
 *
 * @param {object|string|null} location - Current router location or path string
 * @returns {{ pathname: string, search: string, hash: string }} Safe return location object
 */
export function buildReturnLocation(location) {
  if (!location) {
    return { pathname: '/', search: '', hash: '' }
  }

  if (typeof location === 'string') {
    const trimmed = location.trim()
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return { pathname: trimmed, search: '', hash: '' }
    }
    return { pathname: '/', search: '', hash: '' }
  }

  const rawPathname = typeof location.pathname === 'string' ? location.pathname.trim() : '/'
  const safePathname = rawPathname.startsWith('/') && !rawPathname.startsWith('//')
    ? rawPathname
    : '/'

  return {
    pathname: safePathname,
    search: typeof location.search === 'string' ? location.search : '',
    hash: typeof location.hash === 'string' ? location.hash : '',
  }
}

/**
 * Builds the navigation state passed to /login when an unauthenticated user triggers an AuthGate.
 * Preserves the full return location (pathname, search, hash) and optional action intent.
 *
 * @param {object|string|null} location - Current router location
 * @param {object|null} [intent=null] - Optional intent metadata for deferred action resumption
 * @returns {{ from: { pathname: string, search: string, hash: string }, intent?: object }}
 */
export function buildLoginState(location, intent = null) {
  const state = {
    from: buildReturnLocation(location),
  }

  if (intent && typeof intent === 'object') {
    state.intent = intent
  }

  return state
}

/**
 * Safely resolves the return destination path string from router location state.
 *
 * Priority:
 * 1. Return location from AuthGate (state.from as object { pathname, search, hash })
 * 2. Existing intended route (state.from as string or state.from.pathname)
 * 3. Fallback path (default: '/')
 *
 * Guaranteed safe:
 * - Falls back to safe fallback on null, undefined, non-local, or malformed state.
 * - Prevents protocol-relative ('//') and external URLs ('https://').
 *
 * @param {object|null} state - Location state (location.state)
 * @param {string} [fallback='/'] - Default route when returnTo is absent or invalid
 * @returns {string} Safe internal path string
 */
export function resolveReturnDestination(state, fallback = '/') {
  const safeFallback = (typeof fallback === 'string' && fallback.startsWith('/') && !fallback.startsWith('//'))
    ? fallback
    : '/'

  if (!state || !state.from) {
    return safeFallback
  }

  const { from } = state

  // Handle case where `from` is a plain string (e.g. '/komunitas?filter=active')
  if (typeof from === 'string') {
    const trimmed = from.trim()
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return trimmed
    }
    return safeFallback
  }

  // Handle case where `from` is an object (preferred shape)
  if (typeof from === 'object' && from !== null) {
    const rawPathname = typeof from.pathname === 'string' ? from.pathname.trim() : ''
    if (rawPathname.startsWith('/') && !rawPathname.startsWith('//')) {
      const search = typeof from.search === 'string' ? from.search : ''
      const hash = typeof from.hash === 'string' ? from.hash : ''
      return `${rawPathname}${search}${hash}`
    }
  }

  return safeFallback
}

/**
 * Extracts optional intent metadata from location state, if present.
 *
 * @param {object|null} state - Location state (location.state)
 * @returns {object|null} Intent metadata or null
 */
export function resolveReturnIntent(state) {
  if (state?.intent && typeof state.intent === 'object') {
    return state.intent
  }
  return null
}
