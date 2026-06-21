import api from "./api";

export const fetchChartData = async (days) => {
  const { data } = await api.get("coins/bitcoin/market_chart", {
    params: {
      vs_currency: "usd",
      days,
    },
  });

  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }));
};
