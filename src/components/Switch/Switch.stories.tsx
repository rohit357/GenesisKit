import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" }
  },
  args: {
    label: "Enable notifications",
    size: "md"
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Switch {...args} size="sm" label="Small" />
      <Switch {...args} size="md" label="Medium" />
    </div>
  )
};

export const WithDescription: Story = {
  args: { description: "Receive email and push notifications." }
};

export const Checked: Story = {
  args: { defaultChecked: true }
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true }
};
