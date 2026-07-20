import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

describe("Select", () => {
  it("associates its visible label and renders options", () => {
    render(
      <Select label="Country" placeholder="Choose a country">
        <option value="in">India</option>
        <option value="us">United States</option>
      </Select>
    );

    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toHaveClass("oui-select--md");
    const placeholderOption = screen.getByText("Choose a country");
    expect(placeholderOption).toBeDisabled();
    expect(placeholderOption).toHaveAttribute("hidden");
    expect(screen.getByRole("option", { name: "India" })).toBeInTheDocument();
  });

  it("selects the placeholder by default and keeps it unselectable", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Country" placeholder="Choose a country">
        <option value="in">India</option>
        <option value="us">United States</option>
      </Select>
    );

    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toHaveValue("");

    await user.selectOptions(select, "in");
    expect(select).toHaveValue("in");
  });

  it("respects an explicit defaultValue over the placeholder", () => {
    render(
      <Select label="Country" placeholder="Choose a country" defaultValue="us">
        <option value="in">India</option>
        <option value="us">United States</option>
      </Select>
    );

    expect(screen.getByRole("combobox", { name: "Country" })).toHaveValue("us");
  });

  it("supports descriptions, errors, required state, and custom ids", () => {
    render(
      <Select
        id="plan"
        label="Plan"
        description="Choose the plan that fits your team."
        error="Please select a plan."
        required
      >
        <option value="starter">Starter</option>
      </Select>
    );

    const select = screen.getByRole("combobox", { name: "Plan" });
    const describedBy = select.getAttribute("aria-describedby") ?? "";

    expect(select).toHaveAttribute("id", "plan");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toBeRequired();
    expect(describedBy).toContain("-description");
    expect(describedBy).toContain("-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Please select a plan.");
  });

  it("supports size, ref forwarding, and selection changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select label="Theme" size="lg" ref={ref} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
    );

    const select = screen.getByRole("combobox", { name: "Theme" });
    await user.selectOptions(select, "dark");

    expect(select).toHaveClass("oui-select--lg");
    expect(select).toHaveValue("dark");
    expect(onChange).toHaveBeenCalledOnce();
    expect(ref.current).toBe(select);
  });

  it("passes through native select attributes", () => {
    render(
      <Select label="Language" disabled data-testid="language-select">
        <option value="en">English</option>
      </Select>
    );

    expect(screen.getByTestId("language-select")).toBeDisabled();
  });
});
