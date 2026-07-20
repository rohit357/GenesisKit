import { forwardRef } from "react";
import type { AlertProps } from "./Alert.types";
import "./Alert.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, title, status = "info", dismissible = false, onDismiss, dismissLabel = "Dismiss alert", className, ...props }, ref) => (
    <div ref={ref} className={cx("oui-alert", `oui-alert--${status}`, className)} role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} {...props}>
      <div className="oui-alert__content">
        {title && <div className="oui-alert__title">{title}</div>}
        <div className="oui-alert__message">{children}</div>
      </div>
      {dismissible && <button className="oui-alert__dismiss" type="button" aria-label={dismissLabel} onClick={onDismiss}><span aria-hidden="true">×</span></button>}
    </div>
  )
);

Alert.displayName = "Alert";

