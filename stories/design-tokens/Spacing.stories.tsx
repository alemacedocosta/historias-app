import type { Meta, StoryObj } from "@storybook/react";
import { tokens } from "../../design-system/tokens";

const SpacingScale = () => (
  <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
      Design Tokens — Espaçamento
    </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {Object.entries(tokens.spacing).map(([key, value]) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: value as string,
              height: "24px",
              backgroundColor: "#111111",
              minWidth: "4px",
            }}
          />
          <span style={{ fontSize: "14px", color: "#444" }}>
            {key}: {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: "Design Tokens/Spacing",
  component: SpacingScale,
  tags: ["autodocs"],
} satisfies Meta<typeof SpacingScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {};
