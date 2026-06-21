import { useSelector } from "react-redux";

const SectionWrapper = ({ children, className = "" }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`rounded-3xl border p-6 transition-all duration-300 ${className} ${
        theme === "dark"
          ? "border-white/10 bg-[#0f172a] text-white"
          : "border-slate-200 bg-white text-slate-900 shadow-sm"
      }`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
