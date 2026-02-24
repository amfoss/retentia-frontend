import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary';
}

const Input = ({ 
  variant = 'primary', 
  className = '', 
  ...props 
}: InputProps) => {  
  const variants = {
    primary:"w-full px-4 py-1 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D1D5DB] focus:border-transparent",
  };

  return (
    <input
      className={`${variants[variant]} ${className}`}
      {...props}
    >
    </input>
  );
};

export default Input;