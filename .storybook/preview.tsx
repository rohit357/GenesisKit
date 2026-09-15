import type { Preview } from "@storybook/react";

import "../src/styles.css";

const THEMES = [
  { value: "gk-theme-genesis", title: "Genesis" },
  { value: "gk-theme-midnight", title: "Midnight" },
  { value: "gk-theme-emerald", title: "Emerald" },
  { value: "gk-theme-rose", title: "Rose" }
];

const DENSITIES = [
  { value: "comfortable", title: "Comfortable" },
  { value: "compact", title: "Compact" }
];

const PERSONALITIES = [
  { value: "none", title: "None" },
  { value: "gk-personality-soft", title: "Soft" },
  { value: "gk-personality-sharp", title: "Sharp" },
  { value: "gk-personality-glass", title: "Glass" }
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
    },
    density: {
      description: "Density mode",
      defaultValue: "comfortable",
      toolbar: {
        title: "Density",
        icon: "compress",
        items: DENSITIES,
        dynamicTitle: true
      }
    },
    personality: {
      description: "Personality preset",
      defaultValue: "none",
      toolbar: {
        title: "Personality",
        icon: "star",
        items: PERSONALITIES,
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "gk-theme-genesis";
      const density = context.globals.density ?? "comfortable";
      const personality = context.globals.personality ?? "none";
      const personalityClass = personality === "none" ? "" : personality;
      const className = [theme, personalityClass].filter(Boolean).join(" ");
      return (
        <div
          className={className}
          data-density={density}
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
