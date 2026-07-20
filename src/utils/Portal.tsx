import type { ReactNode } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
  /** Target container. Defaults to document.body. */
  container?: Element | null;
}

/**
 * Render children into a DOM node outside the parent hierarchy.
 *
 * Renders nothing when there is no DOM (SSR), so it is safe in React Server
 * Component trees. Consumers gate rendering on client interaction (e.g. an
 * `open` flag), so the portal only mounts after hydration.
 */
export const Portal = ({ children, container }: PortalProps) => {
  const [target] = useState<Element | null>(() =>
    typeof document === "undefined" ? null : (container ?? document.body)
  );

  if (!target) return null;
  return createPortal(children, target);
};
