import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "md", label = "Loading", className, ...props }, ref) => (
    <span ref={ref} className={cx("oui-spinner", `oui-spinner--${size}`, className)} role="status" aria-label={label} {...props}>
      <span className="oui-spinner__circle" aria-hidden="true" />
    </span>
  )
);

Spinner.displayName = "Spinner";

