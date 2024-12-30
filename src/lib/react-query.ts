import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5분
      gcTime: 30 * 60 * 1000,    // 30분 (이전의 cacheTime)
    }
  }
})