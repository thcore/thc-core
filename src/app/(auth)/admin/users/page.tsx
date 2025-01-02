'use client'

import { useState } from 'react'
import { useUserRole } from '@/hooks/useUserRole'
import { useFirestoreCollection } from '@/hooks/firestore/useFirestoreCollection'
import { FirestoreUser } from '@/types/firestore/user'
import AdminUserCreateForm from '@/components/admin/AdminUserCreateForm'
import AdminUsersTable from '@/components/admin/AdminUsersTable'
import ContentHeader from '@/components/common/ContentHeader'

export default function AdminUsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { role } = useUserRole()
  const { 
    data: users,
    refetch: refetchUsers,
    isFetching 
  } = useFirestoreCollection<FirestoreUser>('users')

  if (role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[var(--colors-danger-500)]">접근 권한이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="space-y-[var(--layout-spacing-section)]">
      <ContentHeader
        title="사용자 관리"
        description="사용자 목록을 관리합니다."
      />

      <AdminUsersTable 
        users={users || []}
        isLoading={isFetching}
        onCreateUser={() => setIsCreateModalOpen(true)}
      />

      <AdminUserCreateForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false)
          refetchUsers()
        }}
      />
    </div>
  )
}