import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dialog } from "./Dialog";
import { Button } from "../Button";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    closeOnOverlayClick: { control: "boolean" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] }
  },
  args: {
    title: "Delete project",
    description: "This action cannot be undone.",
    closeOnOverlayClick: true,
    size: "md",
    // Overridden by each story's stateful render; present to satisfy the
    // required controlled-dialog props on the meta type.
    open: false,
    onClose: () => {}
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dialog is controlled via `open`/`onClose`; drive it from local state so the
// story is interactive and the focus trap + scroll lock can be exercised.
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          Deleting this project removes all of its data permanently.
        </Dialog>
      </>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | null>(null);
    const close = () => setOpenSize(null);
    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button variant="secondary" onClick={() => setOpenSize("sm")}>
          Small (24rem)
        </Button>
        <Button variant="secondary" onClick={() => setOpenSize("md")}>
          Medium (32rem)
        </Button>
        <Button variant="secondary" onClick={() => setOpenSize("lg")}>
          Large (42rem)
        </Button>
        <Dialog
          {...args}
          open={openSize !== null}
          size={openSize ?? "md"}
          onClose={close}
          footer={
            <Button variant="ghost" onClick={close}>
              Close
            </Button>
          }
        >
          A {openSize ?? "md"}-sized dialog. Resize the page to see the max-width cap.
        </Dialog>
      </div>
    );
  }
};

export const WithoutFooter: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)} title="Notification">
          A simple dialog with a title, body, and close button only.
        </Dialog>
      </>
    );
  }
};
