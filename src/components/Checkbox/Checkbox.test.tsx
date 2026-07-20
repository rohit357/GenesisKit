import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("associates its visible label with the native checkbox", () => {
    render(<Checkbox label="Accept terms" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("supports descriptions, errors, required state, and custom ids", () => {
    render(
      <Checkbox
        id="newsletter"
        label="Subscribe to newsletter"
        description="Receive product updates once a month."
        error="Please choose whether to subscribe."
        required
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Subscribe to newsletter" });
    const describedBy = checkbox.getAttribute("aria-describedby") ?? "";

    expect(checkbox).toHaveAttribute("id", "newsletter");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toBeRequired();
    expect(describedBy).toContain("-description");
    expect(describedBy).toContain("-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Please choose whether to subscribe.");
  });

  it("supports an indeterminate state through the forwarded ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Select all" indeterminate ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.indeterminate).toBe(true);
  });

  it("fires change events and respects disabled state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Enable alerts" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "Enable alerts" });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });
});

