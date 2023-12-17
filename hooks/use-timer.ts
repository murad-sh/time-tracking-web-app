import { useState, useEffect } from 'react';

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
      }, 1000);

      return () => {
        clearInterval(intervalId!);
        setTime(0);
      };
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
    };
  }, [timer]);

  return { time, timer, setTimer };
}
