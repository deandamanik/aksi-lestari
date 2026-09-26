import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useLapor } from '../context/LaporContext'

/**
 * LaporFlowGuard
 *
 * Authoritative session guard for the entire Lapor workflow.
 *
 * Invariant:
 * - `/lapor` (photo upload entry): Always accessible without a photo.
 * - All mid-flow `/lapor/*` routes: Require a valid report photo in session (`reportData.temukan.photo.file`).
 *
 * If the session is lost (e.g., hard browser reload F5) or accessed directly without an active report,
 * immediately redirects to `/lapor` via replace so broken step states are never rendered or retained in history.
 *
 * In the guest -> login/register -> resume flow, the in-memory File survives SPA navigation across auth,
 * so the user seamlessly continues their report without interruption.
 */
function LaporFlowGuard() {
  const location = useLocation()
  const { reportData } = useLapor()

  const isEntryRoute = location.pathname === '/lapor' || location.pathname === '/lapor/'
  const hasValidPhoto = Boolean(reportData?.temukan?.photo?.file)

  if (!isEntryRoute && !hasValidPhoto) {
    return <Navigate to="/lapor" replace />
  }

  return <Outlet />
}

/**
 * LaporLayout
 *
 * Layout wrapper for all /lapor/* routes.
 * Scopes LaporFlowGuard to the Lapor route tree.
 * Rendered inside MainLayout's Outlet so Navbar and Footer remain persistent.
 */
function LaporLayout() {
  return <LaporFlowGuard />
}

export default LaporLayout
