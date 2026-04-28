import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  children: React.ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400',
  secondary: 'bg-white text-black border border-black hover:bg-neutral-50 dark:bg-black dark:text-white dark:border-white dark:hover:bg-neutral-900',
  danger: 'bg-black text-white border border-red-600 hover:bg-red-600 disabled:opacity-50',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300',
}

export function Button({ variant = 'primary', loading, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : children}
    </button>
  )
}
