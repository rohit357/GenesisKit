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
    size: { control: "inline-radio", options: ["sm", "md"] },
    outline: { control: "boolean" },
    dot: { control: "boolean" },
    removable: { control: "boolean" }
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

export const Outline: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge {...args} variant="neutral" outline>
        Neutral
      </Badge>
      <Badge {...args} variant="info" outline>
        Info
      </Badge>
      <Badge {...args} variant="success" outline>
        Success
      </Badge>
      <Badge {...args} variant="warning" outline>
        Warning
      </Badge>
      <Badge {...args} variant="danger" outline>
        Danger
      </Badge>
    </div>
  )
};

export const Dot: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge {...args} variant="success" dot>
        Live
      </Badge>
      <Badge {...args} variant="warning" dot>
        Beta
      </Badge>
      <Badge {...args} variant="danger" dot>
        Offline
      </Badge>
      <Badge {...args} variant="info" dot>
        Syncing
      </Badge>
    </div>
  )
};

export const Removable: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge {...args} variant="neutral" removable removeLabel={`Remove TypeScript`}>
        TypeScript
      </Badge>
      <Badge {...args} variant="info" removable removeLabel={`Remove React`}>
        React
      </Badge>
      <Badge {...args} variant="success" removable removeLabel={`Remove Tested`}>
        Tested
      </Badge>
    </div>
  )
};
