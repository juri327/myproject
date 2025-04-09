'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-[#B89B76] text-white hover:bg-[#A58B66]',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-[#B89B76] text-[#B89B76] hover:bg-[#F9F1E7]',
        secondary: 'bg-[#F9F1E7] text-[#B89B76] hover:bg-[#F2E8DB]',
        ghost: 'hover:bg-[#F9F1E7] text-[#B89B76] hover:text-[#A58B66]',
        link: 'underline-offset-4 hover:underline text-[#B89B76]',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
