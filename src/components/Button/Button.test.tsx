import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its label and defaults to a safe button type", () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("gk-button--primary", "gk-button--md");
  });

  it("supports variants and sizes", () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("gk-button--danger", "gk-button--lg");
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
    expect(button.querySelector(".gk-button__spinner")).toBeInTheDocument();
  });

  it.each(["outline", "soft", "link", "gradient"] as const)(
    "supports the %s variant",
    (variant) => {
      render(<Button variant={variant}>Action</Button>);
      expect(screen.getByRole("button")).toHaveClass(`gk-button--${variant}`);
    }
  );

  it("supports fullWidth layout", () => {
    render(<Button fullWidth>Continue</Button>);
    expect(screen.getByRole("button")).toHaveClass("gk-button--full-width");
  });

  it("renders icon + label composition through normal children", () => {
    render(
      <Button>
        <span data-testid="icon">+</span>
        New project
      </Button>
    );
    const button = screen.getByRole("button", { name: /New project/i });
    expect(button).toContainElement(screen.getByTestId("icon"));
    // Label is still a single accessible name — no aria duplication.
    expect(button).toHaveAccessibleName("+ New project");
  });

  it("applies loading state alongside new variants", () => {
    render(
      <Button variant="gradient" loading>
        Saving
      </Button>
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toHaveClass("gk-button--gradient", "gk-button--loading");
    expect(button).toBeDisabled();
  });
});
