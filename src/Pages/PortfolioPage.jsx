import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../Layout/AppLayout";
import { removeHolding } from "../Store/Features/portfolioSlice";
import PortfolioCard from "../Components/Common/PortfolioCard";
import { useEffect } from "react";
import { getMarketData } from "../Store/Features/marketSlice";

const PortfolioPage = () => {
  const { holdings } = useSelector((state) => state.portfolio);
  const { marketCoins } = useSelector((state) => state.market);

  const dispatch = useDispatch();
  const handleRemove = (id) => {
    if (window.confirm("Are you Sure ?")) {
      dispatch(removeHolding(id));
    }
  };

  useEffect(() => {
    if (marketCoins.length === 0) dispatch(getMarketData());
  }, [dispatch, marketCoins.length]);

  const portFolioData = holdings
    .map((holding) => {
      const marketCoin = marketCoins.find((coin) => coin.id === holding.id);

      if (!marketCoin) return null;
      const totalInvestment = holding.quantity * holding.buyPrice;
      const currentValue = holding.quantity * marketCoin.current_price;
      const profit = currentValue - totalInvestment;
      const profitPercentage =
        totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;
      return {
        ...holding,
        totalInvestment,
        currentValue,
        profit,
        profitPercentage,
        currentPrice: marketCoin.current_price,
      };
    })
    .filter(Boolean);

  const totalInvestment = portFolioData.reduce(
    (total, coin) => total + coin.totalInvestment,
    0,
  );

  const totalCurrentValue = portFolioData.reduce(
    (total, coin) => total + coin.currentValue,
    0,
  );

  const totalProfit = totalCurrentValue - totalInvestment;
  const profitPercentage =
    totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
  return (
    <AppLayout>
      {() => (
        <div className="h-[calc(100vh-80px)] overflow-y-auto hideScrollbar bg-[#020617] p-6 text-white">
          {holdings.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">My Portfolio</h1>
                <p className="mt-2 text-slate-400">
                  Manage your crypto investments
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-sm text-slate-400">Total Investment</p>

                  <h2 className="mt-2 text-2xl font-bold">
                    ${totalInvestment.toLocaleString()}
                  </h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-sm text-slate-400">Current Value</p>

                  <h2 className="mt-2 text-2xl font-bold">
                    ${totalCurrentValue.toLocaleString()}
                  </h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-sm text-slate-400">Profit / Loss</p>

                  <h2
                    className={`mt-2 text-2xl font-bold ${
                      totalProfit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    $
                    {totalProfit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h2>

                  <p
                    className={`mt-1 text-sm font-medium ${
                      totalProfit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {totalProfit >= 0 ? "+" : ""}
                    {profitPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                {portFolioData.map((coin) => (
                  <PortfolioCard
                    key={coin.id}
                    coin={coin}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-120px)] items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Portfolio is Empty</h1>

                <p className="mt-2 text-slate-400">
                  Add your first crypto holding to start tracking your
                  investments
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default PortfolioPage;
