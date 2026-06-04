const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-xl font-semibold text-red-400">
        Failed to load market data
      </h2>

      <p className="text-slate-400">{error}</p>

      <button
        onClick={onRetry}
        className="rounded-2xl cursor-pointer bg-blue-500 px-5 py-3 font-medium hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
