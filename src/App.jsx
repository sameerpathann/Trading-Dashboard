import React from "react";
import MainLayout from "./Layout/mainLayout";
import { Routes, Route } from "react-router-dom";
import WatchlistPage from "./Pages/WatchlistPage";
import DashboardPage from "./Pages/DashboardPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import PortfolioPage from "./Pages/PortfolioPage";
import SettingsPage from "./Pages/SettingsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default App;
