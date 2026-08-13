"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl",
    secondary: "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
    tertiary: "bg-transparent text-foreground hover:text-primary underline-offset-4 hover:underline",
  };
  
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = (
    <motion.span
      whileHover={{ scale: variant !== "tertiary" ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );
  
  if (href) {
    return (
      <a href={href} onClick={onClick} className={combinedClassName}>
        {content}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
      {content}
    </button>
  );
}
