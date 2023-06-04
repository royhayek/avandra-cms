// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React from "react";
import { useTheme } from "@mui/styles";
import {
  Bar,
  BarChart as MUIBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import CustomTooltip from "../CustomTooltip";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const BarChart = ({ data, width = "99%", height = "100%" }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width={width} height={height}>
      <MUIBarChart data={data}>
        <CartesianGrid
          horizontal
          vertical={false}
          stroke={theme.palette.divider}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: "0.7rem",
            color: "#8898aa",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{
            fontSize: "0.7rem",
            color: "#8898aa",
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </MUIBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
