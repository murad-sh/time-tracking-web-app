import { useSearchParams } from 'next/navigation';
import { calculateOffset, getISOWeekDateRange } from '@/lib/utils/date';

export const useWeeklySettings = () => {
  const searchParams = useSearchParams();
  const { startDate: currentStart, endDate: currentEnd } =
    getISOWeekDateRange();

  const start = searchParams.get('start') || currentStart;
  const end = searchParams.get('end') || currentEnd;
  const view = searchParams.get('view') || 'charts';
  const offset = calculateOffset(start, currentStart);

  return {
    start,
    end,
    view,
    offset,
  };
};
