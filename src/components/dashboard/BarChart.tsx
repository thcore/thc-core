'use client'
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ChartData } from '@/hooks/useChartData';

interface BarChartProps {
  data: ChartData[];
  isLoading?: boolean;
}

export default function BarChart({ data, isLoading = false }: BarChartProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart 
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
          labelStyle={{ color: '#9CA3AF' }}
        />
        <Legend 
          verticalAlign="top"
          height={36}
          wrapperStyle={{
            paddingBottom: '10px',
            marginTop: '-10px'
          }}
        />
        <Bar dataKey="sales" fill="#3B82F6" />
        <Bar dataKey="revenue" fill="#10B981" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}