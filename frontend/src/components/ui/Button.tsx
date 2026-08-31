import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {

  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-secondary",
    outline: "border border-border-color text-text-main hover:bg-border-color/50",
    ghost: "text-text-muted hover:text-text-main hover:bg-border-color/30"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}