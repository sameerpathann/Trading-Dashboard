import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../Store/Features/watchlistSlice";
import Button from "./Button";

const MarketRow = ({ item }) => {
  const dispatch = useDispatch();
  const watchlistCoins = useSelector((state) => state.watchlist.coins);
  const isInWatchlist = watchlistCoins.some((coin) => coin.id === item.id);
  return (
    <tr className="rounded-2xl bg-[#020617] transition hover:bg-white/5">
      <td className="rounded-l-2xl px-4 py-4">
        <Button
          className="cursor-pointer"
          variant="secondary"
          onClick={() => {
            if (isInWatchlist) dispatch(removeFromWatchlist(item.id));
            else dispatch(addToWatchlist(item));
          }}
        >
          <Star
            size={18}
            className={`transition-all duration-75 ${isInWatchlist ? `fill-yellow-400 text-yellow-400` : `text-slate-500`}`}
          />
        </Button>
      </td>
      <td className="px-4 py-4">
        <div>
          <h3 className="font-semibold">{item.coin}</h3>
          <p className="text-sm text-slate-400">{item.symbol}</p>
        </div>
      </td>
      <td className="px-4 py-4 font-medium">{item.price}</td>
      <td
        className={`px-4 py-4 font-medium ${item.change.includes("-") ? `text-red-400` : `text-green-400`}`}
      >
        {item.change}
      </td>
      <td className="px-4 py-4">{item.marketCap}</td>
      <td className="rounded-r-2xl px-4 py-4">{item.volume}</td>
    </tr>
  );
};

export default MarketRow;
