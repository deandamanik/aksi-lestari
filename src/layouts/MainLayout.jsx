import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

function MainLayout() {
  const location = useLocation()
  const isPetaRoute = location.pathname.startsWith('/peta-sampah')
  const isQuizRoute = location.pathname.includes('/quiz')

  return (
    <div>
      <Navbar />
      <Outlet />
      {!isPetaRoute && !isQuizRoute && <Footer />}
    </div>
  )
}

export default MainLayout
