import type { Preview } from "@storybook/react";

import "../src/styles.css";

const THEMES = [
  { value: "gk-theme-genesis", title: "Genesis" },
  { value: "gk-theme-midnight", title: "Midnight" },
  { value: "gk-theme-emerald", title: "Emerald" },
  { value: "gk-theme-rose", title: "Rose" }
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i }
    },
    a11y: { test: "todo" }
  },
  globalTypes: {
    theme: {
      description: "GenesisKit theme",
      defaultValue: "gk-theme-genesis",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES,
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "gk-theme-genesis";
      // Scope the chosen theme class onto a wrapper so every story inherits
      // the right token set. Padding + canvas bg makes dark themes legible.
      return (
        <div
          className={theme}
          style={{
            background: "var(--gk-color-canvas)",
            color: "var(--gk-color-text)",
            padding: "2rem",
            minHeight: "100vh"
          }}
        >
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
