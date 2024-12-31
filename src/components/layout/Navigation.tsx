'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useUserRole } from '@/hooks/useUserRole'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { FirestoreUser } from '@/types/firestore/user'
import Avatar from 'boring-avatars'
import AvatarSelector from '../profile/AvatarSelector'
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigationItems = [
  { name: '대시보드', href: '/dashboard', icon: HomeIcon },
  { name: '비용 청구', href: '/payment/request', icon: DocumentTextIcon },
  { name: '팀 관리', href: '/teams', icon: UserGroupIcon },
  { name: '보고서', href: '/reports', icon: ChartBarIcon },
]

const adminNavigationItems = [
  { name: '시스템 관리', href: '/admin/system', icon: CogIcon },
  { name: '작업 관리', href: '/admin/tasks', icon: ClipboardDocumentListIcon },
]

export default function Navigation() {
  const pathname = usePathname()
  console.log('Current pathname:', pathname)
  const { user, logout } = useAuth()
  const { role } = useUserRole()
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false)

  const { data: userData, refetch } = useQuery({
    queryKey: ['userData', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null
      const docSnap = await getDoc(doc(db, 'users', user.uid))
      return docSnap.exists() ? (docSnap.data() as FirestoreUser) : null
    },
    enabled: !!user,
  })

  const handleAvatarSelect = async (config: { name: string, variant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring', colors: string[] }) => {
    if (!user?.uid) return
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        avatarConfig: config
      })
      await refetch()
    } catch (error) {
      console.error('Failed to update avatar:', error)
    }
    
    setIsAvatarSelectorOpen(false)
  }

  const isCurrentPath = (href: string) => {
    const currentPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    
    if (href === '/dashboard') {
      return currentPath === href || currentPath === '/'
    }
    return currentPath.startsWith(href)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      {/* 프로필 섹션 */}
      <div className="p-4 mb-2">
        <div className="flex flex-col items-center text-center">
          <button 
            onClick={() => setIsAvatarSelectorOpen(true)}
            className="focus:outline-none mb-4"
          >
            {userData?.profileImage ? (
              <Image 
                src={userData.profileImage} 
                alt="User avatar" 
                width={32} 
                height={32}
                className="rounded-full"
              />
            ) : (
              <Avatar
                {...(userData?.avatarConfig || {
                  name: userData?.email || 'default',
                  variant: 'beam',
                  colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
                })}
                size={96}
              />
            )}
          </button>
          <div className="space-y-1.5">
            <h3 className="font-medium text-gray-900 text-lg">{userData?.name}</h3>
            <p className="text-sm text-gray-600">
              {userData?.department} · {userData?.position}
            </p>
            <p className="text-xs text-gray-500">{userData?.corporationId}</p>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {role === 'super_admin' && (
                <>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                    최고관리자
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                    관리자
                  </span>
                </>
              )}
              {role === 'admin' && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                  관리자
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-3 py-2 text-sm rounded-md transition-colors
                ${isCurrentPath(item.href)
                  ? 'bg-blue-100 text-blue-900 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <item.icon 
                className={`w-5 h-5 mr-2.5 ${
                  isCurrentPath(item.href)
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          ))}
        </div>

        {/* 관리자 메뉴 */}
        {role === 'super_admin' && (
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              관리자 메뉴
            </h3>
            <div className="mt-2 space-y-1">
              {adminNavigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm rounded-md transition-colors
                    ${isCurrentPath(item.href)
                      ? 'bg-blue-100 text-blue-900 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <item.icon 
                    className={`w-5 h-5 mr-2.5 ${
                      isCurrentPath(item.href)
                        ? 'text-blue-600' 
                        : 'text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 로그아웃 버튼 */}
      <div className="p-2">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2.5 text-gray-500" />
          로그아웃
        </button>
      </div>

      {/* 아바타 선택기 */}
      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        onSelect={handleAvatarSelect}
        userId={user?.uid || ''}
      />
    </div>
  )
}
