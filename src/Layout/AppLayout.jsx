import { useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`flex  transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#020617] text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="sm:flex-1">
        <Header
          query={query}
          setQuery={setQuery}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {children(query)}
      </div>
    </div>
  );
};

export default AppLayout;
