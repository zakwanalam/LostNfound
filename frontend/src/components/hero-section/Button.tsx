import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "default",
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-xl font-medium transition-colors";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
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
