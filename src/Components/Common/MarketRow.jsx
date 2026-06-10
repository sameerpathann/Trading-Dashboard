import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../Store/Features/watchlistSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const MarketRow = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlistCoins = useSelector((state) => state.watchlist.coins);
  const isInWatchlist = watchlistCoins.some((coin) => coin.id === item.id);

  return (
    <tr
      onClick={() => navigate(`/coin/${item.id}`)}
      className="rounded-2xl cursor-pointer bg-[#020617] transition hover:bg-white/5"
    >
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
      <td className="px-4  py-4">
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-8 h-8" />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-slate-400">
              {item.symbol.toUpperCase()}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 font-medium">
        ${item.current_price.toLocaleString()}
      </td>
      <td
        className={`px-4 py-4 font-medium ${item.price_change_percentage_24h < 0 ? `text-red-400` : `text-green-400`}`}
      >
        {item.price_change_percentage_24h > 0 ? "+" : ""}
        {item.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="px-4 py-4">{item.market_cap.toLocaleString()}</td>
      <td className="rounded-r-2xl px-4 py-4">
        {item.total_volume.toLocaleString()}
      </td>
    </tr>
  );
};

export default MarketRow;
