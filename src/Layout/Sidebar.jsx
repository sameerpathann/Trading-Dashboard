import { Moon, Sun } from "lucide-react";
import {
  LayoutDashboard,
  CandlestickChart,
  Star,
  Wallet,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Store/Features/themeSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    {
      id: 1,
      label: "Markets",
      icon: CandlestickChart,
      path: "/",
    },
    {
      id: 2,
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 3,
      label: "Watchlist",
      icon: Star,
      path: "/watchlist",
    },
    {
      id: 4,
      label: "Portfolio",
      icon: Wallet,
      path: "/portfolio",
    },
    {
      id: 5,
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      id: 6,
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const theme = useSelector((state) => state.theme.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-[240px] transform transition-transform duration-300 sm:static sm:translate-x-0 ${
        theme === "dark" ? "bg-[#071024]" : "bg-white border-r border-slate-200"
      } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className={`absolute right-4 top-4 rounded-xl border p-2 transition cursor-pointer hover:scale-105 lg:hidden ${
          theme === "dark"
            ? "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        <X size={25} />
      </button>

      <div
        className={`h-screen w-[240px] overflow-y-scroll hideScrollbar border-r p-4 ${
          theme === "dark"
            ? "border-white/10 bg-[#071024]"
            : "border-slate-200 bg-white"
        }`}
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-2xl bg-blue-500 px-4 py-2 text-xl font-bold text-white cursor-pointer transition-all duration-300 hover:scale-105">
              T
            </div>

            <div className="cursor-pointer">
              <h1
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                TradeX
              </h1>

              <p
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Crypto Terminal
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-lg font-medium transition-all duration-300 cursor-pointer hover:translate-x-1 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : theme === "dark"
                          ? "text-slate-300 hover:bg-white/5"
                          : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-4 text-left text-lg font-medium transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-white hover:border-blue-500/50"
                  : "border-slate-200 bg-slate-100 text-slate-900 hover:border-blue-400"
              }`}
            >
              <span className="font-medium">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>

              <div
                className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
                  theme === "dark" ? "bg-blue-500" : "bg-slate-400"
                }`}
              >
                <div
                  className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all duration-300 ${
                    theme === "dark" ? "translate-x-8" : "translate-x-1"
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

            <div
              className={`rounded-3xl border p-4 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 hover:border-blue-500/50"
                  : "border-slate-200 bg-slate-100 hover:border-blue-400"
              }`}
            >
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Logged in as
              </p>

              <h2
                className={`font-semibold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                Sameer Pathan
              </h2>

              <p className="text-sm text-green-500">Trader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
