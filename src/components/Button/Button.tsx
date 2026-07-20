import type { CSSProperties } from "react";
import { forwardRef } from "react";

import type { ButtonProps } from "./Button.types";
import "./Button.css";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

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
    const loadingStyle = { "--oui-button-loading-width": "1em" } as CSSProperties;

    return (
      <button
        ref={ref}
        className={cx(
          "oui-button",
          `oui-button--${variant}`,
          `oui-button--${size}`,
          loading && "oui-button--loading",
          className
        )}
        type="button"
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        style={loading ? { ...loadingStyle, ...style } : style}
        {...props}
      >
        {loading && <span className="oui-button__spinner" aria-hidden="true" />}
        <span className={cx(loading && "oui-button__label--loading")}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

