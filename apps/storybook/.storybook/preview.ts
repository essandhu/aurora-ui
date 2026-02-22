import type { Preview } from "@storybook/react";
import { AuroraProvider } from "@aurora-ui/react";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        AuroraProvider,
        { mode: "dark", accent: "cyan" },
        React.createElement(Story)
      ),
  ],
  parameters: {
    backgrounds: {
      default: "aurora-dark",
      values: [
        { name: "aurora-dark", value: "hsl(260, 20%, 8%)" },
        { name: "aurora-light", value: "hsl(260, 15%, 97%)" },
      ],
    },
  },
};

export default preview;
