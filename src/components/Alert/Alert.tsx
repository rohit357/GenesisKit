import { forwardRef } from "react";
import type { AlertProps } from "./Alert.types";
import "./Alert.css";
import { cx } from "../../utils/cx";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      title,
      status = "info",
      dismissible = false,
      onDismiss,
      dismissLabel = "Dismiss alert",
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cx("gk-alert", `gk-alert--${status}`, className)}
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      {...props}
    >
      <div className="gk-alert__content">
        {title && <div className="gk-alert__title">{title}</div>}
        <div className="gk-alert__message">{children}</div>
      </div>
      {dismissible && (
        <button
          className="gk-alert__dismiss"
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  )
);

Alert.displayName = "Alert";
