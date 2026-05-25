const SectionWrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#of172a] p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
