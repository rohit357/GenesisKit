import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    resize: { control: "inline-radio", options: ["none", "vertical", "horizontal", "both"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    label: "Message",
    placeholder: "Write your message…",
    size: "md",
    rows: 4
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
  )
};

export const WithDescription: Story = {
  args: { description: "Markdown is supported." }
};

export const WithError: Story = {
  args: { error: "Message cannot be empty." }
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Read-only content." }
};
