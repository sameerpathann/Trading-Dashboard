import React from "react";

const StatsCard = ({ title, value, change, changeColor }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f172a] px-5 py-3">
      <h6 className="text-sm text-slate-400">{title}</h6>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      <p className={`mt-2 text-sm ${changeColor}`}>{change}</p>
    </div>
  );
};

export default StatsCard;
