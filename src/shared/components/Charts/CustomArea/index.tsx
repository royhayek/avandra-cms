// Packages
import React from 'react';
import { useTheme } from '@mui/material';

// Components
import CustomTooltip from '../CustomTooltip';
import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts';

// Component
interface CustomAreaProps {
  width?: string | number;
  height: string | number;
  data: Array<{ name: string; pv: number; uv: number }>;
}

const CustomArea = ({ data, width = '99%', height = '100%' }: CustomAreaProps) => {
  // Statics
  const theme = useTheme();

  // Renderers
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {/* <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8a8a8a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8a8a8a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs> */}

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: '0.8rem',
            color: theme.palette.secondary.main
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: '0.8rem',
            color: theme.palette.secondary.main
          }}
        />

        <CartesianGrid horizontal vertical={false} stroke={theme.palette.divider} />

        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />

        <Area type="monotone" dataKey="uv" stroke="#8a8a8a" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomArea;
