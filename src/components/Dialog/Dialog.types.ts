import type { HTMLAttributes, ReactNode } from "react";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
}

