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
import Skeleton from '@/components/ui/Skeleton';
import Loader from '@/components/ui/Loader';

const WeeklyData = () => {
  const { start, end, view } = useWeeklySettings();
  const { timeTracks, isLoading, error } = useWeeklyTracks(start, end);

  if (isLoading) {
    return view === 'charts' ? <ChartSkeleton /> : <ListSkeleton />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (timeTracks.length === 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.message}>No time tracks for this week</h3>
        <p className={styles.info}>
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

const ListSkeleton = () => {
  return (
    <div>
      <Skeleton className={styles.header} />
      <div className={styles.content}>
        {[...Array(3)].map((_, dayIndex) => (
          <div key={dayIndex}>
            <Skeleton className={styles.day} />
            <div className={styles.divider}>
              {[...Array(2)].map((_, itemIndex) => (
                <div key={itemIndex} className={styles.item}>
                  <Skeleton className={styles.left} />
                  <Skeleton className={styles.right} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartSkeleton = () => {
  return (
    <div>
      <Skeleton className={styles.header} />
      <div className={styles.bar}>
        <div className={styles['chart-skeleton']}>
          <Skeleton className={styles.box}>
            <Loader className={styles.spinner} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
