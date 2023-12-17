import React, { useState } from 'react';
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
  const [offset, setOffset] = useState(0);
  const prevWeekDates = getISOWeekDateRange(offset - 1);
  const nextWeekDates = getISOWeekDateRange(offset + 1);
  const { view, currentStart, start, end } = useWeeklySettings();
  const week =
    currentStart === start
      ? 'This week'
      : `${formatDateToDayMonth(start)} - ${formatDateToDayMonth(end)}`;

  return (
    <nav className={styles.navigation} aria-label="Weekly navigation">
      <Link
        className={styles.link}
        href={
          baseUrl +
          `?start=${prevWeekDates.startDate}&end=${prevWeekDates.endDate}&view=${view}`
        }
        onClick={() => setOffset((prevState) => prevState - 1)}
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
        onClick={() => setOffset((prevState) => prevState + 1)}
        aria-label="Next week"
      >
        <ChevronRightIcon />
      </Link>
    </nav>
  );
};

export default WeekNavigation;
