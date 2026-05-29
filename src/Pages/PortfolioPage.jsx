import AppLayout from "../Layout/AppLayout";

const PortfolioPage = () => {
  return (
    <>
      <AppLayout>
        {() => (
          <div className="min-h-screen bg-[#020617] p-6 text-white">
            <h1 className="text-3xl font-bold">Portfolio</h1>

            <p className="mt-2 text-slate-400">Portfolio page coming soon.</p>
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default PortfolioPage;
