import React from 'react';
import { secondsToTimeStr } from '@/lib/utils/date';
import { useTimerContext } from '@/hooks/use-store-hooks';

const Stopwatch = () => {
  const { time } = useTimerContext();
  const value = secondsToTimeStr(time);

  return (
    <div>
      <h1>{value}</h1>
    </div>
  );
};

export default Stopwatch;
