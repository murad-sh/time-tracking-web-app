import React from 'react';
import { ITimeTrack } from '@/models/time-track';
import styles from './Reports.module.scss';
import TimeTrackItem from './TimeTrackItem';

interface Props {
  timeTracks: ITimeTrack[];
}

const Reports = (props: Props) => {
  return (
    <div className={styles.content}>
      <h1>Your latest tracks</h1>
      {props.timeTracks.length === 0 && <p>No time tracks yet</p>}
      {props.timeTracks.length > 0 && (
        <div>
          <ul>
            {props.timeTracks.map((track) => (
              <li key={track._id?.toString()}>
                <TimeTrackItem timeTrack={track} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reports;
