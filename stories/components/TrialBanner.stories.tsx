import type { Meta, StoryObj } from "@storybook/react";
import { TrialBanner } from "../../components/paywall/trial-banner";

const meta = {
  title: "Components/TrialBanner",
  component: TrialBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TrialBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ManyDaysLeft: Story = {
  args: { daysLeft: 12 },
};

export const LastDay: Story = {
  args: { daysLeft: 1 },
};

export const TwoDaysLeft: Story = {
  args: { daysLeft: 2 },
};
