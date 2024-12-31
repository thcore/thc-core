'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 캐시 설정
            staleTime: 5 * 60 * 1000, // 5분
            gcTime: 10 * 60 * 1000,   // 10분 (이전의 cacheTime)
            refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
            refetchOnMount: false, // 컴포넌트 마운트시 재요청 방지
            retry: 1, // 실패시 1번만 재시도
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}