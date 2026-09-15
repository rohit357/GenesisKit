import { forwardRef } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";
import { cx } from "../../utils/cx";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = "neutral",
      size = "md",
      outline = false,
      dot = false,
      removable = false,
      onRemove,
      removeLabel = "Remove",
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cx(
        "gk-badge",
        `gk-badge--${variant}`,
        `gk-badge--${size}`,
        outline && "gk-badge--outline",
        dot && "gk-badge--dot",
        className
      )}
      {...props}
    >
      {dot && <span className="gk-badge__dot" aria-hidden="true" />}
      <span className="gk-badge__label">{children}</span>
      {removable && (
        <button
          type="button"
          className="gk-badge__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  )
);

Badge.displayName = "Badge";
