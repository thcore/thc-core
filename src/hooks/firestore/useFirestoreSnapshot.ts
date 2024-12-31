import { useQuery } from '@tanstack/react-query'
import { Query, onSnapshot } from 'firebase/firestore'

// 순수하게 onSnapshot 리스너만 담당하는 훅
export function useFirestoreSnapshot(key: string[], query: Query) {
  return useQuery({
    queryKey: key,
    queryFn: () => new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          resolve(data)
        },
        reject
      )
      return () => unsubscribe()
    }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  })
}