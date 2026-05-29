import { useSelector } from "react-redux";
import MarketRow from "../Components/Common/MarketRow";

const WatchlistPage = () => {
  const watchlistCoins = useSelector((state) => state.watchlist.coins);
  return (
    <div className="bg-[#020617]  p-6 text-white">
      <div className="space-y-6">
        <div className="text-3xl font-semibold">
          <h1>Your Watchlist</h1>
          <p className="mt-2 text-slate-400"> Track your favorite assets</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-slate-400">
                    Watchlist
                  </th>
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
                {watchlistCoins.length > 0 ? (
                  watchlistCoins.map((item) => (
                    <MarketRow key={item.id} item={item} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-slate-500"
                    >
                      No coins in watchlist.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
