import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { LaporProvider } from './context/LaporContext'
import { useLenisScroll } from './hooks/useLenisScroll'

function GlobalScrollProvider({ children }) {
  useLenisScroll(true)
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <LaporProvider>
            <GlobalScrollProvider>
              <AppRoutes />
            </GlobalScrollProvider>
          </LaporProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App