import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ query, setQuery, setIsSidebarOpen }) => {
  const { pathname } = useLocation();

  const { theme } = useSelector((state) => state.theme);

  const pageTitles = {
    "/": {
      title: "Markets",
      subtitle: "Track Live market movement",
    },
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Overview of your crypto portfolio",
    },
    "/watchlist": {
      title: "Watchlist",
      subtitle: "Monitor your favorite assets",
    },
    "/portfolio": {
      title: "Portfolio",
      subtitle: "Manage your investments",
    },
    "/analytics": {
      title: "Analytics",
      subtitle: "Visualize portfolio performance",
    },
    "/settings": {
      title: "Settings",
      subtitle: "Manage your application preferences",
    },
  };

  const currentPage = pageTitles[pathname] || pageTitles["/"];

  return (
    <div
      className={`h-[80px] border-b px-6 flex items-center transition-colors duration-300 ${
        theme === "dark"
          ? "border-white/10 bg-[#020617]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div>
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {currentPage.title}
          </h1>

          <p
            className={`mt-1 text-sm ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {currentPage.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className={`flex items-center justify-center rounded-2xl border p-3 cursor-pointer transition-all duration-300 hover:scale-105 lg:hidden ${
              theme === "dark"
                ? "border-white/10 bg-white/5 hover:bg-white/10"
                : "border-slate-200 bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <Menu size={20} />
          </button>

          {pathname === "/" && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-[260px] rounded-2xl border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 ${
                theme === "dark"
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-slate-100 text-slate-900 placeholder:text-slate-400"
              }`}
              type="text"
              placeholder="Search assets..."
            />
          )}

          <button
            className={`flex items-center justify-center rounded-2xl border px-3 py-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Bell size={18} />
          </button>

          <button className="flex items-center justify-center rounded-2xl bg-blue-500 px-4 py-2.5 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-blue-600">
            <h4 className="font-bold text-white">S</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
