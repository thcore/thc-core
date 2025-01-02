import { type ReactNode } from 'react'

interface ContentHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export default function ContentHeader({ title, description, action }: ContentHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-[var(--colors-text-primary)]">
          {title}
        </h1>
        {description && (
          <p className="mt-[var(--element-spacing-sm)] text-[var(--colors-text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0 ml-[var(--element-spacing-lg)]">
          {action}
        </div>
      )}
    </div>
  )
} 