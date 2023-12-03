import React, { useState } from 'react';
import WeeklyData from './WeeklyData';
import Link from 'next/link';
import { calculateWeekRange } from '@/lib/utils/date';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Weekly = () => {
  const baseUrl = '/dashboard/reports';
  const [offset, setOffset] = useState(0);
  const prevWeekDates = calculateWeekRange(offset - 1);
  const nextWeekDates = calculateWeekRange(offset + 1);

  return (
    <div>
      <div>
        <Link
          href={
            baseUrl +
            `?start=${prevWeekDates.startDate}&end=${prevWeekDates.endDate}`
          }
          onClick={() => setOffset((prevState) => prevState - 1)}
        >
          <ChevronLeftIcon />
        </Link>
        <Link
          href={
            baseUrl +
            `?start=${nextWeekDates.startDate}&end=${nextWeekDates.endDate}`
          }
          onClick={() => setOffset((prevState) => prevState + 1)}
        >
          <ChevronRightIcon />
        </Link>
      </div>
      <div>
        <h2>Weekly Chart</h2>
        <WeeklyData />
      </div>
    </div>
  );
};

export default Weekly;
