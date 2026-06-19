import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const ProfitLossChart = ({ profitLossChartData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={profitLossChartData}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />

        <XAxis
          dataKey="name"
          tick={{ fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />

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

        <Legend />

        <Bar
          dataKey="profit"
          name="Profit / Loss"
          radius={[8, 8, 0, 0]}
          isAnimationActive={true}
          animationDuration={1000}
        >
          {profitLossChartData.map((coin, index) => (
            <Cell key={index} fill={coin.profit >= 0 ? "#10B981" : "#EF4444"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitLossChart;
