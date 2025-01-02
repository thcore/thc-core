import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[var(--colors-state-subtle)] text-[var(--colors-text-secondary)] ring-1 ring-[var(--colors-state-subtle)]',
  primary: 'bg-[var(--colors-action-primarySubtle)] text-[var(--colors-action-primary)] ring-1 ring-[var(--colors-action-primarySubtle)]',
  success: 'bg-[var(--colors-feedback-successSubtle)] text-[var(--colors-feedback-successStrong)] ring-1 ring-[var(--colors-feedback-successSubtle)]',
  warning: 'bg-[var(--colors-feedback-warningSubtle)] text-[var(--colors-feedback-warningStrong)] ring-1 ring-[var(--colors-feedback-warningSubtle)]',
  danger: 'bg-[var(--colors-feedback-dangerSubtle)] text-[var(--colors-feedback-dangerStrong)] ring-1 ring-[var(--colors-feedback-dangerSubtle)]',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'text-[12px] px-[6px] py-[2px] leading-[1.2]',
  md: 'text-[14px] px-[8px] py-[3px] leading-[1.2]',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

export default function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-[var(--typography-weights-medium)] rounded-[var(--radii-full)] transition-[var(--transitions-default)]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
} 