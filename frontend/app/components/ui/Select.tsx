import React from "react";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  placeholder = "Select",
  className = "",
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-4 py-1 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D1D5DB] bg-surface cursor-pointer appearance-none ${className}`}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;