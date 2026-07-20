/**
 * Join truthy class names into a single space-separated string.
 *
 * Falsy values (`false`, `undefined`, `null`, `""`) are dropped, so it pairs
 * naturally with short-circuit expressions:
 *
 * ```ts
 * cx("btn", isActive && "btn--active", className)
 * ```
 */
export const cx = (...classes: Array<string | false | undefined | null>): string =>
  classes.filter(Boolean).join(" ");
