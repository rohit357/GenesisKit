import { forwardRef, useId, useState } from "react";
import type { RadioGroupProps } from "./RadioGroup.types";
import "./RadioGroup.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ label, options, name, value, defaultValue, onValueChange, description, error, orientation = "vertical", className, ...props }, ref) => {
    const generatedId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const selectedValue = value ?? internalValue;
    const descriptionId = description ? `oui-radio-description-${generatedId}` : undefined;
    const errorId = error ? `oui-radio-error-${generatedId}` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

    return (
      <fieldset ref={ref} className={cx("oui-radio-group", `oui-radio-group--${orientation}`, className)} aria-describedby={describedBy || undefined} {...props}>
        <legend className="oui-radio-group__legend">{label}</legend>
        {description && <div className="oui-radio-group__description" id={descriptionId}>{description}</div>}
        <div className="oui-radio-group__options">
          {options.map((option) => (
            <label className={cx("oui-radio-option", option.disabled && "oui-radio-option--disabled")} key={option.value}>
              <input
                className="oui-radio-option__control"
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={option.disabled}
                aria-invalid={error ? true : undefined}
                onChange={() => { setInternalValue(option.value); onValueChange?.(option.value); }}
              />
              <span className="oui-radio-option__copy">
                <span className="oui-radio-option__label">{option.label}</span>
                {option.description && <span className="oui-radio-option__description">{option.description}</span>}
              </span>
            </label>
          ))}
        </div>
        {error && <div className="oui-radio-group__error" id={errorId} role="alert">{error}</div>}
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

