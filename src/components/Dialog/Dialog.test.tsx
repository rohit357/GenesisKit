import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
});
