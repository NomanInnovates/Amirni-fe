"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    { className, variant = "default", size = "md", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-md font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const variantStyles = {
      default:
        "bg-gradient-to-r from-[#7C4099] to-[#01A8A9] text-white hover:shadow-lg hover:scale-105 dark:from-[#8B5CB6] dark:to-[#00C9CA]",
      outline:
        "border-2 border-gradient-to-r from-[#7C4099] to-[#01A8A9] text-[#7C4099] hover:bg-opacity-10 dark:text-[#8B5CB6]",
      ghost:
        "text-[#7C4099] hover:bg-[#7C4099]/10 dark:text-[#8B5CB6] dark:hover:bg-[#8B5CB6]/10",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    };

    return (
      <Comp
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
