import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export function useFirestoreCollection<T>(collectionName: string) {
  return useQuery({
    queryKey: ['collection', collectionName],
    queryFn: async () => {
      console.log(`📥 ${collectionName} 컬렉션 요청...`)
      const snapshot = await getDocs(collection(db, collectionName))
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
      console.log(`✅ ${collectionName} 컬렉션 수신:`, items.length, '개')
      return items
    }
  })
} 