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
import ErrorMessage from '@/components/ui/ErrorMessage';

const WeeklyData = () => {
  const { start, end, view } = useWeeklySettings();
  const { timeTracks, isLoading, error } = useWeeklyTracks(start, end);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (timeTracks.length === 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.message}>No time tracks for this week</h3>
        <p className={styles.description}>
          There are no recorded time tracks for this week.
        </p>
      </div>
    );

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
          <div className={styles.bar}>
            <WeeklyBarChart weekly={weekly} />
          </div>
          <div className={styles.pie}>
            <h3>Tag Usage:</h3>
            <WeeklyPieChart tagUsage={tagUsage} />
          </div>
        </div>
      ) : (
        <TimeTrackList dailyTracks={dailyTracks} />
      )}
    </div>
  );
};

export default WeeklyData;
