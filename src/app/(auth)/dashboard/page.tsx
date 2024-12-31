'use client'

import { useUserRole } from '@/hooks/useUserRole'

export default function DashboardPage() {
  const { role, isSuperAdmin } = useUserRole()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Role: {role}</p>
        {isSuperAdmin && (
          <div>
            <h2 className="text-xl font-semibold mt-4 mb-2">Super Admin Controls</h2>
            {/* Super Admin 전용 컨트롤 */}
          </div>
        )}
      </div>
    </div>
  )
}