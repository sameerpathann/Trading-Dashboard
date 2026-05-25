import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import { chartData } from "../../Data/chartData";

const PriceChart = () => {
  return (
    <div className="h-[420px] min-w-0 w-full">
      <ResponsiveContainer>
        <LineChart
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
          data={chartData}
        >
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8" }}
          />
          <YAxis
            axisLine={true}
            tickLine={true}
            tick={{ fill: "#94a3b8" }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              color: "white",
            }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={1000}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#020617",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
