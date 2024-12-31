'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import Card from '@/components/common/Card';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // 이미 로그인된 상태면 대시보드로 리다이렉트
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // 로딩 중이거나 리다이렉트 중일 때
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="로딩 중..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">THC Core 로그인</h1>
        <LoginForm />
      </Card>
    </div>
  );
}