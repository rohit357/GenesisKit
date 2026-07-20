import type { HTMLAttributes, ReactNode } from "react";

export type AlertStatus = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  title?: ReactNode;
  status?: AlertStatus;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
}
