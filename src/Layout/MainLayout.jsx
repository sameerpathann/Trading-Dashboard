import { Bell, Moon } from "lucide-react";
import React from "react";
import StatsCard from "../Components/Common/StatsCard";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* left */}
      <div>
        <div className="p-2 w-[240px]  bg-[#071024] min-h-screen border-r border-white/10 p-4">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 py-2 px-4 rounded-2xl text-xl font-bold flex items-center justify-center">
                T
              </div>
              <div>
                <h1 className="text-lg font-bold">TradeX</h1>
                <p className="text-xs text-slate-400">Crypto Terminal</p>
              </div>
            </div>
          </div>
          {/* Links */}
          <div className="pt-10">
            <div className="flex flex-col gap-2">
              <button
                className={`bg-blue-500 cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Markets
              </button>
              <button
                className={`cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Dashboard
              </button>
              <button
                className={`cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Watchlist
              </button>
              <button
                className={`cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Portfolio
              </button>
              <button
                className={`cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Analytics
              </button>
              <button
                className={`cursor-pointer text-left py-3 px-4 rounded-2xl text-lg font-medium`}
              >
                Settings
              </button>
            </div>
            {/* Bottom */}
            <div className="flex flex-col gap-4">
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
      {/* Right */}
      <div className="flex-1">
        {/* Header */}
        <div className="h-[80px] border-b border-white/10 bg-[#020617] px-6 flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* left */}
            <div>
              <h1 className="text-2xl font-bold">Markets</h1>
              <p className="text-sm text-slate-400 mt-1">
                Track Live market movement
              </p>
            </div>
            {/* Right */}
            <div className="flex items-center gap-4">
              <input
                className="outline-none cursor-pointer border border-white/10 transition rounded-2xl bg-white/5 px-4 py-3 placeholder:text-slate-500 focus:border-blue-500 w-[260px]"
                type="text"
                placeholder="Search assets..."
              />
              <button className="flex py-3 cursor-pointer px-3 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10  duration-75">
                <Bell size={18} />
              </button>
              <button className="flex py-2.5 cursor-pointer px-4 items-center justify-center rounded-2xl bg-blue-500  hover:bg-blue-600 transition duration-75">
                <h4 className="font-bold">S</h4>
              </button>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="p-6 bg-[#020617] min-h-[calc(100vh-70px)]">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <StatsCard
                title="Market Cap"
                value="$2.91T"
                change="+2.34%"
                changeColor="text-green-400"
              />

              <StatsCard
                title="24h Volume"
                value="$124B"
                change="+5.21%"
                changeColor="text-green-400"
              />

              <StatsCard
                title="BTC Dominance"
                value="58.4%"
                change="-0.82%"
                changeColor="text-red-400"
              />

              <StatsCard
                title="Fear & Greed"
                value="72"
                change="Greed"
                changeColor="text-green-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
