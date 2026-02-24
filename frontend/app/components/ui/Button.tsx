import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {  
  const variants = {
    primary: "bg-primary hover:bg-primary-variant text-surface px-3 py-2 rounded-lg mt-4",
  };

  return (
    <button
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;