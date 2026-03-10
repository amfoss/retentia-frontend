type CardProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Card({
  children,
  variant = "primary",
  className = "",
}: CardProps) {
  const base = "rounded-3xl p-6 ";
  const variants = {
    primary: "bg-foreground flex overflow-y-auto flex-col text-text",
    secondary: "bg-background/70 text-text",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
