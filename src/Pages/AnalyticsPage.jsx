import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../Layout/AppLayout";
import { createPortfolioData } from "../Utils/portfolioUtils";
import { useEffect } from "react";
import { getMarketData } from "../Store/Features/marketSlice";
import PortfolioDistributionChart from "../Components/Analytics/PortfolioDistributionChart";
import InvestmentComparisonChart from "../Components/Analytics/InvestmentComparisonChart";
import ProfitLossChart from "../Components/Analytics/ProfitLossChart";
import StatsCard from "../Components/Common/StatsCard";
import TopHoldingsChart from "../Components/Analytics/TopHoldingsChart";
import LoadingSkeleton from "../Components/Common/LoadingSkeleton";
import ErrorState from "../Components/Common/ErrorState";

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { marketCoins, error, loading } = useSelector((state) => state.market);
  const { holdings } = useSelector((state) => state.portfolio);
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    if (marketCoins.length === 0) dispatch(getMarketData());
  }, [dispatch, marketCoins.length]);

  const portfolioData = createPortfolioData(holdings, marketCoins);

  const totalPortfolioCurrentValue = portfolioData.reduce(
    (acc, coin) => acc + coin.currentValue,
    0,
  );

  const finalPortfolioData = portfolioData.map((coin) => ({
    ...coin,
    allocationPercentage:
      totalPortfolioCurrentValue > 0
        ? (coin.currentValue * 100) / totalPortfolioCurrentValue
        : 0,
  }));

  const pieChartData = finalPortfolioData.map((coin) => ({
    name: coin.name,
    value: coin.allocationPercentage,
  }));

  const barChartData = finalPortfolioData.map((coin) => ({
    name: coin.name,
    investment: coin.totalInvestment,
    currentValue: coin.currentValue,
  }));

  const profitLossChartData = finalPortfolioData.map((coin) => ({
    name: coin.name,
    profit: coin.profit,
  }));
  const bestPerformer =
    finalPortfolioData.length > 0
      ? finalPortfolioData.reduce((best, coin) =>
          coin.profitPercentage > best.profitPercentage ? coin : best,
        )
      : null;

  const worstPerformer =
    finalPortfolioData.length > 0
      ? finalPortfolioData.reduce((worst, coin) =>
          coin.profitPercentage < worst.profitPercentage ? coin : worst,
        )
      : null;

  const averageProfit =
    finalPortfolioData.length > 0
      ? finalPortfolioData.reduce(
          (acc, coin) => acc + coin.profitPercentage,
          0,
        ) / finalPortfolioData.length
      : 0;

  const totalHoldings = finalPortfolioData.length;

  const topHoldingsChartData = [...finalPortfolioData]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 5)
    .map((coin) => ({
      name: coin.name,
      value: coin.currentValue,
    }));
  return (
    <AppLayout>
      {() => (
        <div
          className={`h-[calc(100vh-80px)] overflow-y-auto hideScrollbar p-6 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#020617] text-white"
              : "bg-slate-100 text-slate-900"
          }`}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState
              error={error}
              onRetry={() => dispatch(getMarketData())}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Analytics</h1>

                <p className="mt-2 text-slate-400">
                  Deep insights into your portfolio performance
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <StatsCard
                  title="Best Performer"
                  value={bestPerformer?.name || "-"}
                  change={`${bestPerformer?.profitPercentage?.toFixed(2) || 0}%`}
                  changeColor="text-green-400"
                />

                <StatsCard
                  title="Worst Performer"
                  value={worstPerformer?.name || "-"}
                  change={`${worstPerformer?.profitPercentage?.toFixed(2) || 0}%`}
                  changeColor="text-red-400"
                />

                <StatsCard
                  title="Average Profit %"
                  value={`${averageProfit.toFixed(2)}%`}
                />

                <StatsCard title="Total Holdings" value={totalHoldings} />
              </div>
              {pieChartData.length > 0 ? (
                <div
                  className={`rounded-3xl border ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200 shadow-sm"
                  } p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50`}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                      Portfolio Distribution
                    </h2>

                    <p className="mt-1 text-slate-400">
                      Allocation of your holdings by portfolio value
                    </p>
                  </div>

                  <PortfolioDistributionChart pieChartData={pieChartData} />
                </div>
              ) : (
                <div
                  className={`flex min-h-[350px] items-center justify-center rounded-3xl border p-6 ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">No Portfolio Data</h2>

                    <p className="mt-2 text-slate-400">
                      Add some holdings to view analytics and charts
                    </p>
                  </div>
                </div>
              )}

              {barChartData.length > 0 && (
                <div
                  className={`rounded-3xl border ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200 shadow-sm"
                  } p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50`}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                      Investment vs Current Value
                    </h2>

                    <p className="mt-1 text-slate-400">
                      Compare your original investment against current portfolio
                      value
                    </p>
                  </div>

                  <InvestmentComparisonChart barChartData={barChartData} />
                </div>
              )}

              {profitLossChartData.length > 0 && (
                <div
                  className={`rounded-3xl border ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200 shadow-sm"
                  } p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50`}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Profit & Loss</h2>

                    <p className="mt-1 text-slate-400">
                      Your portfolio performance over time
                    </p>
                  </div>

                  <ProfitLossChart profitLossChartData={profitLossChartData} />
                </div>
              )}

              {topHoldingsChartData.length > 0 && (
                <div
                  className={`rounded-3xl border ${
                    theme === "dark"
                      ? "bg-[#0f172a] border-white/10"
                      : "bg-white border-slate-200 shadow-sm"
                  } p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50`}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Top Holdings</h2>

                    <p className="mt-1 text-slate-400">
                      Your largest portfolio positions by current value
                    </p>
                  </div>

                  <TopHoldingsChart
                    topHoldingsChartData={topHoldingsChartData}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default AnalyticsPage;
