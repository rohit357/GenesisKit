import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "danger" | "outline" | "soft" | "link" | "gradient";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the button. */
  variant?: ButtonVariant;
  /** Controls the button's height and horizontal padding. */
  size?: ButtonSize;
  /** Shows a progress state and prevents interaction. */
  loading?: boolean;
  /**
   * Stretches the button to fill its parent's width. Useful for mobile CTAs
   * and form submit actions.
   * @default false
   */
  fullWidth?: boolean;
}
