import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

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

export const Dismissible: Story = {
  args: { dismissible: true }
};

export const WithoutTitle: Story = {
  args: { title: undefined, children: "A compact alert with body text only." }
};
