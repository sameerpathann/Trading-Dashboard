const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-3xl bg-[#0f172a]"
          />
        ))}
      </div>

      <div className="h-[420px] animate-pulse rounded-3xl bg-[#0f172a]" />

      <div className="h-[400px] animate-pulse rounded-3xl bg-[#0f172a]" />
    </div>
  );
};

export default LoadingSkeleton;
