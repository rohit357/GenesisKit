import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces loading state", () => {
    render(<Spinner label="Loading projects" />);
    expect(screen.getByRole("status", { name: "Loading projects" })).toBeInTheDocument();
  });

  it("supports sizes and attributes", () => {
    render(<Spinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("gk-spinner--lg");
  });
});
