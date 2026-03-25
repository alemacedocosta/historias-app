import type { Preview } from "@storybook/react";
import "../app/globals.css";
import { tokens } from "../design-system/tokens";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#FFFFFF" },
        { name: "warm beige", value: "#F2EDE6" },
        { name: "dark", value: "#111111" },
      ],
    },
    layout: "centered",
  },
};

export default preview;
