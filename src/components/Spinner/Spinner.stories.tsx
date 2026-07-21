import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] }
  },
  args: {
    size: "md",
    label: "Loading"
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  )
};

export const CustomLabel: Story = {
  args: { label: "Fetching results" }
};
