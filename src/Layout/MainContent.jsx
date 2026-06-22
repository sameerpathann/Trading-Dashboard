import { useEffect, useState } from "react";
import PriceChart from "../Components/Common/PriceChart";
import StatsCard from "../Components/Common/StatsCard";
import SectionWrapper from "../Components/Common/SectionWrapper";
import Button from "../Components/Common/Button";
import MarketRow from "../Components/Common/MarketRow";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketData } from "../Store/Features/marketSlice";
import LoadingSkeleton from "../Components/Common/LoadingSkeleton";
import ErrorState from "../Components/Common/ErrorState";
import { getChartData } from "../Store/Features/chartSlice";
const MainContent = ({ query }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1Y");
  const timeframeButtons = ["1D", "1W", "1M", "1Y"];
  const timeframeMap = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "1Y": 365,
  };
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const { marketCoins, loading, error } = useSelector((state) => state.market);

  const {
    chartData,
    loading: chartLoading,
    error: chartError,
  } = useSelector((state) => state.chart);

  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const filteredMarketData = marketCoins.filter((item) =>
    item.name.toLowerCase().includes(query?.toLowerCase() || ""),
  );

  const sortedMarketData = [...filteredMarketData];

  if (sortOrder === "asc") {
    sortedMarketData.sort((a, b) => a.current_price - b.current_price);
  }

  if (sortOrder === "desc") {
    sortedMarketData.sort((a, b) => b.current_price - a.current_price);
  }

  const totalPages = Math.ceil(sortedMarketData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = sortedMarketData.slice(startIndex, endIndex);

  const visiblePages = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    visiblePages.push(i);
  }

  const renderSortIcon = () => {
    if (sortOrder === "asc") {
      return <ArrowUp size={16} />;
    }

    if (sortOrder === "desc") {
      return <ArrowDown size={16} />;
    }

    return <ArrowUpDown size={16} />;
  };

  useEffect(() => {
    dispatch(getMarketData());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortOrder]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    dispatch(getChartData(timeframeMap[activeTimeframe]));
  }, [activeTimeframe, dispatch]);
  return (
    <div
      className={`h-[calc(100vh-80px)] hideScrollbar overflow-y-auto p-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#020617] text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState error={error} onRetry={() => dispatch(getMarketData())} />
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statsData.map((item) => (
              <StatsCard
                key={item.id}
                title={item.title}
                value={item.value}
                change={item.change}
                changeColor={item.changeColor}
              />
            ))}
          </div>

          {/* Chart Section */}
          <SectionWrapper className="transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
            {" "}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Bitcoin Price</h2>

                <p
                  className={`mt-1 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  BTC / USD
                </p>
              </div>

              <div className="flex items-center gap-2">
                {timeframeButtons.map((timeframe) => (
                  <Button
                    key={timeframe}
                    className="text-sm cursor-pointer"
                    variant={
                      activeTimeframe === timeframe ? "primary" : "secondary"
                    }
                    onClick={() => setActiveTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
            <div
              className={`mt-6 rounded-3xl border border-dashed p-4 transition-all duration-300 hover:scale-[1.01] ${
                theme === "dark"
                  ? "border-white/10 bg-[#020617]"
                  : "border-slate-300 bg-slate-50"
              }`}
            >
              <PriceChart activeTimeframe={activeTimeframe} />
            </div>
          </SectionWrapper>

          {/* Market Table */}
          <SectionWrapper className="transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50">
            {" "}
            <h2 className="text-2xl font-bold cursor-default">
              Market Overview
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="h-full w-full border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Watchlist
                    </th>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Coin
                    </th>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <Button
                        className="cursor-pointer flex items-center gap-1.5"
                        variant="secondary"
                        onClick={() =>
                          setSortOrder((prev) => {
                            if (prev === "default") {
                              return "asc";
                            }

                            if (prev === "asc") {
                              return "desc";
                            }

                            return "default";
                          })
                        }
                      >
                        Price
                        {renderSortIcon()}
                      </Button>
                    </th>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      24h %
                    </th>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Market Cap
                    </th>
                    <th
                      className={`text-left text-sm font-medium ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <MarketRow key={item.id} item={item} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className={`py-10 text-center ${
                          theme === "dark" ? "text-slate-500" : "text-slate-600"
                        }`}
                      >
                        No assets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-6 flex flex-wrap items-center justify-evenly gap-3">
                <div className="">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Showing {sortedMarketData.length === 0 ? 0 : startIndex + 1}
                    {" - "}
                    {Math.min(endIndex, sortedMarketData.length)}
                    {" of "}
                    {sortedMarketData.length} assets
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`cursor-pointer rounded-2xl px-4 py-2 font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                      theme === "dark"
                        ? "bg-[#0f172a] border border-white/10 hover:border-blue-500/50 hover:bg-[#172036]"
                        : "bg-white border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                    }`}
                  >
                    Previous
                  </button>

                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`cursor-pointer rounded-2xl px-4 py-2 font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : theme === "dark"
                            ? "bg-[#0f172a] border border-white/10 hover:border-blue-500/50 hover:bg-[#172036]"
                            : "bg-white border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`cursor-pointer rounded-2xl px-4 py-2 font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                      theme === "dark"
                        ? "bg-[#0f172a] border border-white/10 hover:border-blue-500/50 hover:bg-[#172036]"
                        : "bg-white border border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      )}
    </div>
  );
};

export default MainContent;
