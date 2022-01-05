import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function Graph({filteredContests}) {

    return (
        <LineChart
          width={1200}
          height={300}
          data={filteredContests}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          style={{marginTop: '50px', marginBottom: '50px'}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="durationSeconds"
            stroke="#666"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      );
  
}