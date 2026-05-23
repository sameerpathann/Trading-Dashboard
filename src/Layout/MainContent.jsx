import { useState } from "react";
import PriceChart from "../Components/Common/PriceChart";
import StatsCard from "../Components/Common/StatsCard";
import { statsData } from "../Data/statsData";

const MainContent = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const timeframeButtons = ["1H", "1D", "1W", "1M", "1Y"];
  return (
    <div className="h-[calc(100vh-80px)] main-content-container overflow-y-auto bg-[#020617] p-6">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statsData.map((item) => (
            <StatsCard
              key={item.id}
              title={item.title}
              value={item.value}
              change={item.change}
              changeColor={item.changeColor}
            />
          ))}
        </div>

        {/* Chart Section */}
        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Bitcoin Price</h2>

              <p className="mt-1 text-slate-400">BTC / USD</p>
            </div>

            <div className="flex items-center gap-2">
              {timeframeButtons.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setActiveTimeframe(timeframe)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition duration-200 ${
                    activeTimeframe === timeframe
                      ? "bg-blue-500 text-white"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-[#020617] p-4">
            <PriceChart />
          </div>
        </div>

        {/* Market Table */}
        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">
          <h2 className="text-2xl font-bold">Market Overview</h2>

          <div className="mt-6 flex h-[300px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#020617]">
            <p className="text-slate-500">Market Table Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
