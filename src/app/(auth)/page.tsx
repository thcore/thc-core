'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useRouter } from 'next/navigation'

export default function AuthHome() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // 로그인된 상태면 대시보드로 리다이렉트
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner size="lg" text="로딩 중..." />
  }

  return null
}