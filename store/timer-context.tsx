import React, { createContext } from 'react';
import { useTimer } from '@/hooks/use-timer';

type ContextType = {
  time: number;
  timer: boolean;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TimerContext = createContext<ContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const timerState = useTimer();

  return (
    <TimerContext.Provider value={timerState}>{children}</TimerContext.Provider>
  );
};
