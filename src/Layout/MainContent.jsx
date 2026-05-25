import { useState } from "react";
import PriceChart from "../Components/Common/PriceChart";
import StatsCard from "../Components/Common/StatsCard";
import { statsData } from "../Data/statsData";
import { marketData } from "../Data/marketData";
import SectionWrapper from "../Components/Common/SectionWrapper";

const MainContent = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const timeframeButtons = ["1H", "1D", "1W", "1M", "1Y"];
  return (
    <div className="h-[calc(100vh-80px)] main-content-container  overflow-y-auto bg-[#020617] p-6">
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
        <SectionWrapper>
          {" "}
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
        </SectionWrapper>

        {/* Market Table */}
        <SectionWrapper>
          {" "}
          <h2 className="text-2xl font-bold">Market Overview</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="h-full w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-slate-400">
                    Coin
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400">
                    Price
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400">
                    24h %
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400">
                    Market Cap
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((item) => (
                  <tr
                    key={item.id}
                    className="rounded-2xl bg-[#020617] transition hover:bg-white/5"
                  >
                    <td className="rounded-l-2xl px-4 py-4">
                      <div>
                        <h3 className="font-semibold">{item.coin}</h3>
                        <p className="text-sm text-slate-400">{item.symbol}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium">{item.price}</td>
                    <td
                      className={`px-4 py-4 font-medium ${item.change.includes("-") ? `text-red-400` : `text-green-400`}`}
                    >
                      {item.change}
                    </td>
                    <td className="px-4 py-4">{item.marketCap}</td>
                    <td className="rounded-r-2xl px-4 py-4">{item.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default MainContent;
