import { forwardRef, useId } from "react";

import type { CardProps } from "./Card.types";
import { cx } from "../../utils/cx";
import "./Card.css";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      title,
      description,
      headerAction,
      footer,
      padding = "md",
      variant = "elevated",
      ...props
    },
    ref
  ) => {
    const generatedTitleId = useId();
    const titleId = title ? `oui-card-title-${generatedTitleId}` : undefined;
    const hasHeader = Boolean(title || description || headerAction);

    return (
      <div
        ref={ref}
        className={cx("oui-card", `oui-card--${padding}`, `oui-card--${variant}`, className)}
        aria-labelledby={titleId}
        {...props}
      >
        {hasHeader && (
          <header className="oui-card__header">
            <div className="oui-card__heading">
              {title && (
                <h2 className="oui-card__title" id={titleId}>
                  {title}
                </h2>
              )}
              {description && <div className="oui-card__description">{description}</div>}
            </div>
            {headerAction && <div className="oui-card__action">{headerAction}</div>}
          </header>
        )}

        <div className="oui-card__content">{children}</div>

        {footer && <footer className="oui-card__footer">{footer}</footer>}
      </div>
    );
  }
);

Card.displayName = "Card";
