import { forwardRef, useId } from "react";

import type { SelectProps } from "./Select.types";
import "./Select.css";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      description,
      error,
      placeholder,
      size = "md",
      fullWidth = false,
      className,
      required,
      children,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? `oui-select-${generatedId}`;
    const descriptionId = description ? `${selectId}-description` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={cx("oui-select-field", fullWidth && "oui-select-field--full-width")}>
        <label className="oui-select-field__label" htmlFor={selectId}>
          {label}
          {required && (
            <span className="oui-select-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <select
          ref={ref}
          id={selectId}
          className={cx("oui-select", `oui-select--${size}`, Boolean(error) && "oui-select--error", className)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {description && (
          <div className="oui-select-field__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="oui-select-field__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

