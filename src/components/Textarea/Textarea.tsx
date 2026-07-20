import { forwardRef, useId } from "react";

import type { TextareaProps } from "./Textarea.types";
import { cx } from "../../utils/cx";
import "./Textarea.css";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      description,
      error,
      size = "md",
      resize = "vertical",
      fullWidth = false,
      className,
      required,
      rows = 4,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? `gk-textarea-${generatedId}`;
    const descriptionId = description ? `${textareaId}-description` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ");

    return (
      <div className={cx("gk-textarea-field", fullWidth && "gk-textarea-field--full-width")}>
        <label className="gk-textarea-field__label" htmlFor={textareaId}>
          {label}
          {required && (
            <span className="gk-textarea-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          className={cx(
            "gk-textarea",
            `gk-textarea--${size}`,
            `gk-textarea--resize-${resize}`,
            Boolean(error) && "gk-textarea--error",
            className
          )}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        />

        {description && (
          <div className="gk-textarea-field__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="gk-textarea-field__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
