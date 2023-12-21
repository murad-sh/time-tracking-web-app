import React from 'react';
import { formatDuration } from '@/lib/utils/date';
import { useTimerContext } from '@/hooks/use-store-hooks';

const Stopwatch = () => {
  const { time } = useTimerContext();
  const value = formatDuration(time);

  return <h2 style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</h2>;
};

export default Stopwatch;
