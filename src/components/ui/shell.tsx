import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/helpers";

const shellVariants = cva(
  "lg:grid flex flex-col lg:items-center overflow-x-hidden px-4 gap-8 pb-8 pt-6 md:py-8",
  {
    variants: {
      variant: {
        default: "container",
        sidebar: "",
        centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  );
}

export { Shell, shellVariants };
