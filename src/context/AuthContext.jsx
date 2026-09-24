import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'aksi_lestari_auth_user'
const USERS_LIST_KEY = 'aksi_lestari_registered_users'

// Default mock user for testing if no users exist
const DEFAULT_USER = {
  id: 'usr_demo_01',
  name: 'Budi Santoso',
  email: 'budi@aksilestari.id',
  role: 'Relawan Lestari',
  avatar: null,
  xp: 450,
  badge: 'Pejuang Lingkungan',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (err) {
      console.error('Failed to parse auth user from storage:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Helper: get list of registered users
  const getRegisteredUsers = () => {
    try {
      const list = localStorage.getItem(USERS_LIST_KEY)
      return list ? JSON.parse(list) : [DEFAULT_USER]
    } catch {
      return [DEFAULT_USER]
    }
  }

  // Login handler
  const login = async (email, password) => {
    // Simulate network delay for natural UX feedback
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!email || !password) {
      throw new Error('Email dan password wajib diisi.')
    }

    const users = getRegisteredUsers()
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    )

    // Allow login if user found, or dynamically authenticate with friendly profile
    const activeUser = matchedUser || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email.trim(),
      role: 'Relawan Lestari',
      avatar: null,
      xp: 100,
      badge: 'Relawan Baru',
    }

    setUser(activeUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser))
    return activeUser
  }

  // Register handler
  const register = async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 700))

    if (!name || !email || !password) {
      throw new Error('Semua kolom wajib diisi.')
    }

    const trimmedEmail = email.trim().toLowerCase()
    const users = getRegisteredUsers()

    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail)
    if (existingUser) {
      throw new Error('Email ini sudah terdaftar. Silakan masuk.')
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role: 'Relawan Lestari',
      avatar: null,
      xp: 50,
      badge: 'Sahabat Lestari',
      registeredAt: new Date().toISOString(),
    }

    const updatedUsers = [...users, newUser]
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedUsers))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  // Logout handler
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
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

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
