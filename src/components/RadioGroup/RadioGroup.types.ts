import type { FieldsetHTMLAttributes, ReactNode } from "react";

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label: ReactNode;
  options: RadioOption[];
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  description?: ReactNode;
  error?: ReactNode;
  orientation?: "vertical" | "horizontal";
}

