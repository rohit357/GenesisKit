import type { HTMLAttributes, ReactNode } from "react";

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  /**
   * Controls the dialog's max-width.
   * - `sm`: 24rem — compact forms, confirmations.
   * - `md`: 32rem — default. Most use cases.
   * - `lg`: 42rem — detailed content.
   * @default "md"
   */
  size?: DialogSize;
}
