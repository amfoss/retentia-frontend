type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "sidebar_btn" ;
  className?: string;
};

export default function Button({children,variant = "default",className = "", }: ButtonProps) {
  const base = "flex items-center cursor-pointer ";
  const variants = {
    default: "text-text text-2xl",
    sidebar_btn: "group text-2xl px-4 gap-4 py-2 font-semibold rounded-full hover:bg-primary-light",
    
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}