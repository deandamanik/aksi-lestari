import { Outlet } from 'react-router-dom'
import { LaporProvider } from '../context/LaporContext'

/**
 * LaporLayout
 *
 * Layout wrapper for all /lapor/* routes.
 * Scopes LaporProvider to the Lapor route tree only — context is not
 * available to non-Lapor routes and resets when the user navigates away.
 *
 * Rendered inside MainLayout's Outlet so Navbar and Footer remain persistent.
 */
function LaporLayout() {
  return (
    <LaporProvider>
      <Outlet />
    </LaporProvider>
  )
}

export default LaporLayout
