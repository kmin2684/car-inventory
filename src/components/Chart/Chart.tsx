// import "./styles.css";
import React from "react";
import { useGetCarsQuery } from "../../store/mainApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },

];

export default function Chart() {
  const fetchedCars = useGetCarsQuery(null);
  let soldCount = 0;
  let liveCount = 0;

  for (const key in fetchedCars.data) {
    if (fetchedCars.data[key].isLive === true) liveCount ++;
    else soldCount++;
  }

  const saleStatus = [{
    name: 'sold',
    count: soldCount
    },
    {
      name: 'live',
      count: liveCount
    }
  ]

  return (
    <BarChart
      width={500}
      height={300}
      data={saleStatus}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="amt" fill="#62ca9d" /> */}
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
