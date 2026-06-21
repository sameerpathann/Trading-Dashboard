import { useSelector } from "react-redux";

const MarketInsightCard = ({ title, coins, isGainer }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`rounded-3xl border p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50"
          : "border-slate-200 bg-white hover:border-blue-400"
      }`}
    >
      <h2
        className={`mb-5 text-xl font-bold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      <div className="space-y-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className={`flex cursor-pointer items-center justify-between rounded-2xl p-3 transition-all duration-300 hover:scale-[1.02] ${
              theme === "dark"
                ? "bg-[#020617] hover:bg-[#1e293b]"
                : "bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="h-10 w-10 rounded-full"
              />

              <div>
                <h3
                  className={`font-semibold ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {coin.name}
                </h3>

                <p
                  className={`text-sm uppercase ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {coin.symbol}
                </p>
              </div>
            </div>

            <p
              className={`font-bold ${
                isGainer ? "text-green-400" : "text-red-400"
              }`}
            >
              {isGainer ? "+" : ""}
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketInsightCard;
