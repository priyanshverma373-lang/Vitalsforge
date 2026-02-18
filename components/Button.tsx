import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'critical' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "relative font-bold uppercase tracking-wider rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-600 shadow-lg shadow-blue-900/50",
    critical: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-600 shadow-lg shadow-red-900/50 animate-pulse-slow",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500 border border-slate-600",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-300 focus:ring-slate-500",
  };

  const sizes = "h-16 text-lg px-6"; // Large touch targets

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>PROCESSING...</span>
        </span>
      ) : children}
    </button>
  );
};