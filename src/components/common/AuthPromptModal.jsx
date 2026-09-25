import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { buildLoginState } from '../../utils/authRedirect'

/**
 * AuthPromptModal
 * Lightweight, calm action-gate feedback modal.
 * Explains to the guest user why login is required before continuing a protected action.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose - Called on "Batalkan", backdrop click, or Escape
 * @param {string} [props.title='Masuk untuk melanjutkan']
 * @param {string} props.description - Explanatory context string
 * @param {object|string} [props.returnTo] - Destination to return to after login
 * @param {object|null} [props.intent] - Optional action intent metadata
 * @param {() => void} [props.onConfirm] - Custom confirm callback (optional)
 */
export default function AuthPromptModal({
  isOpen,
  onClose,
  title = 'Masuk untuk melanjutkan',
  description,
  returnTo,
  intent = null,
  onConfirm,
}) {
  const navigate = useNavigate()
  const modalBoxRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleLogin = () => {
    if (onConfirm) {
      onConfirm()
      return
    }
    if (returnTo) {
      navigate('/login', {
        state: buildLoginState(returnTo, intent),
      })
    } else {
      navigate('/login')
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-prompt-title"
      aria-describedby="auth-prompt-desc"
      onClick={onClose}
    >
      <div
        ref={modalBoxRef}
        className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 max-w-md w-full shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1.5">
          <h3
            id="auth-prompt-title"
            className="font-bold text-lg sm:text-xl text-stone-900 font-display tracking-tight"
          >
            {title}
          </h3>
          <p
            id="auth-prompt-desc"
            className="text-xs sm:text-sm text-stone-600 leading-relaxed font-body"
          >
            {description}
          </p>
        </div>

        <div className="mt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-xl text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 bg-transparent hover:bg-stone-100 transition-colors cursor-pointer select-none"
          >
            Batalkan
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#22603B] hover:bg-[#1A4B2E] transition-colors cursor-pointer shadow-xs active:scale-[0.98] select-none"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
