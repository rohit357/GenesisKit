import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("associates the visible label with the input", () => {
    render(<Input label="Email address" />);

    expect(screen.getByLabelText("Email address")).toHaveClass("gk-input--md");
  });

  it("connects description and error content for assistive technology", () => {
    render(
      <Input
        label="Password"
        description="Use at least 12 characters."
        error="Password is too short."
      />
    );

    const input = screen.getByLabelText("Password");
    const describedBy = input.getAttribute("aria-describedby") ?? "";

    expect(describedBy).toContain("-description");
    expect(describedBy).toContain("-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Password is too short.");
  });

  it("supports custom ids, sizes, and required fields", () => {
    render(<Input id="account-name" label="Account name" size="lg" required />);

    const input = screen.getByRole("textbox", { name: /Account name/ });
    expect(input).toHaveAttribute("id", "account-name");
    expect(input).toHaveClass("gk-input--lg");
    expect(input).toBeRequired();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("forwards input events and refs", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Search" ref={ref} onChange={onChange} />);

    const input = screen.getByLabelText("Search");
    await user.type(input, "kit");

    expect(onChange).toHaveBeenCalled();
    expect(ref.current).toBe(input);
  });
});
