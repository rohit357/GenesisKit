import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("uses status semantics for non-error messages", () => {
    render(<Alert title="Saved">Your changes are live.</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });

  it("uses alert semantics for errors", () => {
    render(<Alert status="error">Something went wrong.</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong.");
  });

  it("supports dismissing", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Notice</Alert>);
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});

