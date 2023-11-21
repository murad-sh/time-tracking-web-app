import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import { BarChart, XAxis, YAxis, Bar, Tooltip, TooltipProps } from 'recharts';
import {
  calculateWeekRange,
  calculateWeekly,
  WeeklyDataType,
} from '@/lib/utils/date';
import CustomBarTooltip from './charts/CustomBarTooltip';

const WeeklyChart = () => {
  const { startDate, endDate } = calculateWeekRange();
  const { timeTracks } = useTimeTracks(startDate, endDate);

  let data: WeeklyDataType[] = [];
  if (timeTracks && timeTracks.length !== 0) {
    data = calculateWeekly(timeTracks);
  }

  return (
    <div>
      <BarChart id="bar-chart" width={600} height={300} data={data}>
        <XAxis dataKey="day" />
        <Tooltip content={<CustomBarTooltip />} />
        <Bar dataKey="duration" fill="#7823b9" />
      </BarChart>
    </div>
  );
};

export default WeeklyChart;
