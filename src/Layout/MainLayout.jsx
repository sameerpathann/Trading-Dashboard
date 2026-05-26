import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import { useState } from "react";
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
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
        <Header
          query={query}
          setQuery={setQuery}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Main content */}
        <MainContent query={query} />
      </div>
    </div>
  );
};

export default MainLayout;
