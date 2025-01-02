import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { buttonStyles } from '@/styles/components'
import { ButtonVariant, ComponentSize } from '@/styles/types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ComponentSize
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonStyles.base,
        buttonStyles.variants[variant],
        buttonStyles.sizes[size],
        loading && buttonStyles.loading,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <span className={buttonStyles.spinner} />
      )}
    </button>
  )
} 