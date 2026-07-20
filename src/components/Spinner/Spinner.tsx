import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";
import { cx } from "../../utils/cx";

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "md", label = "Loading", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx("gk-spinner", `gk-spinner--${size}`, className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <span className="gk-spinner__circle" aria-hidden="true" />
    </span>
  )
);

Spinner.displayName = "Spinner";
