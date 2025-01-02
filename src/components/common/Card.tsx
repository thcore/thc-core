import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

export type CardVariant = 'elevated' | 'outlined'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
}

export default function Card({ 
  variant = 'elevated',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radii-lg)]',
        // Variants
        variant === 'elevated' && 'bg-[var(--colors-background-primary)] shadow-[var(--shadows-md)] border border-[var(--colors-border-default)]',
        variant === 'outlined' && 'border border-[var(--colors-border-default)]',
        // Padding
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-[var(--container-spacing-sm)]',
        padding === 'md' && 'p-[var(--container-spacing-md)]',
        padding === 'lg' && 'p-[var(--container-spacing-lg)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}