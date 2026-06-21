import { useSelector } from "react-redux";

const StatsCard = ({ title, value, change, changeColor }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`cursor-pointer rounded-3xl border px-5 py-3 transition-all duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50 hover:bg-[#172036]"
          : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
      }`}
    >
      <h6
        className={`text-sm ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {title}
      </h6>

      <h2
        className={`mt-2 text-3xl font-bold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </h2>

      {change && <p className={`mt-2 text-sm ${changeColor}`}>{change}</p>}
    </div>
  );
};

export default StatsCard;
