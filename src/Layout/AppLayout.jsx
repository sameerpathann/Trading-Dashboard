import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [query, setQuery] = useState("");

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1">
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
