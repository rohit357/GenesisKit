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
      headingLevel = 2,
      as: Element = "div",
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
    const Heading = `h${headingLevel}` as const;
    // aria-labelledby only helps when the element has a role; a plain div
    // exposes no accessible name, so only wire it for section/article.
    const labelledBy = Element === "div" ? undefined : titleId;

    return (
      <Element
        ref={ref}
        className={cx("oui-card", `oui-card--${padding}`, `oui-card--${variant}`, className)}
        aria-labelledby={labelledBy}
        {...props}
      >
        {hasHeader && (
          <header className="oui-card__header">
            <div className="oui-card__heading">
              {title && (
                <Heading className="oui-card__title" id={titleId}>
                  {title}
                </Heading>
              )}
              {description && <div className="oui-card__description">{description}</div>}
            </div>
            {headerAction && <div className="oui-card__action">{headerAction}</div>}
          </header>
        )}

        <div className="oui-card__content">{children}</div>

        {footer && <footer className="oui-card__footer">{footer}</footer>}
      </Element>
    );
  }
);

Card.displayName = "Card";
