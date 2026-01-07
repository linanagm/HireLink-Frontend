import React from "react";
import { PieChart, Pie } from 'recharts';


import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from "recharts";






// fake data
const growthData = [
  { name: "Week 1", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Week 2", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Week 3", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Week 4", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Week 5", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Week 6", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Week 7", uv: 3490, pv: 4300, amt: 2100 },
];

const activityData = [
  { name: "Mon", active:100,  blocked: 15 },
  { name: "Tue", active: 50, blocked: 45 },
  { name: "Wed", active: 20, blocked: 65 },
  { name: "Thu", active: 80, blocked: 60 },
  { name: "Fri", active: 105, blocked: 50 },
  { name: "Sat", active: 30,  blocked: 10 },
  { name: "Sun", active: 28,  blocked: 20 },
];





// ***************************************************************
export const UsersGrowthChart = ({ isAnimationActive = true }) => (
  <AreaChart
    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
    responsive
    data={growthData}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="uv"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#colorUv)"
      name="Total Users"
      isAnimationActive={isAnimationActive}
    />
    <Area
      type="monotone"
      dataKey="pv"
      stroke="#82ca9d"
      fillOpacity={1}
      fill="url(#colorPv)"
      name="Active Users"
      isAnimationActive={isAnimationActive}
    />
    
  </AreaChart>
);



export const ActivityStateChart = ({ isAnimationActive = true }) => (
  <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={activityData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="active" fill="#8884d8"  isAnimationActive={isAnimationActive} />
    <Bar dataKey="blocked" fill="#82ca9d" isAnimationActive={isAnimationActive} />
    
  </BarChart>
);


