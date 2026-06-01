import api from "./api";
export const fetchMarketData = async () => {
  const { data } = await api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: 1,
    },
  });
  return data;
};
