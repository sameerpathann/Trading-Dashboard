import React from "react";
import MainLayout from "./Layout/mainLayout";
import { Routes, Route } from "react-router-dom";
import WatchlistPage from "./Pages/WatchlistPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
    </Routes>
  );
};

export default App;
