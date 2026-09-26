import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon } from '../components/common/Icons'
import { ToastContext } from './toastContextDef'

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setToast(null)
  }, [])

  const showToast = useCallback((payload, duration = 4000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setToast(payload)
    timeoutRef.current = setTimeout(() => {
      setToast(null)
    }, duration)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const toastId =
    typeof toast === 'object' && toast?.id ? toast.id : 'global-toast-notification'
  const actionId =
    typeof toast === 'object' && toast?.actionId ? toast.actionId : undefined
  const actionTitle =
    typeof toast === 'object' && toast?.actionTitle ? toast.actionTitle : undefined

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast &&
        createPortal(
          <div
            id={toastId}
            role="status"
            aria-live="polite"
            data-action-id={actionId}
            data-action-title={actionTitle}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 z-50 sm:max-w-md bg-primary text-white p-4 rounded-2xl shadow-xl border border-white/10 flex items-start gap-3 animate-toast-enter"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <CheckIcon className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
            </div>
            <div className="flex-1 text-xs sm:text-sm leading-snug">
              {typeof toast === 'object' && toast !== null ? (
                <>
                  {toast.title && (
                    <div className="font-bold text-white mb-0.5 text-sm">
                      {toast.title}
                    </div>
                  )}
                  <div className="font-medium text-white/90">
                    {toast.message}
                  </div>
                </>
              ) : (
                <div className="font-medium">{toast}</div>
              )}
            </div>
            <button
              type="button"
              onClick={hideToast}
              className="text-white/70 hover:text-white transition-all duration-180 text-xs font-bold cursor-pointer p-1 -mr-1 -mt-0.5 rounded-full hover:bg-white/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              aria-label="Tutup notifikasi"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}
