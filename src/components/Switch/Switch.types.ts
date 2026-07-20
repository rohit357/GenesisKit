import type { InputHTMLAttributes, ReactNode } from "react";

export type SwitchSize = "sm" | "md";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: ReactNode;
  description?: ReactNode;
  size?: SwitchSize;
}

