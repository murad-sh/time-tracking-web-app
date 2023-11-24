import React from 'react';
import { useTimeTracks } from '@/hooks/use-api-hooks';
import { getTodayStartEnd, calculateTotalDaily } from '@/lib/utils/date';

const CurrentTracks = () => {
  const { start, end } = getTodayStartEnd();
  const { timeTracks, mutate, isLoading, error } = useTimeTracks(
    start.toISOString(),
    end.toISOString()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const totalDaily = calculateTotalDaily(timeTracks);

  return <div>Total for today : {totalDaily}</div>;
};

export default CurrentTracks;
