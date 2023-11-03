import React, { useState, useEffect } from 'react';
import { calculateTime } from '@/lib/utils/calculate';

interface StopwatchProps {
  timer: boolean;
}

const Stopwatch = ({ timer }: StopwatchProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setTime(0);
      }
    };
  }, [timer]);

  const [hours, minutes, seconds] = calculateTime(time);

  return (
    <div>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Stopwatch;
