import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './TimeTrackItem.module.scss';

type Props = {
  timeTrack: ITimeTrack;
};

// !TEMP
export const calculateDifference = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
};

const TimeTrackItem = ({ timeTrack }: Props) => {
  return (
    <li key={timeTrack._id?.toString()} className={styles.track}>
      <div className={styles.date}>
        <span>Date: {new Date(timeTrack.start).toLocaleDateString()}</span>
      </div>
      <div className={styles.title}>
        <span>Title: {timeTrack.title}</span>
      </div>
      <div className={styles.duration}>
        <span>
          Duration: {calculateDifference(timeTrack.start, timeTrack.end)}
        </span>
      </div>
    </li>
  );
};

export default TimeTrackItem;
