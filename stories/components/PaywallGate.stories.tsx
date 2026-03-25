import type { Meta, StoryObj } from "@storybook/react";
import { PaywallGate } from "../../components/paywall/paywall-gate";

const meta = {
  title: "Components/PaywallGate",
  component: PaywallGate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaywallGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TrialExpired: Story = {
  args: {
    titulo: "Sua avaliação gratuita expirou",
    descricao:
      "Assine o plano PRO para criar espaços familiares e preservar suas memórias para sempre.",
  },
};

export const UpgradeRequired: Story = {
  args: {
    titulo: "Funcionalidade exclusiva PRO",
    descricao: "Faça upgrade para exportar a timeline da sua família em PDF.",
  },
};
