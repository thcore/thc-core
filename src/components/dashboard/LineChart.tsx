'use client'
import { LineChart as RechartsLineChart, Line } from 'recharts';
import BaseChart, { chartCommonProps } from './BaseChart';
import { CONFIG } from '@/constants/config';
import type { ChartData } from '@/hooks/useChartData';

interface LineChartProps {
  data: ChartData[];
  isLoading?: boolean;
}

export default function LineChart({ data, isLoading = false }: LineChartProps) {
  return (
    <BaseChart data={data} isLoading={isLoading}>
      <RechartsLineChart data={data} {...chartCommonProps}>
        {chartCommonProps.children}
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke={CONFIG.CHART.COLORS.SALES}
          strokeWidth={2}
          dot={{ fill: CONFIG.CHART.COLORS.SALES }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke={CONFIG.CHART.COLORS.REVENUE}
          strokeWidth={2}
          dot={{ fill: CONFIG.CHART.COLORS.REVENUE }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </BaseChart>
  );
}