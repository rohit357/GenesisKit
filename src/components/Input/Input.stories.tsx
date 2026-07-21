import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
    size: "md"
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "20rem" }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  )
};

export const WithDescription: Story = {
  args: { description: "We'll never share your email." }
};

export const WithError: Story = {
  args: { error: "Enter a valid email address.", defaultValue: "not-an-email" }
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "locked@example.com" }
};

export const FullWidth: Story = {
  args: { fullWidth: true }
};
