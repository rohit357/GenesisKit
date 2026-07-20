import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Visible label associated with the checkbox. */
  label: ReactNode;
  /** Supporting content shown below the checkbox label. */
  description?: ReactNode;
  /** Validation content shown below the checkbox label. */
  error?: ReactNode;
  /** Displays the native control in a mixed/partially selected state. */
  indeterminate?: boolean;
  /** Controls the checkbox and label sizing. */
  size?: CheckboxSize;
}
