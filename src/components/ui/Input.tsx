import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full pb-2 bg-transparent border-0 border-b text-sm transition-colors',
          'text-black dark:text-white placeholder-neutral-400',
          'focus:outline-none focus:ring-0',
          error
            ? 'border-red-500 dark:border-red-400'
            : 'border-neutral-300 dark:border-neutral-600 focus:border-black dark:focus:border-white',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>}
    </div>
  )
}
