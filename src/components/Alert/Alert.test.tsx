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
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Notice
      </Alert>
    );
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("renders an icon slot as decorative", () => {
    render(
      <Alert icon={<span data-testid="icon">!</span>} status="warning" title="Heads up">
        Watch out.
      </Alert>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    // icon wrapper is hidden from assistive tech so the alert label stays clean.
    const wrapper = screen.getByTestId("icon").parentElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("renders actions slot with interactive elements", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <Alert actions={<button onClick={onAction}>Undo</button>} title="Deleted">
        Item removed.
      </Alert>
    );
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("places actions before the dismiss button", () => {
    render(
      <Alert actions={<button>Action</button>} dismissible onDismiss={vi.fn()} title="T">
        Body
      </Alert>
    );
    const action = screen.getByRole("button", { name: "Action" });
    const dismiss = screen.getByRole("button", { name: "Dismiss alert" });
    // Both live inside the same trail container; action renders before the dismiss button.
    const trail = dismiss.parentElement;
    expect(trail).toContainElement(action);
    expect(action.compareDocumentPosition(dismiss) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
