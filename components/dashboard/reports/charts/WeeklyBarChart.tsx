import React from 'react';
import {
  BarChart,
  XAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { formatDuration, WeeklyDataType } from '@/lib/utils/date';
import CustomTooltip from './CustomTooltip';
import { calculateScale } from '@/lib/utils/calculate';

const WeeklyBarChart = ({ weekly }: { weekly: WeeklyDataType[] }) => {
  const strokeColor = '#667085';
  const yAxisTicks = calculateScale(weekly);
  const isSmallScreen = window.innerWidth < 640;
  const fontSize = isSmallScreen ? 9 : 14;

  const formatYAxis = (tick: number) => {
    return `${tick / 3600}h`;
  };

  const formatLabel = (val: number) => {
    if (!val) return '';
    return formatDuration(val);
  };

  return (
    <ResponsiveContainer width="100%" height={isSmallScreen ? 250 : 350}>
      <BarChart data={weekly} margin={{ top: 40 }}>
        <CartesianGrid vertical={false} stroke="#ddd" strokeOpacity={0.7} />
        <XAxis
          dataKey="day"
          stroke={strokeColor}
          fontSize={fontSize}
          tickLine={false}
          axisLine={false}
          strokeWidth={isSmallScreen ? 0.5 : 1}
        />
        <YAxis
          dataKey="duration"
          stroke={strokeColor}
          fontSize={fontSize}
          tickLine={false}
          axisLine={false}
          domain={[0, 'dataMax']}
          ticks={yAxisTicks}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          content={<CustomTooltip chartType="bar" />}
          cursor={{ fill: '#e2e8f0' }}
          offset={-50}
        />
        <Bar dataKey="duration" fill="#7823b9" radius={[6, 6, 0, 0]}>
          {!isSmallScreen && (
            <LabelList
              dataKey="duration"
              position="top"
              fontSize={isSmallScreen ? 8 : 12}
              fill="#201a2d"
              fontWeight={500}
              formatter={formatLabel}
            />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyBarChart;
