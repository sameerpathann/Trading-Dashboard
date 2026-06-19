import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TopHoldingsChart = ({ topHoldingsChartData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={topHoldingsChartData}
        layout="vertical"
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />

        <XAxis
          type="number"
          tick={{ fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            color: "#fff",
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`]}
        />

        <Bar
          dataKey="value"
          name="Current Value"
          fill="#3B82F6"
          radius={[0, 8, 8, 0]}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopHoldingsChart;
