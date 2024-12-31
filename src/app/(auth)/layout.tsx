'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Navigation from '@/components/layout/Navigation'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (pathname === '/') {
        // (auth) 루트로 접근시 대시보드로 리다이렉트
        router.push('/dashboard')
      }
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="로딩 중..." />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="w-64 bg-white shadow-sm h-screen">
          <div className="px-4 py-6">
            <Navigation />
          </div>
        </div>
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}