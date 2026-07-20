import type { HTMLAttributes, ReactNode } from "react";

export type CardPadding = "sm" | "md" | "lg";
export type CardVariant = "elevated" | "outlined";
export type CardElement = "div" | "section" | "article";
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional heading rendered in the card header. */
  title?: ReactNode;
  /**
   * Heading level for the title so cards fit the page outline.
   * @default 2
   */
  headingLevel?: CardHeadingLevel;
  /**
   * Element the card renders as. `section`/`article` are labelled by the
   * title for assistive tech; the default `div` stays role-less.
   * @default "div"
   */
  as?: CardElement;
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
