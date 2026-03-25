import type { Meta, StoryObj } from "@storybook/react";
import { tokens } from "../../design-system/tokens";

const ColorGrid = () => (
  <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
      Design Tokens — Cores
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
      {Object.entries(tokens.colors).map(([key, value]) => (
        <div key={key} style={{ border: "1px solid #E0D9D0" }}>
          <div
            style={{
              height: "80px",
              backgroundColor: `hsl(${value})`,
              border: "1px solid #E0D9D0",
            }}
          />
          <div style={{ padding: "12px" }}>
            <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>{key}</p>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0" }}>hsl({value})</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: "Design Tokens/Colors",
  component: ColorGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};
