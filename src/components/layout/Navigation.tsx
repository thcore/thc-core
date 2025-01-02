'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useUserRole } from '@/hooks/useUserRole'
import { useFirestoreUser } from '@/hooks/firestore/useFirestoreUser'
import {
  HomeIcon,
  BanknotesIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Avatar from 'boring-avatars'
import AvatarSelector from '../profile/AvatarSelector'
import Image from 'next/image'
import Badge from '@/components/common/Badge'
import { cn } from '@/utils/cn'

const navItemStyles = {
  base: `
    flex items-center w-full px-[var(--spacing-4)] py-[var(--spacing-2)]
    rounded-[var(--radii-md)]
    text-[var(--typography-sizes-sm)]
    font-[var(--typography-weights-medium)]
    transition-[var(--transitions-default)]
  `,
  active: `
    bg-[var(--colors-primary-50)]
    text-[var(--colors-primary-700)]
  `,
  inactive: `
    text-[var(--colors-text-secondary)]
    hover:bg-[var(--colors-background-secondary)]
    hover:text-[var(--colors-text-primary)]
  `,
}

export default function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { role } = useUserRole()
  const isSuperAdmin = role === 'super_admin'
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false)
  const { data: firestoreUser, refetch } = useFirestoreUser()

  const menuItems = [
    {
      name: '대시보드',
      href: '/dashboard',
      icon: HomeIcon,
    },
    {
      name: '비용 청구',
      href: '/payment/request',
      icon: BanknotesIcon,
    },
  ]

  if (isSuperAdmin) {
    menuItems.push({
      name: '사용자 관리',
      href: '/admin/users',
      icon: UsersIcon,
    })
  }

  const handleAvatarChange = async () => {
    setIsAvatarSelectorOpen(true)
  }

  const isCurrentPath = (path: string) => {
    return pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <div className="flex flex-col h-full border-r border-[var(--colors-border-default)] w-[var(--layout-sidebar-width)]">
      <div className="py-[var(--spacing-8)] px-[var(--spacing-6)] border-b border-[var(--colors-border-default)] mt-[var(--layout-spacing-section)]">
        <div className="text-center">
          <button
            onClick={handleAvatarChange}
            className="inline-block mb-[var(--spacing-4)] rounded-full overflow-hidden"
          >
            {firestoreUser?.profileImage ? (
              <Image
                src={firestoreUser.profileImage}
                alt="프로필 이미지"
                width={80} 
                height={80}
                className="rounded-full"
              />
            ) : (
              <Avatar
                {...(firestoreUser?.avatarConfig || {
                  name: firestoreUser?.email || 'default',
                  variant: 'beam',
                  colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
                })}
                size={80}
              />
            )}
          </button>

          <h3 className="text-[var(--typography-sizes-base)] font-[var(--typography-weights-medium)] mb-[var(--spacing-1)]">
            {firestoreUser?.name || firestoreUser?.email}
          </h3>
          <div className="text-[var(--typography-sizes-sm)] text-[var(--colors-text-secondary)] mb-[var(--spacing-1)]">THC</div>
          {firestoreUser?.department && (
            <div className="text-[var(--typography-sizes-sm)] text-[var(--colors-text-secondary)] mb-[var(--spacing-2)]">
              {firestoreUser.department} · {firestoreUser.position}
            </div>
          )}
          <Badge variant="primary" size="sm">
            {role === 'super_admin' ? '최고관리자' : role === 'admin' ? '관리자' : '사용자'}
          </Badge>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-[var(--spacing-4)]">
        <div className="space-y-[var(--spacing-1)]">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                navItemStyles.base,
                isCurrentPath(item.href) ? navItemStyles.active : navItemStyles.inactive
              )}
            >
              <item.icon className="w-5 h-5 mr-[var(--spacing-3)] flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-[var(--spacing-4)] border-t border-[var(--colors-border-default)]">
        <button
          onClick={handleLogout}
          className={cn(navItemStyles.base, navItemStyles.inactive, 'w-full')}
        >
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-[var(--spacing-3)] flex-shrink-0" />
          로그아웃
        </button>
      </div>

      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        onSelect={() => refetch()}
        userId={user?.uid || ''}
      />
    </div>
  )
}
