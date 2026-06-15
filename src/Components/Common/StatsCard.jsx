const StatsCard = ({ title, value, change, changeColor }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f172a] px-5 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-[#172036]">
      <h6 className="text-sm text-slate-400">{title}</h6>

      <h2 className="mt-2 text-3xl font-bold">{value}</h2>

      {change && <p className={`mt-2 text-sm ${changeColor}`}>{change}</p>}
    </div>
  );
};

export default StatsCard;
