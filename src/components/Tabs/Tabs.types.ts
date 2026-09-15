import type { HTMLAttributes, ReactNode } from "react";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = "underline" | "pills";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  /**
   * How keyboard navigation selects tabs. `automatic` selects on arrow-key
   * focus; `manual` only moves focus — Enter/Space selects.
   * @default "automatic"
   */
  activationMode?: "automatic" | "manual";
  /**
   * Keeps inactive panels mounted (hidden) so their state — e.g. form
   * inputs — survives tab switches.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Visual treatment for the tab list.
   * - `underline` (default): classic tab row with an active underline.
   * - `pills`: each tab rendered as a soft pill; active uses the primary
   *   soft background + primary foreground.
   */
  variant?: TabsVariant;
}
