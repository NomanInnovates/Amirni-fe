"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "light";
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const gradientStyles = {
      default:
        "bg-gradient-to-r from-[#7C4099] to-[#01A8A9] bg-clip-text text-transparent dark:from-[#8B5CB6] dark:to-[#00C9CA]",
      light:
        "bg-gradient-to-r from-[#7C4099]/80 to-[#01A8A9]/80 bg-clip-text text-transparent dark:from-[#8B5CB6]/80 dark:to-[#00C9CA]/80",
    };

    return (
      <span
        ref={ref}
        className={cn(gradientStyles[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

GradientText.displayName = "GradientText";

export { GradientText };
