import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import {
  calculateWeekly,
  calcWeekRange,
  WeeklyDataType,
  calculateTotalWeekly,
} from '@/lib/utils/date';
import { useSearchParams } from 'next/navigation';
import WeeklyBarChart from './charts/WeeklyBarChart';

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
  const totalWeekly = calculateTotalWeekly(weekly);

  return (
    <div>
      <p>Total time this week: {totalWeekly}</p>
      <WeeklyBarChart weekly={weekly} />
    </div>
  );
};

export default WeeklyChart;
