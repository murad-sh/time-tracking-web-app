import { ITimeTrack } from '@/models/time-track';
import {
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  differenceInSeconds,
  addDays,
  startOfDay,
  endOfDay,
} from 'date-fns';

export const calcWeekRange = (weekOffset = 0) => {
  let date = new Date();
  date = addWeeks(date, weekOffset);
  const startDate = startOfWeek(date, { weekStartsOn: 1 }).toLocaleDateString();
  const endDate = endOfWeek(date, { weekStartsOn: 1 }).toLocaleDateString();
  return { startDate, endDate };
};

export const calculateWeekly = (start: string, timeTracks: ITimeTrack[]) => {
  const weekStart = new Date(start);
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const initialData: Record<string, { duration: number; date: string }> = {};
  daysOfWeek.forEach((day, index) => {
    initialData[day] = {
      duration: 0,
      date: format(addDays(weekStart, index), 'MMMM d, yyyy'),
    };
  });

  timeTracks.forEach((track) => {
    const start = new Date(track.start);
    const end = new Date(track.end);
    const dayOfWeek = format(start, 'EEEE');
    const durationInSeconds = differenceInSeconds(end, start);

    if (dayOfWeek in initialData) {
      initialData[dayOfWeek].duration += durationInSeconds;
    }
  });

  return daysOfWeek.map((day) => ({
    day,
    ...initialData[day],
  }));
};

type TagTimeType = {
  [key: string]: {
    name: string;
    total: number;
  };
};

export const calculateTagUsage = (timeTracks: ITimeTrack[]) => {
  let tagTime: TagTimeType = {};

  timeTracks.forEach((track) => {
    const tag = track.tag || 'No Tag';
    if (!tagTime[tag]) {
      tagTime[tag] = { name: tag, total: 0 };
    }
    tagTime[tag].total += differenceInSeconds(
      new Date(track.end),
      new Date(track.start)
    );
  });

  const tagTimeArray = Object.values(tagTime);
  return tagTimeArray;
};

export type WeeklyDataType = {
  day: string;
  duration: number;
  date: string;
};

export const calculateTotalWeekly = (weekData: WeeklyDataType[]): number => {
  return weekData.reduce((total, dayData) => total + dayData.duration, 0);
};

export const getTotalWeekly = (weekData: WeeklyDataType[]) => {
  const total = calculateTotalWeekly(weekData);
  return secondsToTimeStr(total);
};

export const calculateTotalDuration = (timeTracks: ITimeTrack[]) => {
  const total = timeTracks.reduce(
    (total, track) =>
      total + differenceInSeconds(new Date(track.end), new Date(track.start)),
    0
  );
  return secondsToTimeStr(total);
};

export const secondsToHMS = (timeInSeconds: number) => {
  const seconds = timeInSeconds % 60;
  const minutes = Math.floor(timeInSeconds / 60) % 60;
  const hours = Math.floor(timeInSeconds / 3600);

  return { hours, minutes, seconds };
};

export const secondsToTimeStr = (timeInSeconds: number) => {
  const { hours, minutes, seconds } = secondsToHMS(timeInSeconds);
  return [hours, minutes, seconds]
    .map((val) => val.toString().padStart(2, '0'))
    .join(':');
};

export const formatDate = (input: string | number): string => {
  const date = new Date(input);
  return format(date, 'MMMM d, yyyy');
};

export type DailyTracksType = {
  day: string;
  records: ITimeTrack[];
};

export const organizeTracksByDay = (
  timeTracks: ITimeTrack[]
): DailyTracksType[] => {
  const dayMap: Record<string, ITimeTrack[]> = {};

  timeTracks.forEach((track) => {
    const dayOfWeek = format(new Date(track.start), 'EEEE');
    if (!dayMap[dayOfWeek]) {
      dayMap[dayOfWeek] = [];
    }
    dayMap[dayOfWeek].push(track);
  });

  return Object.keys(dayMap).map((day) => ({
    day,
    records: dayMap[day],
  }));
};

export const getTodayStartEnd = () => {
  const now = new Date();
  const startOfToday = startOfDay(now);
  const endOfToday = endOfDay(now);

  return {
    start: startOfToday,
    end: endOfToday,
  };
};
