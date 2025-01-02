'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useUserRole } from '@/hooks/useUserRole'
import LoadingSpinner from '../common/LoadingSpinner'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  allowedRoles?: ('super_admin' | 'admin' | 'user')[]
}

export default function RouteGuard({ 
  children, 
  requireAuth = true,
  allowedRoles = ['super_admin', 'admin', 'user']
}: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading: authLoading } = useAuth()
  const { role, loading: roleLoading } = useUserRole()

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (requireAuth && !user) {
        router.push(`/login?redirect=${pathname}`)
      } else if (user && role && !allowedRoles.includes(role)) {
        router.push('/unauthorized')
      }
    }
  }, [user, role, authLoading, roleLoading, requireAuth, allowedRoles, router, pathname])

  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="권한 확인 중..." />
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (user && role && !allowedRoles.includes(role)) {
    return null
  }

  return <>{children}</>
}