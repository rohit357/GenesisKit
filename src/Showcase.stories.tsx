import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Badge } from "./components/Badge/Badge";
import { Input } from "./components/Input/Input";
import { Alert } from "./components/Alert/Alert";
import { Avatar } from "./components/Avatar/Avatar";

const meta = {
  title: "Showcase/Customization",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Demonstrates that every component participates in the customization
 * system. Use the toolbar (Theme / Density / Personality) to swap the
 * visual environment around the same primitives.
 */
export const Customization: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--gk-space-8)", maxWidth: "48rem" }}>
      <header style={{ display: "grid", gap: "var(--gk-space-3)" }}>
        <h1
          style={{
            color: "var(--gk-color-heading)",
            fontSize: "var(--gk-font-size-3xl)",
            fontWeight: "var(--gk-font-weight-bold)",
            lineHeight: "var(--gk-leading-snug)",
            margin: 0
          }}
        >
          Customization at a glance
        </h1>
        <p
          style={{
            color: "var(--gk-color-muted)",
            fontSize: "var(--gk-font-size-md)",
            lineHeight: "var(--gk-leading-normal)",
            margin: 0
          }}
        >
          Every component below consumes the same design tokens. Switch the Theme, Density, and
          Personality in the toolbar to see the entire library respond.
        </p>
      </header>

      <Card title="Buttons" description="Eight variants, three sizes, full-width, loading.">
        <div style={{ display: "flex", gap: "var(--gk-space-4)", flexWrap: "wrap" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="gradient">Gradient</Button>
        </div>
      </Card>

      <Card title="Form fields" description="Spacing, typography, focus ring follow tokens.">
        <div style={{ display: "grid", gap: "var(--gk-space-5)" }}>
          <Input label="Project name" placeholder="Acme redesign" />
        </div>
      </Card>

      <Card title="Feedback" description="Status, surface depth, motion respond together.">
        <div style={{ display: "grid", gap: "var(--gk-space-5)" }}>
          <Alert status="info" title="Heads up">
            Density and personality flow through every component without code changes.
          </Alert>
          <div style={{ display: "flex", gap: "var(--gk-space-3)", flexWrap: "wrap" }}>
            <Badge variant="success">Live</Badge>
            <Badge variant="warning" dot>
              Beta
            </Badge>
            <Badge variant="info" outline>
              Review
            </Badge>
          </div>
        </div>
      </Card>

      <Card title="Identity" description="Avatars, badges, semantic colors.">
        <div style={{ display: "flex", gap: "var(--gk-space-5)", alignItems: "center" }}>
          <Avatar name="Ada Lovelace" status="online" size="lg" />
          <Avatar name="Grace Hopper" status="busy" size="lg" />
          <Avatar name="Linus T" status="away" size="lg" />
        </div>
      </Card>
    </div>
  )
};
