import { Shell } from "@/components/ui/shell";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = {
  containerClassName?: string;
  redirectTo?: string;
};

export default function NotFound({
  redirectTo = "/",
  containerClassName,
}: Props) {
  return (
    <Shell
      className={cn(
        "h-full min-h-[80vh] gap-4 w-full flex lg:flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 ">
        404
      </h1>
      <p className=" text-lg text-muted-foreground">Oops... Page not found</p>
      <p className="text-sm text-muted-foreground">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <Link
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 "
        to={redirectTo}
      >
        Go to Home
      </Link>
    </Shell>
  );
}
