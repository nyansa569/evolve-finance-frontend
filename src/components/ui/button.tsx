import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


import Icons from "@/assets/svg";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center min-w-28 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/90",
        primary: "bg-primary-300 text-white hover:bg-primary-300/90",
        secondary: "bg-secondary-300 text-white hover:bg-secondary-300/80",
        accent: "bg-accent-300 text-white hover:bg-accent-300/80",
        outline: "border border-primary-100 text-primary-300 bg-background",
        link: "",
        ghost: "",
        destructive: "",
        table: "",
        transparent: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled = isLoading,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? <Icons.Loader /> : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
