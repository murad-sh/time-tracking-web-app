import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import { BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import {
  calculateWeekRange,
  calculateWeekly,
  WeeklyDataType,
} from '@/lib/utils/date';
import CustomBarTooltip from './charts/CustomBarTooltip';

// TODO : Add pagination using props{start, end} or router query parameters
const WeeklyChart = () => {
  const { startDate, endDate } = calculateWeekRange();
  const {
    timeTracks,
    isLoading,
    error: apiFetchError,
  } = useTimeTracks(startDate, endDate);
  let data: WeeklyDataType[] = [];

  // TODO: Add skeleton for loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO : Add api error handling
  if (apiFetchError) {
    return <div>Something went wrong.Try to refresh page</div>;
  }

  // TODO : Handle ui when there is no data for this week
  if (timeTracks && timeTracks.length !== 0) {
    data = calculateWeekly(timeTracks);
  }

  // TODO : Play with some customization options
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
