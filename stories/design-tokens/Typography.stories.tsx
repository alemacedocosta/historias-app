import type { Meta, StoryObj } from "@storybook/react";
import { tokens } from "../../design-system/tokens";

const TypographyScale = () => (
  <div style={{ padding: "24px", fontFamily: "Arial, sans-serif", maxWidth: "600px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
      Design Tokens — Tipografia
    </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {Object.entries(tokens.typography).map(([key, value]) => (
        <div key={key} style={{ borderBottom: "1px solid #E0D9D0", paddingBottom: "16px" }}>
          <p style={{ fontSize: "12px", color: "#888", margin: "0 0 8px" }}>
            {key}: {value}
          </p>
          {key.startsWith("fontSize") && (
            <p style={{ fontSize: value as string, margin: 0, lineHeight: 1.4 }}>
              O livro vivo da sua família.
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: "Design Tokens/Typography",
  component: TypographyScale,
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypography: Story = {};
