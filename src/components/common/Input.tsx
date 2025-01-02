import { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { inputStyles } from '@/styles/components'
import { ComponentSize } from '@/styles/types'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ComponentSize
  label?: string
  error?: string
  helper?: string
}

export default function Input({
  size = 'md',
  label,
  error,
  helper,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || Math.random().toString(36).slice(2)

  return (
    <div className={inputStyles.container}>
      {label && (
        <label htmlFor={inputId} className={inputStyles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          inputStyles.base,
          inputStyles.sizes[size],
          error && 'border-[var(--colors-danger-500)] focus:border-[var(--colors-danger-500)]',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className={inputStyles.error}>
          {error}
        </p>
      )}
      {!error && helper && (
        <p id={`${inputId}-helper`} className={inputStyles.helper}>
          {helper}
        </p>
      )}
    </div>
  )
} 