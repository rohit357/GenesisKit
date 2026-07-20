import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders accessible title, description, content, and footer", () => {
    render(
      <Dialog
        open
        title="Delete project"
        description="This cannot be undone."
        footer="Actions"
        onClose={vi.fn()}
      >
        Confirm deletion
      </Dialog>
    );
    expect(screen.getByRole("dialog", { name: "Delete project" })).toHaveTextContent(
      "Confirm deletion"
    );
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("This cannot be undone.");
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("closes from the close button and Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open title="Menu" onClose={onClose}>
        Content
      </Dialog>
    );
    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledOnce();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("does not render when closed", () => {
    render(
      <Dialog open={false} title="Hidden" onClose={vi.fn()}>
        Content
      </Dialog>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("locks body scroll while open and restores on close", () => {
    const { rerender } = render(
      <Dialog open title="Locked" onClose={vi.fn()}>
        Content
      </Dialog>
    );
    expect(document.body.style.overflow).toBe("hidden");
    rerender(
      <Dialog open={false} title="Locked" onClose={vi.fn()}>
        Content
      </Dialog>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("moves focus into the dialog and returns it to the trigger on close", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Dialog open={open} title="Trap" onClose={() => setOpen(false)}>
            Content
          </Dialog>
        </>
      );
    }
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open" });
    trigger.focus();
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);
    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(trigger).toHaveFocus();
  });
});
