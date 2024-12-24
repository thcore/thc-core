import { useState } from 'react';

export interface ChartData {
  name: string;
  sales: number;
  revenue: number;
}

export function useChartData() {
  const [data] = useState<ChartData[]>([
    { name: 'Jan', sales: 400, revenue: 600 },
    { name: 'Feb', sales: 300, revenue: 500 },
    { name: 'Mar', sales: 600, revenue: 800 },
    { name: 'Apr', sales: 800, revenue: 1000 },
    { name: 'May', sales: 500, revenue: 700 },
    { name: 'Jun', sales: 700, revenue: 900 },
  ]);

  return { data };
}