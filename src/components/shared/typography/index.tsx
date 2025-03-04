import { motion as m, type MotionProps } from "framer-motion";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/helpers";


export const typoVariants = cva(
  "overflow-wrap overflow-hidden leading-normal",
  {
    variants: {
      typo: {
        //display typo classnames
        "display-large-bold": "text-[95px] leading-[133px] font-bold",
        "display-large-medium": "text-[95px] leading-[133px] font-medium",
        "display-large-semibold": "text-[95px] leading-[133px] font-semibold",
        "display-small-bold": "text-[76px] leading-[91px] font-bold",
        "display-small-medium": "text-[76px] leading-[91px] font-medium",
        "display-small-semibold": "text-[76px] leading-[91px] font-semibold",

        //header typo classnames
        "header-1-regular": "text-6xl leading-[85px] font-normal",
        "header-1-medium": "text-6xl leading-[85px] font-medium",
        "header-1-semibold": "text-6xl leading-[85px] font-semibold",
        "header-2-regular": "text-5xl leading-[64px] font-normal",
        "header-2-medium": "text-5xl leading-[64px] font-medium",
        "header-2-semibold": "text-5xl leading-[64px] font-semibold",
        "header-3-regular": "text-[2.5rem] leading-[47px] font-normal",
        "header-3-medium": "text-[2.5rem] leading-[47px] font-medium",
        "header-3-semibold": "text-[2.5rem] leading-[47px] font-semibold",
        "header-4-regular": "text-3xl leading-[47px] font-normal",
        "header-4-medium": "text-3xl leading-[47px] font-medium",
        "header-4-semibold": "text-3xl leading-[47px] font-semibold",
        "header-5-regular": "text-2xl leading-[30px] font-normal",
        "header-5-medium": "text-2xl leading-[30px] font-medium",
        "header-5-semibold": "text-2xl leading-[30px] font-semibold",
        "header-6-regular": "text-xl leading-[24px] font-normal",
        "header-6-medium": "text-xl leading-[24px] font-medium",
        "header-6-semibold": "text-xl leading-[24px] font-semibold",

        //body typo classnames
        "body-large-regular": "text-lg leading-[22px] font-normal",
        "body-large-medium": "text-lg leading-[22px] font-medium",
        "body-large-semibold": "text-lg leading-[22px] font-semibold",
        "body-large-underline": "",
        "body-medium-regular": "text-base leading-[19px] font-normal",
        "body-medium-medium": "text-base leading-[19px] font-medium",
        "body-medium-semibold": "text-base leading-[19px] font-semibold",
        "body-medium-underline": "",
        "body-small-regular": "text-sm leading-[16px] font-normal",
        "body-small-medium": "text-sm leading-[16px] font-medium",
        "body-small-semibold": "text-sm leading-[16px] font-semibold",
        "body-small-underline": "",
        "caption-regular": "text-xs leading-[12px] font-normal",
        "caption-medium": "text-xs leading-[12px] font-medium",
        "caption-semibold": "text-xs leading-[12px] font-semibold",
        "caption-underline": "",
        "tag-regular": "text-[0.5rem] leading-[10px] font-normal",
        "tag-medium": "text-[0.5rem] leading-[10px] font-medium",
        "tag-semibold": "text-[0.5rem] leading-[10px] font-semibold",
        "tag-underline": "",
      },
      family: {
        "hk-grotesk": "font-hk-grotesk",
      },
      appearance: {
        move: "hover:ml-1.5 transition-all duration-300",
        underline: "hover:underline transition-all duration-300",
      },
      color: {
        accent: "text-accent-100",
        primary: "text-primary-500",
        secondary: "text-secondary-500",
      },
    },
    defaultVariants: {
      typo: "body-medium-regular",
      family: "hk-grotesk",
    },
  },
);

interface TypographyProps
  extends VariantProps<typeof typoVariants>,
    MotionProps {
      color?: "accent" | "primary" | "secondary";
      mDelay?: number;
      children: React.ReactNode;
      className?: string;
      maxLines?: number;
      disableSelect?: boolean;
}

export default function Typography({
  typo,
  appearance,
  children,
  className,
  mDelay = 0,
  maxLines = 0,
  disableSelect = false,
  ...props
}: Readonly<TypographyProps>) {
  const lineClampClass =
    maxLines > 0 ? `line-clamp-${maxLines}` : "whitespace-normal";

  return (
    <m.span
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: "easeIn", delay: mDelay }}
      viewport={{ once: true }}
      className={cn(
        typoVariants({ typo, appearance }),
        lineClampClass,
        disableSelect ? "select-none" : "select-auto",
        className,
      )}
      {...props}
    >
      {children}
    </m.span>
  );
}
