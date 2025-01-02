import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5분
      gcTime: 10 * 60 * 1000,      // 10분
      refetchOnWindowFocus: false,  // 윈도우 포커스시 재요청 방지
      refetchOnMount: false,        // 컴포넌트 마운트시 재요청 방지
      retry: 1,                     // 실패시 1번만 재시도
    },
  },
})