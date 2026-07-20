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
    const inputId = id ?? `oui-checkbox-${generatedId}`;
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
      <div className={cx("oui-checkbox-field", `oui-checkbox-field--${size}`, className)}>
        <label className="oui-checkbox">
          <input
            ref={setInputRef}
            id={inputId}
            className="oui-checkbox__control"
            type="checkbox"
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
          <span className="oui-checkbox__label">
            {label}
            {required && (
              <span className="oui-checkbox__required" aria-hidden="true">
                *
              </span>
            )}
          </span>
        </label>

        {description && (
          <div className="oui-checkbox__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="oui-checkbox__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
