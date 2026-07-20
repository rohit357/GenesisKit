import { forwardRef, useEffect, useId, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { DialogProps } from "./Dialog.types";
import "./Dialog.css";
import { cx } from "../../utils/cx";

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
    const titleId = `oui-dialog-title-${generatedId}`;
    const descriptionId = description ? `oui-dialog-description-${generatedId}` : undefined;
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKeyDown);
      closeButtonRef.current?.focus();
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const handleOverlayKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") onClose();
    };
    return (
      <div
        className="oui-dialog__backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
        }}
        onKeyDown={handleOverlayKeyDown}
      >
        <div
          ref={forwardedRef}
          className={cx("oui-dialog", className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          {...props}
        >
          <div className="oui-dialog__header">
            <div className="oui-dialog__heading">
              <h2 className="oui-dialog__title" id={titleId}>
                {title}
              </h2>
              {description && (
                <div className="oui-dialog__description" id={descriptionId}>
                  {description}
                </div>
              )}
            </div>
            <button
              ref={closeButtonRef}
              className="oui-dialog__close"
              type="button"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="oui-dialog__content">{children}</div>
          {footer && <div className="oui-dialog__footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

Dialog.displayName = "Dialog";
