import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    label: "Accept terms and conditions",
    size: "md"
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Checkbox {...args} size="sm" label="Small" />
      <Checkbox {...args} size="md" label="Medium" />
    </div>
  )
};

export const WithDescription: Story = {
  args: { description: "You can unsubscribe at any time." }
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" }
};

export const WithError: Story = {
  args: { error: "You must accept to continue." }
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true }
};
