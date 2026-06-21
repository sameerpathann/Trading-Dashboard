import { useSelector } from "react-redux";

const ErrorState = ({ error, onRetry }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-xl font-semibold text-red-400">
        Failed to load market data
      </h2>

      <p
        className={`text-center ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {error}
      </p>

      <button
        onClick={onRetry}
        className="cursor-pointer rounded-2xl bg-blue-500 px-5 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
