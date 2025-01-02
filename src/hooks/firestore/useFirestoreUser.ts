'use client'

import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import type { FirestoreUser } from '@/types/firestore/user'

export function useFirestoreUser() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['user', user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error('Not authenticated')
      
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      
      if (!docSnap.exists()) {
        throw new Error('User document not found')
      }

      return {
        ...docSnap.data(),
        uid: docSnap.id,
      } as FirestoreUser
    },
    enabled: !!user?.uid,
  })
}