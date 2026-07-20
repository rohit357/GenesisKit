import { forwardRef, useId } from "react";
import type { SwitchProps } from "./Switch.types";
import "./Switch.css";
import { cx } from "../../utils/cx";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id, label, description, size = "md", className, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? `gk-switch-${generatedId}`;
    const descriptionId = description ? `${switchId}-description` : undefined;
    const describedBy = [props["aria-describedby"], descriptionId].filter(Boolean).join(" ");
    return (
      <div className={cx("gk-switch-field", `gk-switch-field--${size}`, className)}>
        <label className="gk-switch">
          <input
            ref={ref}
            id={switchId}
            className="gk-switch__control"
            type="checkbox"
            role="switch"
            aria-describedby={describedBy || undefined}
            {...props}
          />
          <span className="gk-switch__track" aria-hidden="true">
            <span className="gk-switch__thumb" />
          </span>
          <span className="gk-switch__label">{label}</span>
        </label>
        {description && (
          <div className="gk-switch__description" id={descriptionId}>
            {description}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
