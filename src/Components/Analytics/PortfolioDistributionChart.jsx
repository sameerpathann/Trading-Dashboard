import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
const PortfolioDistributionChart = ({ pieChartData }) => {
  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey={"value"}
          nameKey={"name"}
          innerRadius={80}
          outerRadius={140}
        >
          {pieChartData.map((_, index) => {
            return <Cell key={index} fill={COLORS[index % COLORS.length]} />;
          })}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PortfolioDistributionChart;
