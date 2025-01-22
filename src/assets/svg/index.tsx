import { SVGProps } from "react";

import { bouncyArc } from "ldrs";

import { LoaderProps } from "@/types";

bouncyArc.register();

const Icons = {
  Loader: ({
    size = 24,
    speed = 1.75,
    color = "currentColor",
  }: LoaderProps) => <l-bouncy-arc size={size} speed={speed} color={color} />,
};

export default Icons;
