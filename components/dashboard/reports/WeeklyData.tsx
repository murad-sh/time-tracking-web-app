import React from 'react';
import { useWeeklyTracks } from '@/hooks/use-api-hooks';
import {
  aggregateWeeklyTimeTracks,
  aggregateTagTimeUsage,
  groupTracksByDayOfWeek,
  formatTotalWeeklyDuration,
} from '@/lib/utils/date';
import WeeklyBarChart from './charts/WeeklyBarChart';
import WeeklyPieChart from './charts/WeeklyPieChart';
import TimeTrackList from './TimeTrackList';
import { useWeeklySettings } from '@/hooks/use-weekly-settings';
import styles from './WeeklyData.module.scss';

const WeeklyData = () => {
  const { start, end, view } = useWeeklySettings();
  const { timeTracks, isLoading, error } = useWeeklyTracks(start, end);

  // TODO: Add skeleton for loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO : Add  error handling
  if (error) {
    return <div>Something went wrong.Try to refresh page</div>;
  }

  // TODO : Handle ui when there is no data for this week
  if (timeTracks && timeTracks.length === 0)
    return <div>No data for this week</div>;

  const weekly = aggregateWeeklyTimeTracks(start, timeTracks);
  const totalWeekly = formatTotalWeeklyDuration(weekly);
  const tagUsage = aggregateTagTimeUsage(timeTracks);
  const dailyTracks = groupTracksByDayOfWeek(timeTracks);

  return (
    <div className={styles.container}>
      <h2>
        Weekly Total Time: <span>{totalWeekly}</span>
      </h2>

      {view === 'charts' ? (
        <div className={styles.charts}>
          <WeeklyBarChart weekly={weekly} />
          <WeeklyPieChart tagUsage={tagUsage} />
        </div>
      ) : (
        <TimeTrackList dailyTracks={dailyTracks} />
      )}
    </div>
  );
};

export default WeeklyData;
