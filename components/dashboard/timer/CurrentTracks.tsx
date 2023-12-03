import React from 'react';
import { useTodayTracks } from '@/hooks/use-api-hooks';
import { calculateTotalDuration } from '@/lib/utils/date';
import { ITimeTrack } from '@/models/time-track';
import { getDuration } from '@/lib/utils/date';

const CurrentTracks = () => {
  const { timeTracks, isLoading, error } = useTodayTracks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const totalDaily = calculateTotalDuration(timeTracks);

  return (
    <>
      <div>Total for today : {totalDaily}</div>
      <div>
        <ul>
          {timeTracks.map((track: ITimeTrack) => (
            <li key={track._id.toString()}>
              <p>{track.title}</p>
              <p>{getDuration(new Date(track.start), new Date(track.end))}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CurrentTracks;
