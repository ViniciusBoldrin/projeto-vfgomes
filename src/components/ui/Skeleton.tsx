import { cn } from '../../utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-neutral-100 dark:bg-neutral-800', className)}
    />
  )
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2" data-testid="loading">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-3 w-3/4 mt-2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  )
}
