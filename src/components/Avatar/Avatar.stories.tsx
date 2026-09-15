import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    shape: { control: "inline-radio", options: ["circle", "square"] },
    status: {
      control: "inline-radio",
      options: ["none", "online", "offline", "busy", "away"]
    }
  },
  args: {
    name: "Ada Lovelace",
    size: "md",
    shape: "circle",
    status: "none"
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InitialsFallback: Story = {
  args: { name: "Grace Hopper" }
};

export const WithImage: Story = {
  args: {
    name: "Ada Lovelace",
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Ada Lovelace"
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  )
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="square" />
    </div>
  )
};

export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar {...args} status="online" />
      <Avatar {...args} status="busy" />
      <Avatar {...args} status="away" />
      <Avatar {...args} status="offline" />
      <Avatar {...args} status="none" />
    </div>
  )
};
