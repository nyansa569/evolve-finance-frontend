import * as React from "react";

import { Eye, EyeClosed, Search } from "lucide-react";
// import { EyeClosed, Eye } from "@phosphor-icons/react";


import { typoVariants } from "../shared/typography";
import Icons from "@/assets/svg";
import { cn } from "@/utils/helpers";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div
        className={cn(
          "relative flex items-center gap-x-2 py-2.5 text-sm w-full rounded-md border border-neutral-light bg-transparent px-4 shadow-none dark:shadow-accent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          typoVariants({ typo: "body-small-regular" }),
          containerClassName,
        )}
      >
        {type === "search" && (
          <div>
            <Search className="w-4 h-4 text-neutral-dark" />
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex-1 bg-transparent placeholder:text-neutral-dark focus-visible:outline-none focus-visible:ring-ring",
            type === "time" && "px-2",
            className,
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <button
            className="absolute -translate-y-1/2 top-1/2 right-2 text-neutral-dark"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeClosed className="w-4 h-4" />
            )}
          </button>
        )}

        {type === "time" && (
          <div className="inline-flex items-center px-3 py-2 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <Icons.TimeIcon className="w-4 h-4 text-neutral-medium" />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
