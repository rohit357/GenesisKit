import type { ReactNode, TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** Visible label associated with the textarea. */
  label: ReactNode;
  /** Supporting content shown below the textarea. */
  description?: ReactNode;
  /** Validation content shown below the textarea. */
  error?: ReactNode;
  /** Controls the textarea's height and horizontal padding. */
  size?: TextareaSize;
  /** Controls which directions the textarea can be resized. */
  resize?: TextareaResize;
  /** Makes the field span the available width. */
  fullWidth?: boolean;
  /** Number of visible text lines. */
  rows?: number;
}
