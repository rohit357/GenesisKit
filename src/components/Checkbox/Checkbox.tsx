import { forwardRef, useCallback, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes } from "react";

import type { CheckboxProps } from "./Checkbox.types";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      description,
      error,
      indeterminate = false,
      size = "md",
      className,
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id ?? `gk-checkbox-${generatedId}`;
    const inputRef = useRef<HTMLInputElement>(null);
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ");

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={cx("gk-checkbox-field", `gk-checkbox-field--${size}`, className)}>
        <label className="gk-checkbox">
          <input
            ref={setInputRef}
            id={inputId}
            className="gk-checkbox__control"
            type="checkbox"
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
          <span className="gk-checkbox__label">
            {label}
            {required && (
              <span className="gk-checkbox__required" aria-hidden="true">
                *
              </span>
            )}
          </span>
        </label>

        {description && (
          <div className="gk-checkbox__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="gk-checkbox__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
