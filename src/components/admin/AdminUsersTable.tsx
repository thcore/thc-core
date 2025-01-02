'use client'

import { FirestoreUser } from '@/types/firestore/user'
import Button from '@/components/common/Button'

interface AdminUsersTableProps {
  users: FirestoreUser[]
  isLoading: boolean
  onCreateUser: () => void
}

export default function AdminUsersTable({ users, isLoading, onCreateUser }: AdminUsersTableProps) {
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={onCreateUser}>
          사용자 추가
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4">이름</th>
              <th className="text-left p-4">이메일</th>
              <th className="text-left p-4">부서</th>
              <th className="text-left p-4">직책</th>
              <th className="text-left p-4">권한</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.department}</td>
                <td className="p-4">{user.position}</td>
                <td className="p-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}