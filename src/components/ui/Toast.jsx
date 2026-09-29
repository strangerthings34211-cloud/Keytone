import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Toast notification component.
 * @param {'success'|'error'} type
 * @param {string} message
 * @param {boolean} visible
 * @param {function} onClose
 */
export default function Toast({ type = 'success', message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl',
        'max-w-sm w-full mx-4',
        'animate-fade-up',
        isSuccess
          ? 'bg-seafoam-500/10 border border-seafoam-500/30 text-seafoam-700'
          : 'bg-red-500/10 border border-red-500/30 text-red-700'
      )}
    >
      {isSuccess ? (
        <CheckCircle size={20} className="shrink-0 text-seafoam-500" />
      ) : (
        <XCircle size={20} className="shrink-0 text-red-500" />
      )}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}
