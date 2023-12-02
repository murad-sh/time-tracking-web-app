import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './TimeTrackItem.module.scss';
import { getDuration } from '@/lib/utils/date';

interface Props {
  timeTrack: ITimeTrack;
}

const TimeTrackItem = ({ timeTrack }: Props) => {
  return (
    <div className={styles.track}>
      <div className={styles.title}>
        <span>Title: {timeTrack.title}</span>
      </div>
      <div>
        <span>Tag: {timeTrack.tag || 'No tag'}</span>
      </div>
      <div className={styles.duration}>
        <span>
          Duration:
          {getDuration(new Date(timeTrack.start), new Date(timeTrack.end))}
        </span>
      </div>
    </div>
  );
};

export default TimeTrackItem;
