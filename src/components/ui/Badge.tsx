import { cn } from '../../utils/cn'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center uppercase tracking-widest text-xs font-medium text-neutral-500 dark:text-neutral-400', className)}>
      {label}
    </span>
  )
}
