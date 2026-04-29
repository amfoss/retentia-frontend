type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "sidebar_btn" | "opt_btn" | "proceed_btn";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "default",
  className = "",
  onClick,
}: ButtonProps) {
  const base = "cursor-pointer";

  const variants = {
    default:
      "flex p-2 sm:p-3 md:p-4 rounded-2xl items-center text-text text-base sm:text-lg md:text-xl",

    sidebar_btn:
      "flex items-center group text-xl md:text-2xl px-4 gap-3 py-2 font-semibold rounded-full",

    opt_btn:
      "w-full text-lg sm:text-xl md:text-2xl font-bold rounded-3xl sm:py-6 md:py-8 px-4 sm:px-6 md:px-7 items-start text-left break-words bg-background/70 border-background flex  justify-center gap-5 border-2 hover:bg-background/30 hover:border-text/60 transition-colors overflow-y-auto",

    proceed_btn:
      "bg-primary hover:bg-primary-variant text-black px-4 mr-2 py-2 rounded-2xl",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
