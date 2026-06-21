import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import AppLayout from "../Layout/AppLayout";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../Store/Features/watchlistSlice";
import { useEffect, useState } from "react";
import { getMarketData } from "../Store/Features/marketSlice";
import { addHolding } from "../Store/Features/portfolioSlice";

const CoinDetailsPage = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: "",
    buyPrice: "",
  });
  const { theme } = useSelector((state) => state.theme);

  const { coinId } = useParams();

  const dispatch = useDispatch();

  const { marketCoins, loading } = useSelector((state) => state.market);

  const watchlistCoins = useSelector((state) => state.watchlist.coins);

  const coin = marketCoins.find((coin) => coin.id === coinId);

  const isInWatchlist = watchlistCoins.some((item) => item.id === coin?.id);
  useEffect(() => {
    if (marketCoins.length === 0) {
      dispatch(getMarketData());
    }
  }, [dispatch, marketCoins.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.quantity || !formData.buyPrice) {
      alert("Please fill all the fields");
      return;
    } else if (
      Number(formData.quantity) <= 0 ||
      Number(formData.buyPrice) <= 0
    ) {
      alert("Quantity and buy price must be greater than 0");
    } else {
      dispatch(
        addHolding({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          quantity: Number(formData.quantity),
          buyPrice: Number(formData.buyPrice),
        }),
      );
      setFormData({ quantity: "", buyPrice: "" });
      setIsPortfolioOpen(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) {
    return (
      <AppLayout>
        {() => (
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            Loading...
          </div>
        )}
      </AppLayout>
    );
  }

  if (!coin) {
    return (
      <AppLayout>
        {() => (
          <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-[#020617] p-6">
            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8 text-center">
              <h1 className="text-3xl font-bold text-white">Coin Not Found</h1>

              <p className="mt-2 text-slate-400">
                The requested asset could not be found.
              </p>
            </div>
          </div>
        )}
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {() => (
        <div
          className={`hideScrollbar h-[calc(100vh-80px)] overflow-y-auto p-6 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#020617] text-white"
              : "bg-slate-100 text-slate-900"
          }`}
        >
          <div
            className={`flex flex-col gap-4 rounded-3xl border ${
              theme === "dark"
                ? "border-white/10 bg-[#0f172a]"
                : "border-slate-200 bg-white shadow-sm"
            } p-6 md:flex-row md:items-center md:justify-between`}
          >
            <div className="flex items-center gap-4">
              <img src={coin.image} alt={coin.name} className="h-16 w-16" />

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{coin.name}</h1>

                  <span className="rounded-xl bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                    Rank #{coin.market_cap_rank}
                  </span>
                </div>

                <p
                  className={`mt-1 uppercase ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {coin.symbol}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <button
                onClick={() => {
                  if (isInWatchlist) {
                    dispatch(removeFromWatchlist(coin.id));
                  } else {
                    dispatch(addToWatchlist(coin));
                  }
                }}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-5 py-3 transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <Star
                  size={18}
                  className={
                    isInWatchlist
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-400"
                  }
                />

                <span>
                  {isInWatchlist ? "Remove Watchlist" : "Add Watchlist"}
                </span>
              </button>
              <button
                onClick={() => setIsPortfolioOpen(true)}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-5 py-3 transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "border-white/10 bg-white/5 hover:bg-white/10"
                    : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Add to Portfolio
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Current Price"
              value={`$${coin.current_price.toLocaleString()}`}
            />

            <StatCard title="Market Rank" value={`#${coin.market_cap_rank}`} />

            <StatCard
              title="24h High"
              value={`$${coin.high_24h?.toLocaleString()}`}
            />

            <StatCard
              title="24h Low"
              value={`$${coin.low_24h?.toLocaleString()}`}
            />

            <StatCard title="ATH" value={`$${coin.ath.toLocaleString()}`} />

            <StatCard title="ATL" value={`$${coin.atl.toLocaleString()}`} />

            <StatCard
              title="Market Cap"
              value={`$${coin.market_cap.toLocaleString()}`}
            />

            <StatCard
              title="Volume"
              value={`$${coin.total_volume.toLocaleString()}`}
            />

            <StatCard
              title="24h Change"
              value={`${coin.price_change_percentage_24h?.toFixed(2)}%`}
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            />

            <StatCard
              title="Circulating Supply"
              value={coin.circulating_supply?.toLocaleString()}
            />

            <StatCard
              title="Total Supply"
              value={coin.total_supply?.toLocaleString()}
            />

            <StatCard
              title="Max Supply"
              value={
                coin.max_supply ? coin.max_supply.toLocaleString() : "Unlimited"
              }
            />
          </div>

          <div
            className={`mt-8 rounded-3xl border p-6 transition-all duration-300 ${
              theme === "dark"
                ? "border-white/10 bg-[#0f172a]"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <h2 className="mb-6 text-2xl font-bold">Historical Information</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-slate-400">All Time High Date</p>

                <h3 className="mt-2 text-lg font-semibold">
                  {new Date(coin.ath_date).toLocaleDateString()}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">All Time Low Date</p>

                <h3 className="mt-2 text-lg font-semibold">
                  {new Date(coin.atl_date).toLocaleDateString()}
                </h3>
              </div>
            </div>
          </div>
          {isPortfolioOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">
                    Add {coin.name} to Portfolio
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Enter your investment details
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Quantity
                    </label>

                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
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
                      type="text"
                      name="buyPrice"
                      value={formData.buyPrice}
                      onChange={handleInputChange}
                      placeholder="Enter buy price"
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 ${
                        theme === "dark"
                          ? "border-white/10 bg-[#020617] text-white"
                          : "border-slate-200 bg-slate-50 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ quantity: "", buyPrice: "" });
                        setIsPortfolioOpen(false);
                      }}
                      className={`flex-1 cursor-pointer rounded-2xl border py-3 transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "border-white/10 bg-white/5 hover:bg-white/10"
                          : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 cursor-pointer rounded-2xl bg-blue-500 py-3 font-medium transition hover:bg-blue-600"
                    >
                      Add Holding
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

const StatCard = ({ title, value, className = "" }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`cursor-pointer rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a]"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      <p
        className={`text-sm ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h3
        className={`mt-2 text-xl font-semibold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        } ${className}`}
      >
        {value}
      </h3>
    </div>
  );
};

export default CoinDetailsPage;
