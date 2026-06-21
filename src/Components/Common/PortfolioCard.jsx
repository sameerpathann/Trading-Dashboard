import { useSelector } from "react-redux";

const PortfolioCard = ({ coin, handleRemove, handleEdit }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`flex flex-col gap-6 rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50 hover:bg-[#172036]"
          : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
      } md:flex-row md:items-center md:justify-between`}
    >
      <div className="flex items-center gap-4 md:w-[15%]">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-14 w-14 rounded-full"
        />

        <div>
          <h2
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {coin.name}
          </h2>

          <p
            className={`uppercase ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {coin.symbol}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:flex md:w-[70%] md:justify-center">
        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Quantity
          </p>

          <h3
            className={`mt-1 text-[15px] font-medium ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {coin.quantity?.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Buy Price
          </p>

          <h3
            className={`mt-1 text-[15px] font-medium ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            ${coin.buyPrice.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Current Price
          </p>

          <h3 className="mt-1 text-[15px] font-medium text-blue-400">
            ${coin.currentPrice.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Investment
          </p>

          <h3
            className={`mt-1 text-[15px] font-medium ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            ${coin.totalInvestment.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Current Value
          </p>

          <h3
            className={`mt-1 text-[15px] font-medium ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            ${coin.currentValue.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center md:w-[14%]">
          <p
            className={`text-xs ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Profit / Loss
          </p>

          <h3
            className={`mt-1 text-[15px] font-medium ${
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
          className="cursor-pointer rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-blue-400 transition-all duration-300 hover:scale-105 hover:bg-blue-500/20"
        >
          Edit
        </button>

        <button
          onClick={() => handleRemove(coin.id)}
          className="cursor-pointer rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500/20"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
