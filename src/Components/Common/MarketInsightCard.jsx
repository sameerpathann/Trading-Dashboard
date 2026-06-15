const MarketInsightCard = ({ title, coins, isGainer }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-5 transition-all duration-300 hover:border-blue-500/50">
      <h2 className="mb-5 text-xl font-bold">{title}</h2>

      <div className="space-y-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex items-center justify-between rounded-2xl bg-[#020617] p-3 cursor-pointer transition-all duration-300 hover:bg-[#1e293b]"
          >
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="h-10 w-10" />

              <div>
                <h3 className="font-semibold">{coin.name}</h3>
                <p className="text-sm uppercase text-slate-400">
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
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketInsightCard;
