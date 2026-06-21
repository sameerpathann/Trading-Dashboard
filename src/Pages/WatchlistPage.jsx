import { useSelector } from "react-redux";
import MarketRow from "../Components/Common/MarketRow";
import AppLayout from "../Layout/AppLayout";

const WatchlistPage = () => {
  const watchlistCoins = useSelector((state) => state.watchlist.coins);
  const { theme } = useSelector((state) => state.theme);

  return (
    <AppLayout>
      {() => (
        <div
          className={`p-6 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#020617] text-white"
              : "bg-slate-100 text-slate-900"
          }`}
        >
          <div className="space-y-6">
            <div>
              <h1
                className={`text-3xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                Your Watchlist
              </h1>

              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Track your favorite assets
              </p>
            </div>

            <div
              className={`rounded-3xl border p-6 transition-all duration-300 ${
                theme === "dark"
                  ? "border-white/10 bg-[#0f172a]"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Watchlist
                      </th>

                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Coin
                      </th>

                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Price
                      </th>

                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        24h %
                      </th>

                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Market Cap
                      </th>

                      <th
                        className={`text-left text-sm font-medium ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
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
                          className={`py-10 text-center ${
                            theme === "dark"
                              ? "text-slate-500"
                              : "text-slate-600"
                          }`}
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
      )}
    </AppLayout>
  );
};

export default WatchlistPage;
