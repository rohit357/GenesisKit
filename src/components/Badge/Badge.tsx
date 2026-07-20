import { forwardRef } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = "neutral", size = "md", ...props }, ref) => (
    <span ref={ref} className={cx("oui-badge", `oui-badge--${variant}`, `oui-badge--${size}`, className)} {...props}>
      {children}
    </span>
  )
);

Badge.displayName = "Badge";

