import AppLayout from "./AppLayout";
import MainContent from "./MainContent";

const MainLayout = () => {
  return <AppLayout>{(query) => <MainContent query={query} />}</AppLayout>;
};

export default MainLayout;
