const MarketOverviewCard = ({ title, value, subValue, color }) => {
  return (
    <div className="cursor-pointer rounded-3xl border border-white/10 bg-[#0f172a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-[#172036]">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="mt-3 text-2xl font-bold text-white">{value}</h2>

      {subValue && (
        <p className={`mt-2 text-sm font-medium ${color}`}>{subValue}</p>
      )}
    </div>
  );
};

export default MarketOverviewCard;
