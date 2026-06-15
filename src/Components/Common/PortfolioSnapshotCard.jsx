const PortfolioSnapshotCard = ({ coin }) => {
  return (
    <div className="cursor-pointer rounded-3xl border border-white/10 bg-[#0f172a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-[#172036]">
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="h-12 w-12" />

        <div>
          <h2 className="text-lg font-bold text-white">{coin.name}</h2>

          <p className="text-sm uppercase text-slate-400">{coin.symbol}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <p className="text-slate-400">Quantity</p>

          <p className="font-semibold">{coin.quantity.toLocaleString()}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-slate-400">Current Value</p>

          <p className="font-semibold">
            $
            {coin.currentValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-slate-400">Profit / Loss</p>

          <div className="text-right">
            <p
              className={`font-semibold ${
                coin.profit >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {coin.profit >= 0 ? "+" : ""}$
              {coin.profit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <p
              className={`text-sm ${
                coin.profit >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {coin.profit >= 0 ? "+" : ""}
              {coin.profitPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSnapshotCard;
