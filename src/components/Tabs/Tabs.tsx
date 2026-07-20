import { forwardRef, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { TabsProps } from "./Tabs.types";
import "./Tabs.css";
import { cx } from "../../utils/cx";

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      activationMode = "automatic",
      keepMounted = false,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const firstValue = items.find((item) => !item.disabled)?.value ?? "";
    const [internalValue, setInternalValue] = useState(defaultValue ?? firstValue);
    const selectedValue = value ?? internalValue;
    const activeItem = items.find((item) => item.value === selectedValue) ?? items[0];
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const selectTab = (nextValue: string) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const direction =
        orientation === "horizontal"
          ? { next: "ArrowRight", previous: "ArrowLeft" }
          : { next: "ArrowDown", previous: "ArrowUp" };
      if (![direction.next, direction.previous, "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const enabled = items
        .map((item, itemIndex) => ({ item, itemIndex }))
        .filter(({ item }) => !item.disabled);
      const current = enabled.findIndex(({ item }) => item.value === items[index].value);
      const target =
        event.key === "Home"
          ? enabled[0]
          : event.key === "End"
            ? enabled[enabled.length - 1]
            : enabled[
                (current + (event.key === direction.next ? 1 : -1) + enabled.length) %
                  enabled.length
              ];
      if (target) {
        if (activationMode === "automatic") {
          selectTab(target.item.value);
        }
        tabRefs.current[target.itemIndex]?.focus();
      }
    };

    if (!activeItem) return null;

    const renderedItems = keepMounted
      ? items
      : items.filter((item) => item.value === activeItem.value);

    return (
      <div ref={ref} className={cx("oui-tabs", `oui-tabs--${orientation}`, className)} {...props}>
        <div className="oui-tabs__list" role="tablist" aria-orientation={orientation}>
          {items.map((item, index) => {
            const tabId = `oui-tab-${generatedId}-${item.value}`;
            const panelId = `oui-tabpanel-${generatedId}-${item.value}`;
            return (
              <button
                key={item.value}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                className={cx(
                  "oui-tabs__tab",
                  item.value === activeItem.value && "oui-tabs__tab--active"
                )}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={item.value === activeItem.value}
                aria-controls={panelId}
                tabIndex={item.value === activeItem.value ? 0 : -1}
                disabled={item.disabled}
                onClick={() => selectTab(item.value)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {renderedItems.map((item) => {
          const isActive = item.value === activeItem.value;
          return (
            <div
              key={item.value}
              className="oui-tabs__panel"
              role="tabpanel"
              id={`oui-tabpanel-${generatedId}-${item.value}`}
              aria-labelledby={`oui-tab-${generatedId}-${item.value}`}
              tabIndex={0}
              hidden={!isActive}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
