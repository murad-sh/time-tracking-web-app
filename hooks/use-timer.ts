import { useState, useEffect } from 'react';
import { toTimeStr } from '@/lib/utils/date';

export function useTimer() {
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (timer) {
      const currentStartDate = new Date();

      intervalId = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor(
          (now.getTime() - currentStartDate.getTime()) / 1000
        );
        setTime(elapsed);
        const timeStr = toTimeStr(elapsed);
        document.title = `${timeStr} • Time Tracker`;
      }, 1000);

      return () => {
        clearInterval(intervalId!);
        document.title = '';
      };
    } else {
      clearInterval(intervalId);
      setTime(0);
      document.title = '';
    }
  }, [timer]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (timer) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.title = '';
    };
  }, [timer]);

  return { time, timer, setTimer };
}
