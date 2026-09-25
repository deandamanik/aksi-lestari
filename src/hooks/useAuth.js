import { useContext } from 'react'
import { AuthContext } from '../context/authContextDef'

/**
 * useAuth hook
 * Provides access to the single demo account authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
