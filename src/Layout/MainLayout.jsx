import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* Left */}
      <Sidebar />
      {/* Right */}
      <div className="flex-1">
        {/* Header */}
        <Header />
        {/* Main content */}
        <MainContent />
      </div>
    </div>
  );
};

export default MainLayout;
