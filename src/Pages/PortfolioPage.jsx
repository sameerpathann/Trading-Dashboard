import { useSelector } from "react-redux";
import AppLayout from "../Layout/AppLayout";

const PortfolioPage = () => {
  const { holdings } = useSelector((state) => state.portfolio);

  return (
    <AppLayout>
      {() => (
        <div className="h-[calc(100vh-80px)] overflow-y-auto hideScrollbar bg-[#020617] p-6 text-white">
          {holdings.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">My Portfolio</h1>
                <p className="mt-2 text-slate-400">
                  Manage your crypto investments
                </p>
              </div>

              <div className="grid gap-4">
                {holdings.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0f172a] p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-12 w-12"
                      />

                      <div>
                        <h2 className="text-xl font-semibold">{coin.name}</h2>

                        <p className="uppercase text-slate-400">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div>
                        <p className="text-sm text-slate-400">Quantity</p>

                        <h3 className="font-semibold">{coin.quantity}</h3>
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">Buy Price</p>

                        <h3 className="font-semibold">
                          ${coin.buyPrice.toLocaleString()}
                        </h3>
                      </div>
                    </div>

                    <button className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-400 transition hover:bg-red-500/20 cursor-pointer">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-120px)] items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Portfolio is Empty</h1>

                <p className="mt-2 text-slate-400">
                  Add your first crypto holding to start tracking your
                  investments
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default PortfolioPage;
