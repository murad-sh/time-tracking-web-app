import React from 'react';
import Link from 'next/link';
import { formatDateToDayMonth, getISOWeekDateRange } from '@/lib/utils/date';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from 'lucide-react';
import { useWeeklySettings } from '@/hooks/use-weekly-settings';
import styles from './WeeklyNavigation.module.scss';

const WeekNavigation = () => {
  const baseUrl = '/dashboard/reports';
  const { offset, start, end, view } = useWeeklySettings();
  const prevWeekDates = getISOWeekDateRange(offset - 1);
  const nextWeekDates = getISOWeekDateRange(offset + 1);
  const week =
    offset === 0
      ? 'This week'
      : offset === -1
      ? 'Last week'
      : `${formatDateToDayMonth(start)} - ${formatDateToDayMonth(end)}`;

  return (
    <nav className={styles.navigation} aria-label="Weekly navigation">
      <Link
        className={styles.link}
        href={
          baseUrl +
          `?start=${prevWeekDates.startDate}&end=${prevWeekDates.endDate}&view=${view}`
        }
        aria-label="Previous week"
      >
        <ChevronLeftIcon />
      </Link>
      <div className={styles.current}>
        <span className={styles.icon}>
          <CalendarDaysIcon />
        </span>
        {week}
      </div>
      <Link
        className={styles.link}
        href={
          baseUrl +
          `?start=${nextWeekDates.startDate}&end=${nextWeekDates.endDate}&view=${view}`
        }
        aria-label="Next week"
      >
        <ChevronRightIcon />
      </Link>
    </nav>
  );
};

export default WeekNavigation;
