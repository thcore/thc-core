'use client'
import Card from '@/components/common/Card';
import LineChart from '@/components/dashboard/LineChart';
import { useChartData } from '@/hooks/useChartData';

export default function Home() {
  const { data } = useChartData();

  return (
    <main className="min-h-screen p-8">
      <div className="grid gap-6">
        <Card className="h-[400px]">
          <LineChart data={data} />
        </Card>
      </div>
    </main>
  );
}