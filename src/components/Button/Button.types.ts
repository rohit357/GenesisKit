import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment for the button. */
  variant?: ButtonVariant;
  /** Controls the button's height and horizontal padding. */
  size?: ButtonSize;
  /** Shows a progress state and prevents interaction. */
  loading?: boolean;
}
