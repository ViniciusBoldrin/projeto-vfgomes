import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-[100] flex items-center gap-3 px-5 py-3 text-white text-xs font-medium tracking-wide',
        'bg-black transition-all duration-300',
        visible ? 'opacity-100 translate-y-0 animate-fade-up' : 'opacity-0 -translate-y-2'
      )}
      role="status"
    >
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {message}
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type })
  }

  function closeToast() {
    setToast(null)
  }

  return { toast, showToast, closeToast }
}
