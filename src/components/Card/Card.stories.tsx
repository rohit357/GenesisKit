import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Button } from "../Button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["elevated", "outlined", "soft"] },
    padding: { control: "inline-radio", options: ["sm", "md", "lg"] },
    as: { control: "inline-radio", options: ["div", "section", "article"] },
    headingLevel: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
    interactive: { control: "boolean" }
  },
  args: {
    title: "Account settings",
    description: "Manage your profile and preferences.",
    variant: "elevated",
    padding: "md",
    interactive: false,
    children: "Card body content goes here."
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
      <Card {...args} variant="elevated" title="Elevated" />
      <Card {...args} variant="outlined" title="Outlined" />
      <Card {...args} variant="soft" title="Soft" />
    </div>
  )
};

export const Padding: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
      <Card {...args} variant="outlined" padding="sm" title="Small padding" />
      <Card {...args} variant="outlined" padding="md" title="Medium padding" />
      <Card {...args} variant="outlined" padding="lg" title="Large padding" />
    </div>
  )
};

export const WithHeaderActionAndFooter: Story = {
  args: {
    title: "Projects",
    description: "3 active",
    headerAction: (
      <Button size="sm" variant="secondary">
        Add
      </Button>
    ),
    footer: "Updated 2 minutes ago"
  }
};

export const Interactive: Story = {
  args: {
    interactive: true,
    title: "Project Aurora",
    description: "Last activity 2 hours ago",
    children:
      "Wrap this card in a Link or button in your own code to make it actionable. The interactive prop is purely visual."
  }
};

export const AsLandmarkSection: Story = {
  args: {
    as: "section",
    title: "Labelled region",
    description: "Rendered as <section>, labelled by its title for assistive tech."
  }
};

export const ContentOnly: Story = {
  args: { title: undefined, description: undefined, children: "A card with no header." }
};
