import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './TimeTrackItem.module.scss';
import { getTrackDuration } from '@/lib/utils/date';
import TrackOperations from '../TrackOperations';

interface Props {
  timeTrack: ITimeTrack;
}

const TimeTrackItem = ({ timeTrack }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <span>{timeTrack.title}</span>
        <span className={styles.tag}>{timeTrack.tag || 'No tag'}</span>
      </div>
      <div className={styles.control}>
        <span className={styles.duration}>
          {getTrackDuration(new Date(timeTrack.start), new Date(timeTrack.end))}
        </span>
        <TrackOperations timeTrack={timeTrack} dateType="weekly" />
      </div>
    </div>
  );
};

export default TimeTrackItem;
