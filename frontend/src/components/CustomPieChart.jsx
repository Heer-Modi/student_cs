// CustomPieChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const CustomPieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CustomPieChart;
