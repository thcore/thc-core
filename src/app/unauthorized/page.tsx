'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function UnauthorizedPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          접근 권한이 없습니다
        </h1>
        <p className="mt-2 text-base text-gray-500">
          이 페이지에 접근할 수 있는 권한이 없습니다.
        </p>
        <div className="mt-6">
          <Link
            href={user ? '/dashboard' : '/'}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {user ? '대시보드로 돌아가기' : '홈으로 돌아가기'} →
          </Link>
        </div>
      </div>
    </div>
  )
}