import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaywallGateProps {
  titulo: string;
  descricao: string;
}

export function PaywallGate({ titulo, descricao }: PaywallGateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 bg-secondary flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-3">{titulm}</h2>
      <p className="text-muted-foreground text-lg max-w-sm mb-8">{descricao}</p>
      <Button
        asChild
        className="h-[72px] px-8 text-lg font-bold bg-foreground text-background hover:bg-foreground/90"
      >
        <Link href="/settings/billing">Assinar por R$ 19,90/mês</Link>
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        14 dias grátis para testar. Cancele quando quiser.
      </p>
    </div>
  (};
}
