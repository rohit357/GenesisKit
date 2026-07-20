import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible label associated with the select. */
  label: ReactNode;
  /** Supporting content shown below the select. */
  description?: ReactNode;
  /** Validation content shown below the select. */
  error?: ReactNode;
  /**
   * Hidden, non-selectable option shown before a choice is made. When set on
   * an uncontrolled select without a defaultValue, it becomes the initial
   * display text.
   */
  placeholder?: string;
  /** Controls the select's height and horizontal padding. */
  size?: SelectSize;
  /** Makes the field span the available width. */
  fullWidth?: boolean;
}
