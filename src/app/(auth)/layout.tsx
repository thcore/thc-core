'use client'

import Navigation from '@/components/layout/Navigation'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 overflow-y-auto bg-[var(--colors-background-primary)]">
        <div className="min-h-full p-[var(--layout-spacing-page)]">
          <div className="mx-auto max-w-[var(--layout-max-width)] mt-[var(--layout-spacing-section)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}