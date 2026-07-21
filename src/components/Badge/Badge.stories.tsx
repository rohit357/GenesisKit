import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["neutral", "info", "success", "warning", "danger"]
    },
    size: { control: "inline-radio", options: ["sm", "md"] }
  },
  args: {
    children: "Badge",
    variant: "neutral",
    size: "md"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge {...args} variant="neutral">
        Neutral
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
    </div>
  )
};
