import { Moon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="p-2 w-[240px]  bg-[#071024] h-screen overflow-y-scroll sideBar-Container border-r border-white/10 p-4">
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
  );
};

export default Sidebar;
