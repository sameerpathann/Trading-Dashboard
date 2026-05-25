import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import { useState } from "react";
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex">
      {/* Left */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Right */}
      <div className="flex-1">
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        {/* Main content */}
        <MainContent />
      </div>
    </div>
  );
};

export default MainLayout;
