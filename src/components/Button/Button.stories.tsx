import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "outline", "soft", "danger", "link", "gradient"]
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" }
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md"
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
      <Button {...args} variant="gradient">
        Gradient
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
};

export const IconComposition: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
      <Button {...args}>
        <span aria-hidden>+</span> Create project
      </Button>
      <Button {...args} variant="soft">
        <span aria-hidden>↓</span> Download
      </Button>
      <Button {...args} variant="outline">
        Learn more <span aria-hidden>→</span>
      </Button>
      <Button {...args} variant="ghost">
        <span aria-hidden>★</span> Star
      </Button>
    </div>
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}>
      <Button {...args} variant="primary" fullWidth>
        Save changes
      </Button>
      <Button {...args} variant="outline" fullWidth>
        Cancel
      </Button>
      <Button {...args} variant="gradient" fullWidth>
        Start free trial
      </Button>
    </div>
  )
};

export const Loading: Story = {
  args: { loading: true }
};

export const LoadingWithVariant: Story = {
  args: { loading: true, variant: "gradient", children: "Publishing" }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Hierarchy: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  )
};
