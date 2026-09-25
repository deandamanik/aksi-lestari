import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import AuthPromptModal from '../../../components/common/AuthPromptModal'

/**
 * ProtectedModuleLink
 * Link component that guards access to module details.
 * When authenticated, navigates normally.
 * When unauthenticated, prompts the user with action-gate feedback before redirecting to /login.
 */
export default function ProtectedModuleLink({ to, children, className = '', ...props }) {
  const { isAuthenticated } = useAuth()
  const [showPrompt, setShowPrompt] = useState(false)

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setShowPrompt(true)
    }
  }

  return (
    <>
      <Link to={to} onClick={handleClick} className={className} {...props}>
        {children}
      </Link>
      <AuthPromptModal
        isOpen={showPrompt}
        onClose={() => setShowPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk untuk melanjutkan pembelajaran dan menyimpan progresmu."
        returnTo={to}
        intent={{ type: 'open-module' }}
      />
    </>
  )
}
