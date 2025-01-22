import { primaryColor } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { Bars } from "react-loader-spinner";

type Props = {
  className?: string;
};

export default function LoadingComponent({ className }: Props) {
  return (
    <div
      className={cn("h-dvh flex items-center justify-center w-full", className)}
    >
      <Bars
        height="40"
        width="40"
        color={primaryColor}
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
}
