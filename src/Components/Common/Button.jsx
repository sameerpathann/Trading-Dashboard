const Button = ({ children, className, variant = "secondary", ...props }) => {
  const baseStyles = `rounded-2xl px-4 py-3 text-sm font-medium transition duration-200`;
  const variants = {
    primary: `bg-blue-500 text-white hover:bg-blue-600`,
    secondary: `bg-white/5 text-slate-300 hover:bg-white/10`,
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
