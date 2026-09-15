import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Beranda from '../pages/Beranda'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Beranda />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
