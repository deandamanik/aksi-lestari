import { Outlet } from 'react-router-dom'
import { LaporProvider } from '../context/LaporContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * LaporLayout
 *
 * Layout wrapper for all /lapor/* routes.
 * Scopes LaporProvider to the Lapor route tree only — context is not
 * available to non-Lapor routes and resets when the user navigates away.
 *
 * Visual shell is identical to MainLayout (Navbar + Outlet + Footer).
 */
function LaporLayout() {
  return (
    <LaporProvider>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </LaporProvider>
  )
}

export default LaporLayout
