import { useSelector } from "react-redux";

const MarketOverviewCard = ({ title, value, subValue, color }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`cursor-pointer rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50 hover:bg-[#172036]"
          : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
      }`}
    >
      <p
        className={`text-sm ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h2
        className={`mt-3 text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </h2>

      {subValue && (
        <p className={`mt-2 text-sm font-medium ${color}`}>{subValue}</p>
      )}
    </div>
  );
};

export default MarketOverviewCard;
