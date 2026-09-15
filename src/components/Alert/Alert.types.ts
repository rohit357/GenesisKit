import type { HTMLAttributes, ReactNode } from "react";

export type AlertStatus = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  title?: ReactNode;
  status?: AlertStatus;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  /**
   * Optional leading icon (e.g. a checkmark for success, a triangle for
   * warning). Composable — supply any ReactNode (svg component, emoji,
   * text symbol). Status-specific default icons are NOT auto-rendered;
   * consumers pick the icon that fits their product.
   */
  icon?: ReactNode;
  /**
   * Optional trailing actions (e.g. "Undo", "View details"). Rendered
   * between the content and the dismiss button when present. Use a Button
   * or other interactive element as the action.
   */
  actions?: ReactNode;
}
