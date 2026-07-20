import { forwardRef, useId, useState } from "react";
import type { RadioGroupProps } from "./RadioGroup.types";
import "./RadioGroup.css";
import { cx } from "../../utils/cx";

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      label,
      options,
      name,
      value,
      defaultValue,
      onValueChange,
      description,
      error,
      required,
      orientation = "vertical",
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const groupName = name ?? `gk-radio-${generatedId}`;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const selectedValue = value ?? internalValue;
    const descriptionId = description ? `gk-radio-description-${generatedId}` : undefined;
    const errorId = error ? `gk-radio-error-${generatedId}` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    return (
      <fieldset
        ref={ref}
        className={cx("gk-radio-group", `gk-radio-group--${orientation}`, className)}
        aria-describedby={describedBy || undefined}
        {...props}
      >
        <legend className="gk-radio-group__legend">
          {label}
          {required && (
            <span className="gk-radio-group__required" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        {description && (
          <div className="gk-radio-group__description" id={descriptionId}>
            {description}
          </div>
        )}
        <div className="gk-radio-group__options">
          {options.map((option) => (
            <label
              className={cx("gk-radio-option", option.disabled && "gk-radio-option--disabled")}
              key={option.value}
            >
              <input
                className="gk-radio-option__control"
                type="radio"
                name={groupName}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled}
                required={required}
                onChange={() => {
                  setInternalValue(option.value);
                  onValueChange?.(option.value);
                }}
              />
              <span className="gk-radio-option__copy">
                <span className="gk-radio-option__label">{option.label}</span>
                {option.description && (
                  <span className="gk-radio-option__description">{option.description}</span>
                )}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <div className="gk-radio-group__error" id={errorId} role="alert">
            {error}
          </div>
        )}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
