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
    const data = { ...formData, userId: user?.uid };
    console.log('제출된 데이터:', data);
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
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">비용 청구 양식</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">비용 종류</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="">선택해주세요</option>
                <option value="급여">급여</option>
                <option value="외주비">외주비</option>
                <option value="자재비">자재비</option>
                <option value="경비">경비</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">금액</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
                placeholder="숫자만 입력"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">은행명</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">계좌번호</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                required
                placeholder="- 없이 입력"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">예금주</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.accountHolder}
                onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">비용 설명</label>
              <textarea
                className="w-full p-2 border rounded"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                placeholder="상세 내용을 입력해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">증빙 서류</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              제출하기
            </button>
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