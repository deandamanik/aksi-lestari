import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { useLenisScroll } from './hooks/useLenisScroll'

function GlobalScrollProvider({ children }) {
  useLenisScroll(true)
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalScrollProvider>
          <AppRoutes />
        </GlobalScrollProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App