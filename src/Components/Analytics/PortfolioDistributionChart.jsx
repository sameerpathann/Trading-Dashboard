import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";

const PortfolioDistributionChart = ({ pieChartData }) => {
  const { theme } = useSelector((state) => state.theme);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          innerRadius={80}
          outerRadius={140}
          paddingAngle={3}
          animationDuration={1000}
        >
          {pieChartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

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
          formatter={(value) => [`${Number(value).toFixed(2)}%`, "Allocation"]}
        />

        <Legend
          wrapperStyle={{
            color: theme === "dark" ? "#94a3b8" : "#64748b",
            paddingTop: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PortfolioDistributionChart;
