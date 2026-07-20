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

  it("auto-generates a shared name when none is given", () => {
    render(<RadioGroup label="Size" options={options} />);
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios[0].name).toBeTruthy();
    expect(radios[0].name).toBe(radios[1].name);
  });

  it("marks radios required when required is set", () => {
    render(<RadioGroup label="Size" options={options} required />);
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toBeRequired();
    }
  });
});
