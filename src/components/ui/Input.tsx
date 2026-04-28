import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, className, placeholder, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="input-wrapper">
      <input
        id={inputId}
        placeholder=" "
        className={cn(
          'input-field',
          'w-full pb-2 bg-transparent border-0 border-b text-sm transition-colors',
          'text-black dark:text-white',
          'focus:outline-none focus:ring-0',
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-neutral-300 dark:border-neutral-600',
          className
        )}
        {...props}
      />
      <label htmlFor={inputId} className="input-label">
        {label}
      </label>
      {error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>}
    </div>
  )
}
