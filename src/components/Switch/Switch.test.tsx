import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders an accessible switch", () => {
    render(<Switch label="Email notifications" />);
    expect(screen.getByRole("switch", { name: "Email notifications" })).not.toBeChecked();
  });

  it("toggles and connects descriptions", async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" description="Use a darker color scheme." />);
    const toggle = screen.getByRole("switch", { name: "Dark mode" });
    await user.click(toggle);
    expect(toggle).toBeChecked();
    expect(toggle).toHaveAttribute("aria-describedby");
  });

  it("supports disabled state and sizes", () => {
    render(<Switch label="Automatic updates" size="sm" disabled />);
    expect(screen.getByRole("switch", { name: "Automatic updates" })).toBeDisabled();
    expect(screen.getByText("Automatic updates").closest(".gk-switch-field")).toHaveClass(
      "gk-switch-field--sm"
    );
  });
});
