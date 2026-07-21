import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: "Overview panel content." },
  { value: "activity", label: "Activity", content: "Activity panel content." },
  { value: "settings", label: "Settings", content: "Settings panel content." },
  { value: "archived", label: "Archived", content: "Hidden", disabled: true }
];

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    activationMode: { control: "inline-radio", options: ["automatic", "manual"] },
    keepMounted: { control: "boolean" }
  },
  args: {
    items,
    orientation: "horizontal",
    activationMode: "automatic"
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" }
};

export const ManualActivation: Story = {
  args: { activationMode: "manual" }
};

export const KeepMounted: Story = {
  args: { keepMounted: true }
};
