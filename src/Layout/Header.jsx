import { Bell, Moon, Menu } from "lucide-react";

const Header = ({ query, setQuery, setIsSidebarOpen }) => {
  return (
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
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-2xl cursor-pointer p-3 bg-white/5 border border-white/10 transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
  );
};

export default Header;
