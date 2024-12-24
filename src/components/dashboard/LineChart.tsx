'use client'
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ChartData } from '@/hooks/useChartData';

interface LineChartProps {
  data: ChartData[];
  isLoading?: boolean;
}

export default function LineChart({ data, isLoading = false }: LineChartProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart 
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
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ fill: '#3B82F6' }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ fill: '#10B981' }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}