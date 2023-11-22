import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import {
  BarChart,
  XAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import {
  calculateWeekly,
  calcWeekRange,
  secondsToTimeStr,
  WeeklyDataType,
} from '@/lib/utils/date';
import CustomBarTooltip from './charts/CustomBarTooltip';
import { useSearchParams } from 'next/navigation';

const WeeklyChart = () => {
  const { startDate: currentStart, endDate: currentEnd } = calcWeekRange();
  const searchParams = useSearchParams();
  const start = (searchParams.get('start') || currentStart) as string;
  const end = (searchParams.get('end') || currentEnd) as string;

  const {
    timeTracks,
    isLoading,
    error: apiFetchError,
  } = useTimeTracks(start, end);
  let weekly: WeeklyDataType[] = [];

  // TODO: Add skeleton for loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO : Add api error handling
  if (apiFetchError) {
    return <div>Something went wrong.Try to refresh page</div>;
  }

  // TODO : Handle ui when there is no data for this week
  if (timeTracks && timeTracks.length === 0)
    return <div>No data for this week</div>;

  weekly = calculateWeekly(start, timeTracks);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={weekly}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="day"
          stroke="#667085"
          fontSize={14}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          content={<CustomBarTooltip />}
          cursor={{ fill: '#e2e8f0' }}
          offset={-50}
        />
        <Bar dataKey="duration" fill="#7823b9" radius={[5, 5, 0, 0]}>
          <LabelList
            dataKey="duration"
            position="top"
            fontSize={12}
            fill="#201a2d"
            formatter={(val: number) => {
              if (!val) return '';
              return secondsToTimeStr(val);
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;
