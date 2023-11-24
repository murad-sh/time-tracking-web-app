import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import {
  calculateWeekly,
  calcWeekRange,
  calculateTotalWeekly,
  calculateTagUsage,
  organizeTracksByDay,
} from '@/lib/utils/date';
import { useSearchParams } from 'next/navigation';
import WeeklyBarChart from './charts/WeeklyBarChart';
import WeeklyPieChart from './charts/WeeklyPieChart';
import TimeTrackList from './TimeTrackList';

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

  const weekly = calculateWeekly(start, timeTracks);
  const totalWeekly = calculateTotalWeekly(weekly);
  const tagUsage = calculateTagUsage(timeTracks);
  const dailyTracks = organizeTracksByDay(timeTracks);

  return (
    <div>
      <div>
        <p>Total time this week: {totalWeekly}</p>
        <WeeklyBarChart weekly={weekly} />
      </div>
      <div>
        <h2>Tag usage :</h2>
        <WeeklyPieChart tagUsage={tagUsage} />
      </div>
      <div>
        <TimeTrackList dailyTracks={dailyTracks} />
      </div>
    </div>
  );
};

export default WeeklyChart;
