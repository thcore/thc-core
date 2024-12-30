'use client'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/common/Card';

export default function DashboardContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    description: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출된 데이터:', formData);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">비용 청구</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기존 폼 내용 */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">비용 청구 양식</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 기존 폼 필드들 */}
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">나의 청구 내역</h2>
          <div className="space-y-4">
            <p className="text-gray-500">아직 제출된 청구 내역이 없습니다.</p>
          </div>
        </Card>
      </div>
    </>
  );
}