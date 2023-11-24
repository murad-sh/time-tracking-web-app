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
import {
  secondsToTimeStr,
  WeeklyDataType,
  secondsToHMS,
} from '@/lib/utils/date';
import CustomTooltip from './CustomTooltip';

const WeeklyBarChart = ({ weekly }: { weekly: WeeklyDataType[] }) => {
  const strokeColor = '#667085';

  const formatYAxis = (val: number) => {
    const [hours, minutes, seconds] = secondsToHMS(val);
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    if (!hours && !minutes && seconds > 0) return '30s';
    return '';
  };

  const formatLabel = (val: number) => {
    if (!val) return '';
    return secondsToTimeStr(val);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={weekly}
        margin={{ top: 50, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          stroke={strokeColor}
          fontSize={14}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="duration"
          stroke={strokeColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={['auto', (dataMax: number) => dataMax * 1.1]}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          content={<CustomTooltip chartType="bar" />}
          cursor={{ fill: '#e2e8f0' }}
          offset={-50}
        />
        <Bar dataKey="duration" fill="#7823b9" radius={[5, 5, 0, 0]}>
          <LabelList
            dataKey="duration"
            position="top"
            fontSize={12}
            fill="#201a2d"
            formatter={formatLabel}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyBarChart;
