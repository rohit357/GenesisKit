import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    label: "Country",
    placeholder: "Choose a country",
    size: "md"
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="in">India</option>
    <option value="us">United States</option>
    <option value="gb">United Kingdom</option>
  </>
);

export const Playground: Story = { render: (args) => <Select {...args}>{options}</Select> };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "20rem" }}>
      <Select {...args} size="sm" label="Small">
        {options}
      </Select>
      <Select {...args} size="md" label="Medium">
        {options}
      </Select>
      <Select {...args} size="lg" label="Large">
        {options}
      </Select>
    </div>
  )
};

export const WithDescription: Story = {
  args: { description: "Used for billing and tax." },
  render: (args) => <Select {...args}>{options}</Select>
};

export const WithError: Story = {
  args: { error: "Please select a country." },
  render: (args) => <Select {...args}>{options}</Select>
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Select {...args}>{options}</Select>
};
