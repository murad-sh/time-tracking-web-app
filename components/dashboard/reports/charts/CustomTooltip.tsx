import React from 'react';
import { formatDuration } from '@/lib/utils/date';
import { TooltipProps } from 'recharts';
import styles from './CustomTooltip.module.scss';

interface CustomProps {
  chartType: 'bar' | 'pie';
}
const CustomTooltip = ({
  active,
  payload,
  chartType,
}: TooltipProps<number, string> & CustomProps) => {
  if (active && payload && payload.length) {
    const formattedDuration = formatDuration(payload[0].value as number);
    const date = payload[0].payload.date;
    const tag = payload[0].payload.name;
    return (
      <div className={styles.tooltip}>
        <p>
          <b>{chartType === 'bar' ? date : tag}</b>
        </p>
        <p>Total: {formattedDuration}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
