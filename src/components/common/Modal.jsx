import { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'

// Minimal active modal stack for nested modal safety (e.g. ActionDetailModal -> AuthPromptModal)
const activeModalStack = []

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'summary',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container) {
  if (!container) return []
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
  return elements.filter((el) => {
    if (el.hasAttribute('disabled')) return false
    if (el.getAttribute('aria-hidden') === 'true') return false
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  })
}

/**
 * Modal — Shared accessible dialog shell for AksiLestari.
 *
 * Responsibilities:
 * - Portal rendering to document.body
 * - Body scroll lock with previous style preservation
 * - Keyboard Escape dismissal (respecting active modal stack)
 * - Backdrop click dismissal
 * - Focus trap (Tab / Shift+Tab cycling within dialog)
 * - Initial focus management (initialFocusRef -> first focusable -> dialog surface)
 * - Focus restoration to previous activeElement on close/unmount
 * - Semantic dialog attributes (role="dialog", aria-modal="true", etc.)
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Whether dialog is currently displayed
 * @param {() => void} props.onClose - Dismiss callback
 * @param {import('react').ReactNode} props.children - Dialog body content
 * @param {string} [props.ariaLabel] - Accessible label if no visible title
 * @param {string} [props.ariaLabelledBy] - ID of visible heading element
 * @param {string} [props.ariaDescribedBy] - ID of descriptive text element
 * @param {import('react').RefObject} [props.initialFocusRef] - Control to receive initial focus
 * @param {boolean} [props.closeOnBackdrop=true] - Allow closing by clicking backdrop
 * @param {boolean} [props.closeOnEscape=true] - Allow closing with Escape key
 * @param {string} [props.className=''] - Custom styling applied to the dialog box container
 * @param {string} [props.backdropClassName=''] - Custom overlay backdrop styling overrides
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  initialFocusRef,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  backdropClassName = 'bg-stone-900/40',
}) {
  const modalId = useId()
  const dialogRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // 1. Capture currently focused element for restoration upon close
    previousActiveElementRef.current = document.activeElement

    // 2. Lock body scroll while preserving previous value
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // 3. Register on modal stack for nested modal safety
    activeModalStack.push(modalId)

    // 4. Initial focus placement
    const frameId = requestAnimationFrame(() => {
      if (
        initialFocusRef?.current &&
        typeof initialFocusRef.current.focus === 'function'
      ) {
        initialFocusRef.current.focus()
        return
      }

      const focusable = getFocusableElements(dialogRef.current)
      if (focusable.length > 0) {
        focusable[0].focus()
      } else if (dialogRef.current) {
        dialogRef.current.focus()
      }
    })

    // 5. Keydown handler for Escape & Focus Trap
    const handleKeyDown = (e) => {
      // Escape handling: only topmost modal in stack responds
      if (e.key === 'Escape' && closeOnEscape) {
        const isTopModal =
          activeModalStack[activeModalStack.length - 1] === modalId
        if (isTopModal) {
          e.preventDefault()
          e.stopPropagation()
          onClose?.()
          return
        }
      }

      // Focus trap handling: Tab and Shift+Tab
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current)
        if (focusable.length === 0) {
          e.preventDefault()
          dialogRef.current.focus()
          return
        }

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // 6. Cleanup on close or unmount
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('keydown', handleKeyDown)

      // Restore body overflow
      document.body.style.overflow = previousOverflow

      // Unregister from active modal stack
      const stackIndex = activeModalStack.lastIndexOf(modalId)
      if (stackIndex !== -1) {
        activeModalStack.splice(stackIndex, 1)
      }

      // Restore focus to previous element if valid and connected
      const prevElement = previousActiveElementRef.current
      if (
        prevElement &&
        typeof prevElement.focus === 'function' &&
        document.body.contains(prevElement)
      ) {
        try {
          prevElement.focus()
        } catch {
          // Gracefully fallback if focus cannot be restored
        }
      }
    }
  }, [isOpen, closeOnEscape, onClose, modalId, initialFocusRef])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop) {
      e.stopPropagation()
      onClose?.()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in ${backdropClassName}`}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={`relative z-10 outline-hidden ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
