'use client'

import { useAuth } from './useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useQuery } from '@tanstack/react-query'

type UserRole = 'super_admin' | 'admin' | 'user'

export function useUserRole() {
  const { user } = useAuth()

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user?.uid],
    queryFn: async (): Promise<UserRole> => {
      if (!user?.uid) return 'user'
      
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      return userDoc.exists() ? (userDoc.data().role as UserRole) : 'user'
    },
    enabled: !!user,
  })
  
  return {
    role: role || 'user',
    loading: isLoading,
    isSuperAdmin: role === 'super_admin',
    isAdmin: role === 'admin',
    isUser: role === 'user',
  }
}