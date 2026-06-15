export const createPortfolioData = (holdings, marketCoins) => {
  return holdings
    .map((holding) => {
      const marketCoin = marketCoins.find((coin) => coin.id === holding.id);

      if (!marketCoin) return null;
      const totalInvestment = holding.quantity * holding.buyPrice;
      const currentValue = holding.quantity * marketCoin.current_price;
      const profit = currentValue - totalInvestment;
      const profitPercentage =
        totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;
      return {
        ...holding,
        totalInvestment,
        currentValue,
        profit,
        profitPercentage,
        currentPrice: marketCoin.current_price,
      };
    })
    .filter(Boolean);
};
