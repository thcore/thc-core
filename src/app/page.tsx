'use client';

import { useRedirectBasedOnAuth } from '@/hooks/useRedirect'; // 리디렉션 훅 import
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth(); // 기존 훅 활용
  useRedirectBasedOnAuth(user, loading); // 리디렉션 훅 활용

  // 로딩 상태는 src/app/loading.tsx에서 처리됨
  return null; // 인증 상태에 따라 리디렉션만 처리
}