import { useState } from 'react'
import { AuthContext, DEMO_USER } from './authContextDef'

const STORAGE_KEY = 'aksi_lestari_auth_user'

/**
 * AuthProvider component
 * Provides single demo user authentication state.
 */
export function AuthProvider({ children }) {
  // Lazy state initialization to read persisted demo user without effect-driven setState
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY)
      return savedUser ? DEMO_USER : null
    } catch {
      return null
    }
  })
  const [loading] = useState(false)

  // Single demo login: activates DEMO_USER immediately regardless of input
  const login = () => {
    setUser(DEMO_USER)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER))
    } catch (err) {
      console.error('Failed to save demo user to storage:', err)
    }
    return DEMO_USER
  }

  // Single demo register: alternate entry to DEMO_USER, activates immediately
  const register = () => {
    setUser(DEMO_USER)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER))
    } catch (err) {
      console.error('Failed to save demo user to storage:', err)
    }
    return DEMO_USER
  }

  // Logout clears demo session
  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Failed to remove demo user from storage:', err)
    }
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
