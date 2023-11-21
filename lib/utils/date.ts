import { ITimeTrack } from '@/models/time-track';
import {
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  subWeeks,
  differenceInSeconds,
} from 'date-fns';

type WeekRangeOptions = {
  direction: 'prev' | 'next';
  range: number;
};

export function calculateWeekRange(options?: WeekRangeOptions) {
  let date = new Date();
  if (options) {
    if (options.direction === 'prev') {
      date = subWeeks(date, options.range);
    } else {
      date = addWeeks(date, options.range);
    }
  }
  const startDate = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
  const endDate = endOfWeek(date, { weekStartsOn: 1 }).toISOString();
  return {
    startDate,
    endDate,
  };
}

export const calculateWeekly = (timeTracks: ITimeTrack[]) => {
  const initialData: Record<string, { duration: number; date: string }> = {
    Monday: { duration: 0, date: '' },
    Tuesday: { duration: 0, date: '' },
    Wednesday: { duration: 0, date: '' },
    Thursday: { duration: 0, date: '' },
    Friday: { duration: 0, date: '' },
    Saturday: { duration: 0, date: '' },
    Sunday: { duration: 0, date: '' },
  };

  timeTracks.forEach((track) => {
    const start = new Date(track.start);
    const end = new Date(track.end);
    const dayOfWeek = format(start, 'EEEE');
    const durationInSeconds = differenceInSeconds(end, start);

    if (initialData.hasOwnProperty(dayOfWeek)) {
      initialData[dayOfWeek].duration += durationInSeconds;
      initialData[dayOfWeek].date = format(start, 'yyyy-MM-dd');
    }
  });

  return Object.entries(initialData).map(([day, { duration, date }]) => ({
    day,
    duration,
    date,
  }));
};

export type WeeklyDataType = {
  day: string;
  duration: number;
  date: string;
};

export const calculateTotalWeekly = (weekData: WeeklyDataType[]): number => {
  return weekData.reduce((total, dayData) => total + dayData.duration, 0);
};

export const secondsToHMS = (timeInSeconds: number) => {
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  const minutes = (Math.floor(timeInSeconds / 60) % 60)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor(timeInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  return [hours, minutes, seconds];
};

export const secondsToTimeStr = (timeInSeconds: number) => {
  const [hours, minutes, seconds] = secondsToHMS(timeInSeconds);
  return hours + ':' + minutes + ':' + seconds;
};

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return format(date, 'MMMM d, yyyy');
}
