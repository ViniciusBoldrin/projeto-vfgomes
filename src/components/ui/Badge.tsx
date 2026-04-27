import { cn } from '../../utils/cn'

const categoryColors: Record<string, string> = {
  electronics: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  jewelery: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  "men's clothing": 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  "women's clothing": 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
}

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  const colorClass = categoryColors[label] ?? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colorClass, className)}>
      {label}
    </span>
  )
}
