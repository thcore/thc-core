'use client'
import { BarChart as RechartsBarChart, Bar } from 'recharts';
import BaseChart, { chartCommonProps } from './BaseChart';
import { CONFIG } from '@/constants/config';
import type { ChartData } from '@/hooks/useChartData';

interface BarChartProps {
  data: ChartData[];
  isLoading?: boolean;
}

export default function BarChart({ data, isLoading = false }: BarChartProps) {
  return (
    <BaseChart isLoading={isLoading}>
      <RechartsBarChart data={data} {...chartCommonProps}>
        {chartCommonProps.children}
        <Bar dataKey="sales" fill={CONFIG.CHART.COLORS.SALES} />
        <Bar dataKey="revenue" fill={CONFIG.CHART.COLORS.REVENUE} />
      </RechartsBarChart>
    </BaseChart>
  );
}