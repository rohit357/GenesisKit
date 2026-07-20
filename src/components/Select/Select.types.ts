import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible label associated with the select. */
  label: ReactNode;
  /** Supporting content shown below the select. */
  description?: ReactNode;
  /** Validation content shown below the select. */
  error?: ReactNode;
  /** Optional disabled option shown before the available choices. */
  placeholder?: string;
  /** Controls the select's height and horizontal padding. */
  size?: SelectSize;
  /** Makes the field span the available width. */
  fullWidth?: boolean;
}

