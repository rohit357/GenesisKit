import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label associated with the input. */
  label: ReactNode;
  /** Supporting content shown below the input. */
  description?: ReactNode;
  /** Validation content shown below the input. */
  error?: ReactNode;
  /** Controls the input's height and horizontal padding. */
  size?: InputSize;
  /** Makes the field span the available width. */
  fullWidth?: boolean;
}
