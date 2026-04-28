import { cn } from '../../utils/cn'

type ContainerSize = 'wide' | 'narrow' | 'full'

interface ContainerProps {
  children: React.ReactNode
  size?: ContainerSize
  className?: string
  as?: React.ElementType
}

const maxWidths: Record<ContainerSize, string | undefined> = {
  wide: 'var(--container-wide)',
  narrow: 'var(--container-narrow)',
  full: undefined,
}

export function Container({ children, size = 'wide', className, as: Tag = 'div' }: ContainerProps) {
  const maxWidth = maxWidths[size]

  return (
    <Tag
      data-container={size}
      className={cn('w-full mx-auto', className)}
      style={{
        maxWidth,
        paddingLeft: 'var(--container-px)',
        paddingRight: 'var(--container-px)',
      }}
    >
      {children}
    </Tag>
  )
}
