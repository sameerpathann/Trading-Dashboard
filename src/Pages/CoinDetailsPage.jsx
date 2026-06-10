import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import AppLayout from "../Layout/AppLayout";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../Store/Features/watchlistSlice";
import { useEffect } from "react";
import { getMarketData } from "../Store/Features/marketSlice";

const CoinDetailsPage = () => {
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
        <div className="coinDetail-container h-[calc(100vh-80px)] overflow-y-auto bg-[#020617] p-6 text-white">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0f172a] p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img src={coin.image} alt={coin.name} className="h-16 w-16" />

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{coin.name}</h1>

                  <span className="rounded-xl bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                    Rank #{coin.market_cap_rank}
                  </span>
                </div>

                <p className="mt-1 text-slate-400 uppercase">{coin.symbol}</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isInWatchlist) {
                  dispatch(removeFromWatchlist(coin.id));
                } else {
                  dispatch(addToWatchlist(coin));
                }
              }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
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
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Current Price"
              value={`$${coin.current_price.toLocaleString()}`}
            />

            <StatCard title="Market Rank" value={`#${coin.market_cap_rank}`} />

            <StatCard
              title="24h High"
              value={`$${coin.high_24h.toLocaleString()}`}
            />

            <StatCard
              title="24h Low"
              value={`$${coin.low_24h.toLocaleString()}`}
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
              value={`${coin.price_change_percentage_24h.toFixed(2)}%`}
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

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#0f172a] p-6">
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
        </div>
      )}
    </AppLayout>
  );
};

const StatCard = ({ title, value, className = "" }) => (
  <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-5">
    <p className="text-sm text-slate-400">{title}</p>

    <h3 className={`mt-2 text-xl font-semibold ${className}`}>{value}</h3>
  </div>
);

export default CoinDetailsPage;
