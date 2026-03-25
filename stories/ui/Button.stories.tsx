import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Salvar memória", variant: "default" },
};

export const Outline: Story = {
  args: { children: "Cancelar", variant: "outline" },
};

export const Destructive: Story = {
  args: { children: "Excluir memória", variant: "destructive" },
};

export const Large: Story = {
  args: { children: "Começar gratuitamente", size: "lg", variant: "default" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "24px" }}>
      <Button variant="default">Padrão</Button>
      <Button variant="outline">Contorno</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="destructive">Destruir</Button>
      <Button size="lg">Grande</Button>
      <Button size="sm">Pequeno</Button>
      <Button disabled>Desabilitado</Button>
    </div>
  ),
};
