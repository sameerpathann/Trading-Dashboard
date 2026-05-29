import { useState } from "react";
import PriceChart from "../Components/Common/PriceChart";
import StatsCard from "../Components/Common/StatsCard";
import { statsData } from "../Data/statsData";
import { marketData } from "../Data/marketData";
import SectionWrapper from "../Components/Common/SectionWrapper";
import Button from "../Components/Common/Button";
import MarketRow from "../Components/Common/MarketRow";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
const MainContent = ({ query }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const timeframeButtons = ["1H", "1D", "1W", "1M", "1Y"];
  const [sortOrder, setSortOrder] = useState("default");
  const filteredMarketData = marketData.filter((item) =>
    item.coin.toLowerCase().includes(query?.toLowerCase() || ""),
  );
  const sortedMarketData = [...filteredMarketData];
  if (sortOrder === "asc") {
    sortedMarketData.sort(
      (a, b) =>
        parseFloat(a.price.replace(/[$,]/g, "")) -
        parseFloat(b.price.replace(/[$,]/g, "")),
    );
  }
  if (sortOrder === "desc") {
    sortedMarketData.sort(
      (a, b) =>
        parseFloat(b.price.replace(/[$,]/g, "")) -
        parseFloat(a.price.replace(/[$,]/g, "")),
    );
  }

  const renderSortIcon = () => {
    if (sortOrder === "asc") {
      return <ArrowUp size={16} />;
    }

    if (sortOrder === "desc") {
      return <ArrowDown size={16} />;
    }

    return <ArrowUpDown size={16} />;
  };
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
                <Button
                  key={timeframe}
                  className="text-sm cursor-pointer"
                  variant={
                    activeTimeframe === timeframe ? "primary" : "secondary"
                  }
                  onClick={() => setActiveTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
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
                    <Button
                      className="cursor-pointer flex items-center gap-1.5"
                      variant="secondary"
                      onClick={() =>
                        setSortOrder((prev) => {
                          if (prev === "default") {
                            return "asc";
                          }

                          if (prev === "asc") {
                            return "desc";
                          }

                          return "default";
                        })
                      }
                    >
                      Price
                      {renderSortIcon()}
                    </Button>
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
                {sortedMarketData.length > 0 ? (
                  sortedMarketData.map((item) => (
                    <MarketRow key={item.id} item={item} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-slate-500"
                    >
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default MainContent;
