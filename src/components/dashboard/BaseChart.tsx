'use client'
import { ReactElement } from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CONFIG } from '@/constants/config';
import type { ChartData } from '@/hooks/useChartData';

interface BaseChartProps {
  data: ChartData[];
  isLoading?: boolean;
  children: ReactElement;
}

export default function BaseChart({ isLoading = false, children }: Omit<BaseChartProps, 'data'>) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  );
}

// 공통으로 사용되는 차트 설정들
export const chartCommonProps = {
  margin: CONFIG.CHART.MARGIN,
  children: (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke={CONFIG.CHART.COLORS.GRID} />
      <XAxis dataKey="name" stroke={CONFIG.CHART.COLORS.AXIS} />
      <YAxis stroke={CONFIG.CHART.COLORS.AXIS} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
        labelStyle={{ color: CONFIG.CHART.COLORS.AXIS }}
      />
      <Legend 
        verticalAlign="top"
        height={36}
        wrapperStyle={{
          paddingBottom: '10px',
          marginTop: '-10px'
        }}
      />
    </>
  ),
};