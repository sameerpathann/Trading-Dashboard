import AppLayout from "../Layout/AppLayout";

const AnalyticsPage = () => {
  return (
    <>
      <AppLayout>
        {() => (
          <div className="min-h-screen bg-[#020617] p-6 text-white">
            <h1 className="text-3xl font-bold">Analytics</h1>

            <p className="mt-2 text-slate-400">Analytics page coming soon.</p>
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default AnalyticsPage;
