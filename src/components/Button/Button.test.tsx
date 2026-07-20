import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its label and defaults to a safe button type", () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("oui-button--primary", "oui-button--md");
  });

  it("supports variants and sizes", () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("oui-button--danger", "oui-button--lg");
  });

  it("calls the click handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("prevents interaction and announces loading state", () => {
    render(<Button loading>Saving</Button>);

    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector(".oui-button__spinner")).toBeInTheDocument();
  });
});

