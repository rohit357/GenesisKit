import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("renders a titled content card with accessible title wiring", () => {
    render(
      <Card title="Account settings" description="Manage your profile.">
        <p>Profile details</p>
      </Card>
    );

    const card = screen.getByText("Profile details").closest(".oui-card");
    expect(screen.getByRole("heading", { name: "Account settings" })).toBeInTheDocument();
    expect(screen.getByText("Manage your profile.")).toBeInTheDocument();
    expect(card).toHaveAttribute("aria-labelledby");
    expect(card?.getAttribute("aria-labelledby")).toBe(
      screen.getByRole("heading", { name: "Account settings" }).id
    );
  });

  it("supports header actions and footer content", () => {
    render(
      <Card
        title="Projects"
        headerAction={<button type="button">Add project</button>}
        footer="3 projects"
      >
        Project list
      </Card>
    );

    expect(screen.getByRole("button", { name: "Add project" })).toBeInTheDocument();
    expect(screen.getByText("3 projects")).toBeInTheDocument();
    expect(screen.getByText("Project list")).toBeInTheDocument();
  });

  it("applies padding, variant, custom classes, and forwarded attributes", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card
        ref={ref}
        padding="lg"
        variant="outlined"
        className="custom-card"
        data-testid="settings-card"
      >
        Settings
      </Card>
    );

    const card = screen.getByTestId("settings-card");
    expect(card).toHaveClass("oui-card--lg", "oui-card--outlined", "custom-card");
    expect(ref.current).toBe(card);
  });

  it("can render content without an optional header", () => {
    render(<Card>Simple content</Card>);

    expect(screen.getByText("Simple content")).toBeInTheDocument();
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });
});
