import React, { useState, useEffect } from 'react';
import { calculateTime } from '@/lib/utils/calculate';

interface StopwatchProps {
  toggle: boolean;
}

const Stopwatch = ({ toggle }: StopwatchProps) => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (toggle && intervalId === null) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
    if (!toggle && intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTime(0);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [toggle, intervalId]);

  const [hours, minutes, seconds] = calculateTime(time);

  return (
    <div>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
};

export default Stopwatch;
