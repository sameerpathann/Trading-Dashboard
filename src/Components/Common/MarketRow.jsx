const MarketRow = ({ item }) => {
  return (
    <tr className="rounded-2xl bg-[#020617] transition hover:bg-white/5">
      <td className="rounded-l-2xl px-4 py-4">
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
