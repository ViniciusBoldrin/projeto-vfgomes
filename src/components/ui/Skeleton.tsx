import { cn } from '../../utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg', className)}
    />
  )
}

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col gap-3" data-testid="loading">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}
