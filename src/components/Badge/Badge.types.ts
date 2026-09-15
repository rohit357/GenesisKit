import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /**
   * Outline treatment: transparent background, semantic border + text color.
   * Useful inline with text content (status pills, filter chips) where a
   * filled surface is too heavy.
   * @default false
   */
  outline?: boolean;
  /**
   * Shows a leading status dot using the variant color.
   * Useful for presence/status indicators ("● Live", "● Beta").
   * @default false
   */
  dot?: boolean;
  /**
   * Renders a remove button. Wire `onRemove` to handle dismissal
   * (filter chip pattern). Requires an accessible label via `removeLabel`.
   * @default false
   */
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}
