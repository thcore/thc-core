'use client'

import { cn } from '@/utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[var(--z-indices-modal)] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-[var(--colors-neutral-900)] bg-opacity-25" 
          onClick={onClose} 
        />
        <div className={cn(
          'relative bg-[var(--colors-background-primary)] rounded-lg shadow-[var(--shadows-xl)] max-w-md w-full',
          className
        )}>
          <div className="px-6 py-4 border-b border-[var(--colors-border-default)]">
            <h3 className="text-lg font-medium text-[var(--colors-text-primary)]">{title}</h3>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}