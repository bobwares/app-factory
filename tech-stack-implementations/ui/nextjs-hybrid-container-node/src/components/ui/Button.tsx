// App: app-factory
// File: src/components/ui/Button.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Reusable button component with variants

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children?: ReactNode;
}

const buttonVariants = {
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    default: 'bg-sky-600 text-white hover:bg-sky-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  },
  sizes: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
