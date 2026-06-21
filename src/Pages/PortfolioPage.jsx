import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../Layout/AppLayout";
import { removeHolding, updateHolding } from "../Store/Features/portfolioSlice";
import PortfolioCard from "../Components/Common/PortfolioCard";
import { useEffect, useState } from "react";
import { getMarketData } from "../Store/Features/marketSlice";
import { createPortfolioData } from "../Utils/portfolioUtils";

const PortfolioPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    quantity: "",
    buyPrice: "",
  });
  const [sortBy, setSortBy] = useState("default");
  const { holdings } = useSelector((state) => state.portfolio);
  const { marketCoins } = useSelector((state) => state.market);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    if (window.confirm("Are you Sure ?")) {
      dispatch(removeHolding(id));
    }
  };
  const handleEdit = (coin) => {
    setSelectedCoin(coin);

    setFormData({
      quantity: coin.quantity,
      buyPrice: coin.buyPrice,
    });

    setIsEditOpen(true);
  };
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = () => {
    if (!formData.quantity || !formData.buyPrice) {
      alert("Please fill all fields");
      return;
    }

    if (Number(formData.quantity) <= 0 || Number(formData.buyPrice) <= 0) {
      alert("Quantity and Buy Price must be greater than 0");
      return;
    }

    dispatch(
      updateHolding({
        id: selectedCoin.id,
        quantity: Number(formData.quantity),
        buyPrice: Number(formData.buyPrice),
      }),
    );

    setIsEditOpen(false);
    setSelectedCoin(null);
  };
  useEffect(() => {
    if (marketCoins.length === 0) dispatch(getMarketData());
  }, [dispatch, marketCoins.length]);

  const portFolioData = createPortfolioData(holdings, marketCoins);

  const filteredPortfolioData = portFolioData.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  });
  const sortedPortfolioData = [...filteredPortfolioData].sort((a, b) => {
    if (sortBy === "profit-high") {
      return b.profit - a.profit;
    }

    if (sortBy === "profit-low") {
      return a.profit - b.profit;
    }

    if (sortBy === "value-high") {
      return b.currentValue - a.currentValue;
    }

    if (sortBy === "value-low") {
      return a.currentValue - b.currentValue;
    }

    return 0;
  });
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

  const topGainer =
    sortedPortfolioData.length > 0
      ? sortedPortfolioData.reduce((max, coin) =>
          coin.profitPercentage > max.profitPercentage ? coin : max,
        )
      : null;
  const topLoser =
    sortedPortfolioData.length > 0
      ? sortedPortfolioData.reduce((min, coin) =>
          coin.profitPercentage < min.profitPercentage ? coin : min,
        )
      : null;
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
          {holdings.length > 0 ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1
                    className={`text-3xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    My Portfolio
                  </h1>

                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Manage your crypto investments
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Search coin..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`rounded-xl border px-4 py-2 outline-none transition-all duration-300 focus:border-blue-500 ${
                      theme === "dark"
                        ? "border-white/10 bg-[#0f172a] text-white"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  />

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`cursor-pointer rounded-xl border px-4 py-2 outline-none transition-all duration-300 ${
                      theme === "dark"
                        ? "border-white/10 bg-[#0f172a] text-white"
                        : "border-slate-200 bg-white text-slate-900"
                    }`}
                  >
                    <option value="default">Default</option>
                    <option value="profit-high">Profit High to Low</option>
                    <option value="profit-low">Profit Low to High</option>
                    <option value="value-high">Value High to Low</option>
                    <option value="value-low">Value Low to High</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div
                  className={`rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#0f172a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p
                    className={`text-sm {${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Total Investment
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    ${totalInvestment.toLocaleString()}
                  </h2>
                </div>

                <div
                  className={`rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#0f172a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p
                    className={`text-sm {${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Current Value
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    ${totalCurrentValue.toLocaleString()}
                  </h2>
                </div>

                <div
                  className={`rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#0f172a]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p
                    className={`text-sm {${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Profit / Loss
                  </p>

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
              {topGainer && topLoser && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-5">
                    <p className="text-sm text-green-400 font-medium">
                      🚀 Top Gainer
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={topGainer.image}
                        alt={topGainer.name}
                        className="h-10 w-10"
                      />

                      <div>
                        <h3 className="text-lg font-bold">{topGainer.name}</h3>

                        <p className="uppercase text-slate-400">
                          {topGainer.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-2xl font-bold text-green-400">
                        +{topGainer.profitPercentage.toFixed(2)}%
                      </p>

                      <p className="text-sm text-green-300">
                        +$
                        {topGainer.profit.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5">
                    <p className="text-sm text-red-400 font-medium">
                      📉 Top Loser
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={topLoser.image}
                        alt={topLoser.name}
                        className="h-10 w-10"
                      />

                      <div>
                        <h3 className="text-lg font-bold">{topLoser.name}</h3>

                        <p className="uppercase text-slate-400">
                          {topLoser.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-2xl font-bold text-red-400">
                        {topLoser.profitPercentage.toFixed(2)}%
                      </p>

                      <p className="text-sm text-red-300">
                        $
                        {topLoser.profit.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid gap-4">
                {sortedPortfolioData.map((coin) => (
                  <PortfolioCard
                    key={coin.id}
                    coin={coin}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-120px)] items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Portfolio is Empty</h1>

                <p
                  className={`mt-2 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Add your first crypto holding to start tracking your
                  investments
                </p>
              </div>
            </div>
          )}
          {isEditOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-200">
              <div
                className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0f172a] text-white"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">
                    Edit {selectedCoin.name}
                  </h2>

                  <p
                    className={`mt-1 text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Update your investment details
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Quantity
                    </label>

                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 ${
                        theme === "dark"
                          ? "border-white/10 bg-[#020617] text-white"
                          : "border-slate-200 bg-slate-50 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Buy Price
                    </label>

                    <input
                      type="number"
                      name="buyPrice"
                      value={formData.buyPrice}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 ${
                        theme === "dark"
                          ? "border-white/10 bg-[#020617] text-white"
                          : "border-slate-200 bg-slate-50 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditOpen(false);
                        setSelectedCoin(null);
                        setFormData({
                          quantity: "",
                          buyPrice: "",
                        });
                      }}
                      className={`flex-1 rounded-2xl border py-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "border-white/10 bg-white/5 hover:bg-white/10"
                          : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 rounded-2xl bg-blue-500 py-3 font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default PortfolioPage;
