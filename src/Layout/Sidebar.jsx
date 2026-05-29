import { Moon } from "lucide-react";
import {
  LayoutDashboard,
  CandlestickChart,
  Star,
  Wallet,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-[240px transform bg-[#071024]] transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="absolute right-4 top-4 text-slate-400 cursor-pointer p-2 bg-white/5 border border-white/10 transition hover:bg-white/10 rounded-xl lg:hidden"
      >
        <X size={25} />
      </button>
      <div className="p-2 w-[240px]  bg-[#071024] h-screen overflow-y-scroll sideBar-Container border-r border-white/10 p-4">
        {/* Logo */}
        <div onClick={() => navigate("/")}>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 py-2 px-4 cursor-pointer rounded-2xl text-xl font-bold flex items-center justify-center">
              T
            </div>
            <div className="cursor-pointer">
              <h1 className="text-lg font-bold">TradeX</h1>
              <p className="text-xs text-slate-400">Crypto Terminal</p>
            </div>
          </div>
        </div>
        {/* Links */}
        <div className="pt-10">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className={({ isActive }) =>
                    `flex items-center cursor-pointer gap-3 rounded-2xl px-4 py-3 text-left text-lg font-medium transition ${isActive ? `bg-blue-500 text-white` : `text-slate-300 hover:bg-white/5`}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
          {/* Bottom */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              className={`cursor-pointer text-left py-3 px-4 flex items-center gap-1 rounded-2xl text-lg font-medium border border-white/10 bg-white/5`}
            >
              <Moon size={18} /> <span>Dark Mode</span>
            </button>
            <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-3xl border border-white/10">
              <p className=" text-sm text-slate-400">Logged in as</p>
              <h2 className="font-semibold">Sameer pathan</h2>
              <p className="text-sm text-green-400">Frontend trader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
