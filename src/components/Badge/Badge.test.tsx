import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders content and defaults", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New").closest(".gk-badge");
    expect(badge).toHaveClass("gk-badge--neutral", "gk-badge--md");
  });

  it("supports visual variants, sizes, and attributes", () => {
    render(
      <Badge variant="success" size="sm" title="Complete">
        Done
      </Badge>
    );
    const badge = screen.getByTitle("Complete").closest(".gk-badge");
    expect(badge).toHaveClass("gk-badge--success", "gk-badge--sm");
  });

  it("supports an outline treatment", () => {
    render(
      <Badge variant="info" outline data-testid="badge">
        Draft
      </Badge>
    );
    expect(screen.getByTestId("badge")).toHaveClass("gk-badge--outline");
  });

  it("renders a status dot when dot prop is set", () => {
    render(
      <Badge variant="success" dot data-testid="badge">
        Live
      </Badge>
    );
    expect(screen.getByTestId("badge")).toHaveClass("gk-badge--dot");
    // The dot is aria-hidden so it does not duplicate the label.
    const dot = screen.getByTestId("badge").querySelector(".gk-badge__dot");
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("supports removable with accessible remove control", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove} removeLabel="Remove filter">
        TypeScript
      </Badge>
    );
    await user.click(screen.getByRole("button", { name: "Remove filter" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });
});
