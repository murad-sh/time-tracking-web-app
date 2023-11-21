import React from 'react';
import { secondsToTimeStr } from '@/lib/utils/date';
import { TooltipProps } from 'recharts';

const CustomBarTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const formattedDuration = secondsToTimeStr(payload[0].value as number);
    const date = payload[0].payload.date;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        <p>Date: {date}</p>
        <p>
          {payload[0].name}: {formattedDuration}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomBarTooltip;
