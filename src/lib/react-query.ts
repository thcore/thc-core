import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5분
      gcTime: 10 * 60 * 1000,      // 10분
      refetchOnWindowFocus: false,  // 윈도우 포커스시 재요청 방지
      refetchOnMount: false,        // 컴포넌트 마운트시 재요청 방지
      retry: 3,                     // 실패시 3번 재시도
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation 에러:', error);
        // 여기에 에러 처리 로직 추가 (예: 토스트 메시지)
      },
      retry: 2,  // mutation 실패시 2번 재시도
    },
  },
})