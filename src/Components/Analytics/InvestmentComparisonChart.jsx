import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";

const InvestmentComparisonChart = ({ barChartData }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={barChartData}
        barGap={8}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={
            theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"
          }
        />

        <XAxis
          dataKey="name"
          tick={{
            fill: theme === "dark" ? "#94a3b8" : "#64748b",
          }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{
            fill: theme === "dark" ? "#94a3b8" : "#64748b",
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={false}
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
          formatter={(value) => [`$${Number(value).toLocaleString()}`]}
        />

        <Legend
          wrapperStyle={{
            color: theme === "dark" ? "#cbd5e1" : "#64748b",
          }}
        />

        <Bar
          dataKey="investment"
          name="Investment"
          fill="#3B82F6"
          radius={[8, 8, 0, 0]}
          isAnimationActive
          animationDuration={1000}
        />

        <Bar
          dataKey="currentValue"
          name="Current Value"
          fill="#10B981"
          radius={[8, 8, 0, 0]}
          isAnimationActive
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvestmentComparisonChart;
