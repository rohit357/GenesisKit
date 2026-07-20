import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders content and defaults", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveClass("gk-badge--neutral", "gk-badge--md");
  });

  it("supports visual variants, sizes, and attributes", () => {
    render(
      <Badge variant="success" size="sm" title="Complete">
        Done
      </Badge>
    );
    expect(screen.getByTitle("Complete")).toHaveClass("gk-badge--success", "gk-badge--sm");
  });
});
