'use client';
import { RunData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RunnerChartProps {
  data: RunData[];
}

export function RunnerChart({ data }: RunnerChartProps) {
  const formattedData = data.map(d => ({
    ...d,
    date: d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="miles" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}