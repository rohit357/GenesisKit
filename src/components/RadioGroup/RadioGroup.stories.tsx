import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "./RadioGroup";

const plans = [
  { value: "starter", label: "Starter", description: "For individuals." },
  { value: "team", label: "Team", description: "For small teams." },
  { value: "enterprise", label: "Enterprise", description: "For organizations." }
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
    required: { control: "boolean" }
  },
  args: {
    label: "Plan",
    options: plans,
    defaultValue: "starter",
    orientation: "vertical"
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" }
};

export const WithDescription: Story = {
  args: { description: "Choose the plan that fits your team." }
};

export const Required: Story = {
  args: { required: true, defaultValue: undefined }
};

export const WithError: Story = {
  args: { error: "Please select a plan.", defaultValue: undefined }
};

export const DisabledOption: Story = {
  args: {
    options: [...plans, { value: "legacy", label: "Legacy", disabled: true }]
  }
};
