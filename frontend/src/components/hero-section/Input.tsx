import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 border rounded-xl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
