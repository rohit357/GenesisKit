import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";
import { Button } from "../Button";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    status: { control: "inline-radio", options: ["info", "success", "warning", "error"] },
    dismissible: { control: "boolean" }
  },
  args: {
    title: "Heads up",
    children: "This is an informational alert message.",
    status: "info"
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    status: "error",
    dismissible: false,
    dismissLabel: "ggr"
  }
};

export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "32rem" }}>
      <Alert {...args} status="info" title="Info">
        Informational message.
      </Alert>
      <Alert {...args} status="success" title="Success">
        Your changes were saved.
      </Alert>
      <Alert {...args} status="warning" title="Warning">
        Your session expires soon.
      </Alert>
      <Alert {...args} status="error" title="Error">
        Something went wrong.
      </Alert>
    </div>
  )
};

export const WithIcon: Story = {
  args: {
    status: "success",
    title: "Saved",
    icon: <span aria-hidden>✓</span>,
    children: "Your changes are live."
  }
};

export const WithActions: Story = {
  args: {
    status: "info",
    title: "Update available",
    children: "Version 2.1 is ready to install.",
    actions: (
      <>
        <Button size="sm" variant="ghost">
          Later
        </Button>
        <Button size="sm" variant="secondary">
          Install
        </Button>
      </>
    )
  }
};

export const WithIconAndActionsAndDismiss: Story = {
  args: {
    status: "warning",
    title: "Item deleted",
    icon: <span aria-hidden>!</span>,
    children: "The project has been moved to trash.",
    actions: (
      <Button size="sm" variant="ghost">
        Undo
      </Button>
    ),
    dismissible: true,
    onDismiss: () => {}
  }
};

export const Dismissible: Story = {
  args: { dismissible: true }
};

export const WithoutTitle: Story = {
  args: { title: undefined, children: "A compact alert with body text only." }
};
