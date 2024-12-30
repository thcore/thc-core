import Card from '@/components/common/Card';
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardContent />
      </div>
    </div>
  );
}