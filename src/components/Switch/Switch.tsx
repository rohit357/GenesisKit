import { forwardRef, useId } from "react";
import type { SwitchProps } from "./Switch.types";
import "./Switch.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ id, label, description, size = "md", className, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? `oui-switch-${generatedId}`;
    const descriptionId = description ? `${switchId}-description` : undefined;
    const describedBy = [props["aria-describedby"], descriptionId].filter(Boolean).join(" ");
    return (
      <div className={cx("oui-switch-field", `oui-switch-field--${size}`, className)}>
        <label className="oui-switch">
          <input ref={ref} id={switchId} className="oui-switch__control" type="checkbox" role="switch" aria-describedby={describedBy || undefined} {...props} />
          <span className="oui-switch__track" aria-hidden="true"><span className="oui-switch__thumb" /></span>
          <span className="oui-switch__label">{label}</span>
        </label>
        {description && <div className="oui-switch__description" id={descriptionId}>{description}</div>}
      </div>
    );
  }
);

Switch.displayName = "Switch";

