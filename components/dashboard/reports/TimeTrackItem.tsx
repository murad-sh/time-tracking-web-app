import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './TimeTrackItem.module.scss';
import { calculateDifference } from '@/lib/utils/calculate';

type Props = {
  timeTrack: ITimeTrack;
};

const TimeTrackItem = ({ timeTrack }: Props) => {
  return (
    <div className={styles.track}>
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
    </div>
  );
};

export default TimeTrackItem;
