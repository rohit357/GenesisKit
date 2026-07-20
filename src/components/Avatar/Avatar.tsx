import { forwardRef, useState } from "react";
import type { AvatarProps } from "./Avatar.types";
import "./Avatar.css";
import { cx } from "../../utils/cx";

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, src, alt, size = "md", shape = "circle", className, ...props }, ref) => {
    const [imageFailed, setImageFailed] = useState(false);
    const label = alt ?? name;
    return (
      <span
        ref={ref}
        className={cx("oui-avatar", `oui-avatar--${size}`, `oui-avatar--${shape}`, className)}
        role="img"
        aria-label={label}
        {...props}
      >
        {src && !imageFailed ? (
          <img src={src} alt="" aria-hidden="true" onError={() => setImageFailed(true)} />
        ) : (
          <span aria-hidden="true">{getInitials(name)}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
