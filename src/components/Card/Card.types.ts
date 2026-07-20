import type { HTMLAttributes, ReactNode } from "react";

export type CardPadding = "sm" | "md" | "lg";
export type CardVariant = "elevated" | "outlined";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional heading rendered in the card header. */
  title?: ReactNode;
  /** Optional supporting text rendered below the title. */
  description?: ReactNode;
  /** Optional content aligned to the right side of the card header. */
  headerAction?: ReactNode;
  /** Optional content rendered in the card footer. */
  footer?: ReactNode;
  /** Controls the card's internal spacing. */
  padding?: CardPadding;
  /** Controls the card's surface treatment. */
  variant?: CardVariant;
}

