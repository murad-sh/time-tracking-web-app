import React from 'react';
import { DailyTracksType } from '@/lib/utils/date';
import styles from './TimeTrackList.module.scss';
import TimeTrackItem from './TimeTrackItem';

interface TimeTrackListProps {
  dailyTracks: DailyTracksType[];
}

const TimeTrackList = ({ dailyTracks }: TimeTrackListProps) => {
  return (
    <div className={styles.content}>
      {dailyTracks.map((dayInfo, index) => (
        <div key={index}>
          <h3>{dayInfo.day}</h3>
          <ul className={styles.list}>
            {dayInfo.records.map((timeTrack) => (
              <li key={timeTrack._id.toString()}>
                <TimeTrackItem timeTrack={timeTrack} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TimeTrackList;
