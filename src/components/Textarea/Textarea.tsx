import { forwardRef, useId } from "react";

import type { TextareaProps } from "./Textarea.types";
import "./Textarea.css";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

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
    const textareaId = id ?? `oui-textarea-${generatedId}`;
    const descriptionId = description ? `${textareaId}-description` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy = [ariaDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={cx("oui-textarea-field", fullWidth && "oui-textarea-field--full-width")}>
        <label className="oui-textarea-field__label" htmlFor={textareaId}>
          {label}
          {required && (
            <span className="oui-textarea-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          className={cx(
            "oui-textarea",
            `oui-textarea--${size}`,
            `oui-textarea--resize-${resize}`,
            Boolean(error) && "oui-textarea--error",
            className
          )}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        />

        {description && (
          <div className="oui-textarea-field__description" id={descriptionId}>
            {description}
          </div>
        )}

        {error && (
          <div className="oui-textarea-field__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

