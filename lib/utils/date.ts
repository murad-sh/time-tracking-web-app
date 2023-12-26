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
  getDay,
  parseISO,
  differenceInWeeks,
} from 'date-fns';

export const getISOWeekDateRange = (weekOffset = 0) => {
  let date = new Date();
  date = addWeeks(date, weekOffset);
  const startDate = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
  const endDate = endOfWeek(date, { weekStartsOn: 1 }).toISOString();
  return { startDate, endDate };
};

export const calculateOffset = (start: string, currentStart: string) => {
  const urlStart = parseISO(start);
  const currentWeekStart = parseISO(currentStart);
  return differenceInWeeks(urlStart, currentWeekStart);
};

export const aggregateWeeklyTimeTracks = (
  start: string,
  timeTracks: ITimeTrack[]
) => {
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

export const aggregateTagTimeUsage = (timeTracks: ITimeTrack[]) => {
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

export const sumWeeklyDurations = (weekData: WeeklyDataType[]): number => {
  return weekData.reduce((total, dayData) => total + dayData.duration, 0);
};

export const formatTotalWeeklyDuration = (weekData: WeeklyDataType[]) => {
  const total = sumWeeklyDurations(weekData);
  return formatDurationWithUnits(total);
};

export const calculateTotalDuration = (timeTracks: ITimeTrack[]) => {
  const total = timeTracks.reduce(
    (total, track) =>
      total + differenceInSeconds(new Date(track.end), new Date(track.start)),
    0
  );
  return formatDurationWithUnits(total);
};

export const secondsToHMS = (timeInSeconds: number) => {
  const seconds = timeInSeconds % 60;
  const minutes = Math.floor(timeInSeconds / 60) % 60;
  const hours = Math.floor(timeInSeconds / 3600);

  return { hours, minutes, seconds };
};

export const formatDuration = (timeInSeconds: number) => {
  const { hours, minutes, seconds } = secondsToHMS(timeInSeconds);
  const formattedHours =
    hours >= 100 ? hours.toString() : hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatDurationWithUnits = (timeInSeconds: number) => {
  const { hours, minutes, seconds } = secondsToHMS(timeInSeconds);

  if (hours > 0) {
    const formattedHours =
      hours >= 100 ? hours.toString() : hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')} hours`;
  } else if (minutes > 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')} min`;
  } else {
    return `${seconds} sec`;
  }
};

export const formatDate = (input: string | number): string => {
  const date = new Date(input);
  return format(date, 'MMMM d, yyyy');
};

export const formatDateToDayMonth = (isoString: string) =>
  format(parseISO(isoString), 'dd MMM');

export type DailyTracksType = {
  day: string;
  records: ITimeTrack[];
};

export const groupTracksByDayOfWeek = (
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

export const getTodayStartEndISO = () => {
  const now = new Date();
  const startOfToday = startOfDay(now);
  const endOfToday = endOfDay(now);

  return {
    start: startOfToday.toISOString(),
    end: endOfToday.toISOString(),
  };
};

export const isTodayMonday = () => {
  const today = new Date();
  return getDay(today) === 1;
};

export const getTrackDuration = (start: Date, end: Date) =>
  formatDuration(differenceInSeconds(end, start));
