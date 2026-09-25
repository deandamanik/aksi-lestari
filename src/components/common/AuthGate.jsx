import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { buildLoginState } from '../../utils/authRedirect'

/**
 * AuthGate
 * Shared authentication gate component.
 *
 * IF authenticated: renders children (or nested route Outlet).
 * IF unauthenticated: redirects to /login preserving the return location and optional intent.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] - Protected content to display when authenticated
 * @param {object|null} [props.intent=null] - Optional intent metadata for deferred action resumption
 */
export default function AuthGate({ children, intent = null }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={buildLoginState(location, intent)}
        replace
      />
    )
  }

  return children ?? <Outlet />
}
