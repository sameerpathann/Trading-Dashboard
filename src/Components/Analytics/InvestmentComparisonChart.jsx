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

const InvestmentComparisonChart = ({ barChartData }) => {
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

        <Legend
          wrapperStyle={{
            color: "#cbd5e1",
          }}
        />

        <Bar
          dataKey="investment"
          name="Investment"
          fill="#3B82F6"
          radius={[8, 8, 0, 0]}
          isAnimationActive={true}
          animationDuration={1000}
        />

        <Bar
          dataKey="currentValue"
          name="Current Value"
          fill="#10B981"
          radius={[8, 8, 0, 0]}
          isAnimationActive={true}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvestmentComparisonChart;
