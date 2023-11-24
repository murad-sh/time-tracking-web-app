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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
};

const generateColorPalette = (length: number) => {
  return Array.from(
    { length },
    (_, i) => `hsl(${(i * 360) / length}, 70%, 50%)`
  );
};

const WeeklyPieChart = ({ tagUsage }: WeeklyPieChartProps) => {
  const totalDuration = tagUsage.reduce((acc, item) => acc + item.total, 0);

  const formattedData = tagUsage.map((item) => ({
    ...item,
    percentage: ((item.total / totalDuration) * 100).toFixed(2) + '%',
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="total"
          isAnimationActive={false}
          data={formattedData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percentage }) => `${name}: ${percentage}`}
        >
          {formattedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend formatter={renderColorfulLegendText} />
        <Tooltip
          content={<CustomTooltip chartType="pie" />}
          cursor={{ fill: '#e2e8f0' }}
          offset={-50}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WeeklyPieChart;
