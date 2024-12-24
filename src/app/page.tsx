'use client'
import Card from '@/components/common/Card';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import { useChartData } from '@/hooks/useChartData';

export default function Home() {
  const { data } = useChartData();

  return (
    <main className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">매출 추이</h2>
          <LineChart data={data} />
        </Card>
        <Card className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">월별 비교</h2>
          <BarChart data={data} />
        </Card>
      </div>
    </main>
  );
}