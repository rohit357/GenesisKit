import type { HTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "none" | "online" | "offline" | "busy" | "away";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /**
   * Presence indicator. Rendered as a small dot on the avatar corner.
   * `none` (default) hides the indicator entirely.
   * @default "none"
   */
  status?: AvatarStatus;
}
