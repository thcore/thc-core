import { doc, updateDoc, DocumentData } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useState } from 'react'

export function useUpdateDoc<T extends DocumentData>(collectionName: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateDocument = async (id: string, data: Partial<T>) => {
    setIsLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, data as DocumentData)
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateDocument,
    isLoading,
    error
  }
}