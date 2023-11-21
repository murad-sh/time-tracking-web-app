import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './TimeTrackItem.module.scss';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { secondsToTimeStr } from '@/lib/utils/date';

interface Props {
  timeTrack: ITimeTrack;
}

const TimeTrackItem = ({ timeTrack }: Props) => {
  return (
    <div className={styles.track}>
      <div className={styles.date}>
        <span>Date: {new Date(timeTrack.start).toLocaleDateString()}</span>
      </div>
      <div className={styles.title}>
        <span>Title: {timeTrack.title}</span>
      </div>
      <div>
        <span>Tag: {timeTrack.tag}</span>
      </div>
      <div className={styles.duration}>
        <span>
          Duration:
          {secondsToTimeStr(
            differenceInSeconds(timeTrack.start, timeTrack.end)
          )}
        </span>
      </div>
    </div>
  );
};

export default TimeTrackItem;
