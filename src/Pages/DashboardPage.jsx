import AppLayout from "../Layout/AppLayout";

const DashboardPage = () => {
  return (
    <AppLayout>
      {() => (
        <div className="min-h-screen bg-[#020617] p-6 text-white">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="mt-2 text-slate-400">Dashboard page coming soon.</p>
        </div>
      )}
    </AppLayout>
  );
};

export default DashboardPage;
