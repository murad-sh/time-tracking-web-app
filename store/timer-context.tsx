import React, { createContext } from 'react';
import { useTimer } from '@/hooks/use-timer';
import { formatDurationWithUnits } from '@/lib/utils/date';

type ContextType = {
  time: number;
  timer: boolean;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
  documentTitle: string;
};

export const TimerContext = createContext<ContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const timerState = useTimer();
  const documentTitle = `${formatDurationWithUnits(
    timerState.time
  )} • Time Tracker`;

  return (
    <TimerContext.Provider value={{ ...timerState, documentTitle }}>
      {children}
    </TimerContext.Provider>
  );
};
