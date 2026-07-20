import { forwardRef, useEffect, useId, useRef } from "react";
import type { ForwardedRef } from "react";
import type { DialogProps } from "./Dialog.types";
import "./Dialog.css";
import { cx } from "../../utils/cx";
import { Portal } from "../../utils/Portal";
import { useFocusTrap } from "../../utils/useFocusTrap";

const mergeRefs =
  <T,>(...refs: Array<ForwardedRef<T> | undefined>) =>
  (node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      title,
      description,
      footer,
      onClose,
      closeLabel = "Close dialog",
      closeOnOverlayClick = true,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const titleId = `gk-dialog-title-${generatedId}`;
    const descriptionId = description ? `gk-dialog-description-${generatedId}` : undefined;
    const dialogRef = useRef<HTMLDivElement>(null);

    useFocusTrap(dialogRef, open);

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <Portal>
        <div
          className="gk-dialog__backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
          }}
        >
          <div
            ref={mergeRefs(dialogRef, forwardedRef)}
            className={cx("gk-dialog", className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            {...props}
          >
            <div className="gk-dialog__header">
              <div className="gk-dialog__heading">
                <h2 className="gk-dialog__title" id={titleId}>
                  {title}
                </h2>
                {description && (
                  <div className="gk-dialog__description" id={descriptionId}>
                    {description}
                  </div>
                )}
              </div>
              <button
                className="gk-dialog__close"
                type="button"
                aria-label={closeLabel}
                onClick={onClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="gk-dialog__content">{children}</div>
            {footer && <div className="gk-dialog__footer">{footer}</div>}
          </div>
        </div>
      </Portal>
    );
  }
);

Dialog.displayName = "Dialog";
