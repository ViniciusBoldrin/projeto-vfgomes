import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:   'text-white disabled:opacity-50',
  secondary: 'bg-transparent disabled:opacity-50',
  danger:    'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50',
  ghost:     'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300',
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary:   { backgroundColor: 'var(--c-brand)', color: '#fff' },
  secondary: { borderColor: 'var(--c-accent)', color: 'var(--c-accent)', borderWidth: '1px', borderStyle: 'solid' },
  danger:    {},
  ghost:     {},
}

export function Button({ variant = 'primary', loading, children, className, disabled, style, ...props }: ButtonProps) {
  return (
    <button
      data-variant={variant}
      disabled={disabled || loading}
      style={{ ...variantStyles[variant], ...style }}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold tracking-widest uppercase rounded-lg transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
        'disabled:cursor-not-allowed',
        variantClasses[variant],
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
