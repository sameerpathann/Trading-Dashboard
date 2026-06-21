import AppLayout from "../Layout/AppLayout";
import { Moon, Sun, RotateCcw, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Store/Features/themeSlice";
import { clearHoldings } from "../Store/Features/portfolioSlice";
import { clearWatchlist } from "../Store/Features/watchlistSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  return (
    <AppLayout>
      {() => (
        <div
          className={`p-6 h-[calc(100vh-80px)] overflow-y-auto hideScrollbar transition-colors duration-300 ${
            theme === "dark"
              ? "bg-[#020617] text-white"
              : "bg-slate-100 text-slate-900"
          }`}
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>

              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Manage your application preferences
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div
                className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50"
                    : "border-slate-200 bg-white hover:border-blue-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Theme</h2>

                    <p
                      className={`mt-1 text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Switch between dark and light mode
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className="cursor-pointer"
                  >
                    <div
                      className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
                        theme === "dark" ? "bg-blue-500" : "bg-slate-400"
                      }`}
                    >
                      <div
                        className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-300 ${
                          theme === "dark" ? "translate-x-7" : "translate-x-1"
                        }`}
                      >
                        {theme === "dark" ? (
                          <Moon size={14} color="black" />
                        ) : (
                          <Sun size={14} color="black" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div
                className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50"
                    : "border-slate-200 bg-white hover:border-blue-400"
                }`}
              >
                <h2 className="text-xl font-bold">Currency</h2>

                <p
                  className={`mt-1 text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Display currency preference
                </p>

                <select
                  className={`mt-4 w-full cursor-pointer rounded-2xl border px-4 py-3 outline-none transition-all duration-300 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#020617]"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>INR (₹)</option>
                </select>
              </div>

              <div
                className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50"
                    : "border-slate-200 bg-white hover:border-blue-400"
                }`}
              >
                <h2 className="text-xl font-bold">Portfolio Preference</h2>

                <p
                  className={`mt-1 text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Portfolio display preference
                </p>

                <select
                  className={`mt-4 w-full cursor-pointer rounded-2xl border px-4 py-3 outline-none transition-all duration-300 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#020617]"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <option>Default View</option>
                  <option>Compact View</option>
                  <option>Detailed View</option>
                </select>
              </div>

              <div
                className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50"
                    : "border-slate-200 bg-white hover:border-blue-400"
                }`}
              >
                <h2 className="text-xl font-bold">Reset Data</h2>

                <p
                  className={`mt-1 text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Clear portfolio and watchlist data
                </p>

                <div className="mt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure ?")) {
                        dispatch(clearHoldings());
                      }
                    }}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500/20"
                  >
                    <Trash2 size={18} />
                    Clear Portfolio
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure ?")) {
                        dispatch(clearWatchlist());
                      }
                    }}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-yellow-400 transition-all duration-300 hover:bg-yellow-500/20"
                  >
                    <RotateCcw size={18} />
                    Clear Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SettingsPage;
