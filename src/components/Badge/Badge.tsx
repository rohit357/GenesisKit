import { forwardRef } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";
import { cx } from "../../utils/cx";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = "neutral", size = "md", ...props }, ref) => (
    <span
      ref={ref}
      className={cx("oui-badge", `oui-badge--${variant}`, `oui-badge--${size}`, className)}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
