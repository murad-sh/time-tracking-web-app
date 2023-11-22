import React from 'react';
import { secondsToTimeStr } from '@/lib/utils/date';
import { TooltipProps } from 'recharts';
import styles from './CustomTooltip.module.scss';

const CustomBarTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const formattedDuration = secondsToTimeStr(payload[0].value as number);
    const date = payload[0].payload.date;
    return (
      <div className={styles.tooltip}>
        <p>
          <b>{date}</b>
        </p>
        <p>Total: {formattedDuration}</p>
      </div>
    );
  }

  return null;
};

export default CustomBarTooltip;
