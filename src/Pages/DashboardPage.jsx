import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../Layout/AppLayout";
import { useEffect } from "react";
import { getMarketData } from "../Store/Features/marketSlice";
import StatsCard from "../Components/Common/StatsCard";
import MarketInsightCard from "../Components/Common/MarketInsightCard";
import { createPortfolioData } from "../Utils/portfolioUtils";
import PortfolioSnapshotCard from "../Components/Common/PortfolioSnapshotCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarketOverviewCard from "../Components/Common/MarketOverviewCard";

const DashboardPage = () => {
  const { marketCoins, loading, error } = useSelector((state) => state.market);
  const { holdings } = useSelector((state) => state.portfolio);
  const { coins } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (marketCoins.length === 0) {
      dispatch(getMarketData());
    }
  }, [dispatch, marketCoins.length]);

  const totalCoins = marketCoins.length;
  const totalWatchlist = coins.length;

  const portfolioData = createPortfolioData(holdings, marketCoins);

  const totalPortfolioCurrentValue = portfolioData.reduce(
    (acc, coin) => acc + coin.currentValue,
    0,
  );

  const totalInvestment = portfolioData.reduce(
    (acc, coin) => acc + coin.totalInvestment,
    0,
  );

  const totalProfit = totalPortfolioCurrentValue - totalInvestment;

  const profitPercentage =
    totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

  const topGainers = [...marketCoins]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
    )
    .slice(0, 5);

  const topLosers = [...marketCoins]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    )
    .slice(0, 5);

  const portfolioSnapshot = portfolioData.slice(0, 3);

  const totalChange = marketCoins.reduce((avg, coin) => {
    return avg + coin.price_change_percentage_24h;
  }, 0);
  const averageMarketChange =
    marketCoins.length > 0 ? totalChange / marketCoins.length : 0;
  const bestPerformer =
    marketCoins.length > 0
      ? marketCoins.reduce((best, coin) =>
          best.price_change_percentage_24h > coin.price_change_percentage_24h
            ? best
            : coin,
        )
      : null;
  const worstPerformer =
    marketCoins.length > 0
      ? marketCoins.reduce((worst, coin) =>
          worst.price_change_percentage_24h < coin.price_change_percentage_24h
            ? worst
            : coin,
        )
      : null;
  return (
    <AppLayout>
      {() => (
        <div className="h-[calc(100vh-80px)] overflow-y-auto hideScrollbar bg-[#020617] p-6 text-white">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <p className="mt-2 text-slate-400">
                  Overview of your crypto portfolio and market
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <StatsCard title="Total Coins" value={totalCoins} />

                <StatsCard title="Watchlist Coins" value={totalWatchlist} />

                <StatsCard
                  title="Portfolio Value"
                  value={`$${totalPortfolioCurrentValue.toLocaleString()}`}
                />

                <StatsCard
                  title="Profit / Loss"
                  value={`$${totalProfit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  change={`${profitPercentage.toFixed(2)}%`}
                  changeColor={
                    totalProfit >= 0 ? "text-green-400" : "text-red-400"
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <MarketInsightCard
                  title="🚀 Top Gainers"
                  coins={topGainers}
                  isGainer={true}
                />

                <MarketInsightCard
                  title="📉 Top Losers"
                  coins={topLosers}
                  isGainer={false}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Portfolio Snapshot</h2>

                  <Link to={"/portfolio"}>
                    <button className="cursor-pointer flex items-center gap-2 rounded-xl border border-white/10 bg-[#0f172a] px-4 py-2 transition-all duration-300 hover:border-blue-500/50 hover:bg-[#172036]">
                      View Portfolio <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {portfolioSnapshot.map((coin) => (
                    <PortfolioSnapshotCard key={coin.id} coin={coin} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Market Overview</h2>

                  <p className="mt-1 text-slate-400">
                    Current market performance summary
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <MarketOverviewCard
                    title="Total Coins"
                    value={marketCoins.length}
                  />

                  <MarketOverviewCard
                    title="Average 24h Change"
                    value={`${averageMarketChange.toFixed(2)}%`}
                    color={
                      averageMarketChange >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  />

                  <MarketOverviewCard
                    title="Best Performer"
                    value={bestPerformer?.symbol.toUpperCase()}
                    subValue={`+${bestPerformer?.price_change_percentage_24h.toFixed(2)}%`}
                    color="text-green-400"
                  />

                  <MarketOverviewCard
                    title="Worst Performer"
                    value={worstPerformer?.symbol.toUpperCase()}
                    subValue={`${worstPerformer?.price_change_percentage_24h.toFixed(2)}%`}
                    color="text-red-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
