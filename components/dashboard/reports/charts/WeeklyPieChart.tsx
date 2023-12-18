import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

interface TagUsageItem {
  name: string;
  total: number;
}

interface WeeklyPieChartProps {
  tagUsage: TagUsageItem[];
}

const BASE_COLORS = ['#7823b9', '#db2777', '#2563eb', '#059669', '#eab308'];

const generateColorPalette = (length: number) => {
  const colors = [...BASE_COLORS];
  for (let i = 5; i < length; i++) {
    colors.push(`hsl(${(i * 360) / length}, 70%, 50%)`);
  }
  return colors;
};

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
};

const WeeklyPieChart = ({ tagUsage }: WeeklyPieChartProps) => {
  const totalDuration = tagUsage.reduce((acc, item) => acc + item.total, 0);
  const colors = generateColorPalette(tagUsage.length);

  const formattedData = tagUsage.map((item, index) => ({
    ...item,
    percentage: ((item.total / totalDuration) * 100).toFixed(2),
    color: colors[index],
  }));

  return (
    <ResponsiveContainer width="50%" height={250}>
      <PieChart>
        <Pie
          dataKey="total"
          isAnimationActive={true}
          data={formattedData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percentage }) => `${name}: ${percentage}%`}
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend formatter={renderColorfulLegendText} align="center" />
        <Tooltip
          content={<CustomTooltip chartType="pie" />}
          cursor={{ fill: '#e2e8f0' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WeeklyPieChart;
