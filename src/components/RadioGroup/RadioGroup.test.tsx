import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly", description: "Save 20% annually." }
];

describe("RadioGroup", () => {
  it("renders a labeled group and selected option", () => {
    render(
      <RadioGroup label="Billing cycle" name="billing" options={options} defaultValue="monthly" />
    );
    expect(screen.getByRole("group", { name: "Billing cycle" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Monthly" })).toBeChecked();
  });

  it("changes selection and notifies consumers", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        label="Billing cycle"
        name="billing"
        options={options}
        onValueChange={onValueChange}
      />
    );
    await user.click(screen.getByRole("radio", { name: /Yearly/ }));
    expect(screen.getByRole("radio", { name: /Yearly/ })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("yearly");
  });

  it("connects descriptions and errors", () => {
    render(
      <RadioGroup
        label="Plan"
        name="plan"
        options={options}
        description="Choose one."
        error="A plan is required."
      />
    );
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group).toHaveAttribute("aria-describedby");
    expect(screen.getByRole("alert")).toHaveTextContent("A plan is required.");
  });
});
