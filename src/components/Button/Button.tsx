import type { CSSProperties } from "react";
import { forwardRef } from "react";

import type { ButtonProps } from "./Button.types";
import { cx } from "../../utils/cx";
import "./Button.css";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const loadingStyle = { "--gk-button-loading-width": "1em" } as CSSProperties;

    return (
      <button
        ref={ref}
        className={cx(
          "gk-button",
          `gk-button--${variant}`,
          `gk-button--${size}`,
          loading && "gk-button--loading",
          className
        )}
        type="button"
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        style={loading ? { ...loadingStyle, ...style } : style}
        {...props}
      >
        {loading && <span className="gk-button__spinner" aria-hidden="true" />}
        <span className={cx(loading && "gk-button__label--loading")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
