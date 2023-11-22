import React, { useState, useEffect } from 'react';
import { secondsToHMS } from '@/lib/utils/date';

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

  const [hours, minutes, seconds] = secondsToHMS(time);

  return (
    <div>
      {time === 0 ? (
        <h1>Start recording now!</h1>
      ) : (
        <h1>{`${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
      )}
    </div>
  );
};

export default Stopwatch;
