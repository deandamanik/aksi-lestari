import { useNavigate } from 'react-router-dom'
import { buildLoginState } from '../../utils/authRedirect'
import Button from './Button'
import Modal from './Modal'

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
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 max-w-md w-full shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
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
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          Batalkan
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleLogin}
          className="w-full sm:w-auto"
        >
          Masuk
        </Button>
      </div>
    </Modal>
  )
}
