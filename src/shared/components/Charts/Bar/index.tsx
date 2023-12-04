// Packages
import React from 'react';
import { useTheme } from '@mui/material/styles';

// Components
import CustomTooltip from '../CustomTooltip';
import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart as MUIBarChart
} from 'recharts';

// Component
interface BarChartProps {
  data: Array<{ name: string; pv: number; uv: number }>;
  width?: string | number;
  height: string | number;
}

const BarChart = ({ data, width = '99%', height = '100%' }: BarChartProps) => {
  // Statics
  const theme = useTheme();

  // Renderers
  return (
    <ResponsiveContainer width={width} height={height}>
      <MUIBarChart data={data}>
        <CartesianGrid horizontal vertical={false} stroke={theme.palette.divider} />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: '0.7rem',
            color: theme.palette.grey[500]
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: '0.7rem',
            color: theme.palette.grey[500]
          }}
        />

        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />

        <Legend />

        <Bar dataKey="pv" fill="#8a8a8a" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </MUIBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
