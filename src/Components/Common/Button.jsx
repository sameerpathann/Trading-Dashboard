import { useSelector } from "react-redux";

const Button = ({ children, className, variant = "secondary", ...props }) => {
  const { theme } = useSelector((state) => state.theme);

  const baseStyles =
    "rounded-2xl px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",

    secondary:
      theme === "dark"
        ? "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
