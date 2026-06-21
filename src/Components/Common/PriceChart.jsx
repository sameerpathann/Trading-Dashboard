import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { chartData } from "../../Data/chartData";

const PriceChart = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="h-[420px] min-w-0 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="2 4"
            stroke={
              theme === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(15,23,42,0.08)"
            }
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #e2e8f0",
              borderRadius: "16px",
              color: theme === "dark" ? "#ffffff" : "#0f172a",
              boxShadow:
                theme === "dark" ? "none" : "0 10px 30px rgba(0,0,0,0.08)",
            }}
            labelStyle={{
              color: theme === "dark" ? "#94a3b8" : "#64748b",
            }}
            cursor={{
              stroke: "#3b82f6",
              strokeOpacity: 0.25,
            }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            isAnimationActive
            animationDuration={1000}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: theme === "dark" ? "#020617" : "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
