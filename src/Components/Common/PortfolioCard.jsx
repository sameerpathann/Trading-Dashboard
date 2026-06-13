const PortfolioCard = ({ coin, handleRemove, handleEdit }) => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#0f172a] p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4 w-[15%]">
        <img src={coin.image} alt={coin.name} className="h-14 w-14" />

        <div>
          <h2 className="text-xl font-bold">{coin.name}</h2>

          <p className="uppercase text-slate-400">{coin.symbol}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:flex md:justify-center w-[70%]">
        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Quantity</p>

          <h3 className="mt-1 font-medium text-[15px]">
            {coin.quantity?.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Buy Price</p>

          <h3 className="mt-1 font-medium text-[15px]">
            ${coin.buyPrice.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Current Price</p>

          <h3 className="mt-1 font-medium text-[15px] text-blue-400">
            ${coin.currentPrice.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Investment</p>

          <h3 className="mt-1 font-medium text-[15px]">
            ${coin.totalInvestment.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Current Value</p>

          <h3 className="mt-1 font-medium text-[15px]">
            ${coin.currentValue.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col w-[14%] items-center">
          <p className="text-xs text-slate-400">Profit / Loss</p>

          <h3
            className={`mt-1 font-medium text-[15px] ${
              coin.profit >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            $
            {coin.profit.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>

          <p
            className={`text-xs ${
              coin.profit >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {coin.profit >= 0 ? "+" : ""}
            {coin.profitPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleEdit(coin)}
          className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-blue-400 transition hover:bg-blue-500/20 cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => handleRemove(coin.id)}
          className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500/20 cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
