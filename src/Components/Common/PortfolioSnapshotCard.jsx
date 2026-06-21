import { useSelector } from "react-redux";

const PortfolioSnapshotCard = ({ coin }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`cursor-pointer rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] hover:border-blue-500/50 hover:bg-[#172036]"
          : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2
            className={`text-lg font-bold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {coin.name}
          </h2>

          <p
            className={`text-sm uppercase ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {coin.symbol}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
            Quantity
          </p>

          <p
            className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {coin.quantity.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between">
          <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
            Current Value
          </p>

          <p
            className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            $
            {coin.currentValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex justify-between">
          <p className={theme === "dark" ? "text-slate-400" : "text-slate-500"}>
            Profit / Loss
          </p>

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
