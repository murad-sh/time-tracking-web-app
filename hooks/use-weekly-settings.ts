import { getISOWeekDateRange } from '@/lib/utils/date';
import { useSearchParams } from 'next/navigation';

export const useWeeklySettings = () => {
  const { startDate: currentStart, endDate: currentEnd } =
    getISOWeekDateRange();
  const searchParams = useSearchParams();
  const start = (searchParams.get('start') || currentStart) as string;
  const end = (searchParams.get('end') || currentEnd) as string;
  const view = searchParams.get('view') || 'charts';

  return {
    currentStart,
    currentEnd,
    start,
    end,
    view,
  };
};
