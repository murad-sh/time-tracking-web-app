import React, { useState, useEffect } from 'react';
import { calculateTime } from '@/lib/utils/calculate';

interface StopwatchProps {
  toggle: boolean;
}

const Stopwatch = ({ toggle }: StopwatchProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (toggle) {
      intervalId = setInterval(() => {
        console.log('Interval set with ID:', intervalId);
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        console.log('interval cleared');
        clearInterval(intervalId);
        setTime(0);
      }
    };
  }, [toggle]);

  const [hours, minutes, seconds] = calculateTime(time);

  return (
    <div>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Stopwatch;
