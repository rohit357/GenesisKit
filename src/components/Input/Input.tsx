import { forwardRef, useId } from "react";
import type { InputProps } from "./Input.types";
import { cx } from "../../utils/cx";
import "./Input.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      description,
      error,
      size = "md",
      fullWidth = false,
      className,
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `oui-input-${generatedId}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ");

    return (
      <div className={cx("oui-field", fullWidth && "oui-field--full-width", className)}>
        <label className="oui-field__label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="oui-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={cx("oui-input", `oui-input--${size}`, Boolean(error) && "oui-input--error")}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        />

        {description && (
          <div className="oui-field__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="oui-field__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
