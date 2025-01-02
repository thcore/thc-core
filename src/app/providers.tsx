'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import dynamic from 'next/dynamic';

// DevTools를 동적 import로 변경
const ReactQueryDevtools = process.env.NODE_ENV === 'development'
  ? dynamic(() =>
      import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools)
    )
  : null;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
