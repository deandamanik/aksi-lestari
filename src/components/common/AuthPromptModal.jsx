import { useNavigate } from 'react-router-dom'
import { buildLoginState } from '../../utils/authRedirect'
import Modal from './Modal'

/**
 * AuthPromptModal
 * Simple, clean, and unified all-white action-gate modal.
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="auth-prompt-title"
      ariaDescribedBy="auth-prompt-desc"
      className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-6 sm:p-7 max-w-md w-full shadow-xl flex flex-col gap-5 sm:gap-6 animate-dialog-enter relative"
    >
      {/* Content Area */}
      <div className="flex flex-col gap-2">
        <h3
          id="auth-prompt-title"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug"
        >
          {title}
        </h3>
        <p
          id="auth-prompt-desc"
          className="text-sm text-stone-600 leading-relaxed font-body"
        >
          {description}
        </p>
      </div>

      {/* Actions: Unified all-white surface */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center h-10 px-5 sm:px-6 rounded-full bg-white hover:bg-stone-50 border border-border-warm text-stone-700 hover:text-stone-900 text-sm font-body font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-2xs w-full sm:w-auto select-none"
        >
          Batalkan
        </button>
        <button
          type="button"
          onClick={handleLogin}
          className="inline-flex items-center justify-center h-10 px-6 sm:px-7 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-body font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto select-none"
        >
          Masuk
        </button>
      </div>
    </Modal>
  )
}
