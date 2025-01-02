'use client'
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/common/Card';
import TodoBoard from '@/components/dashboard/TodoBoard';

export default function DashboardContent() {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">할 일 관리</h2>
        <TodoBoard />
      </Card>
    </div>
  );
}