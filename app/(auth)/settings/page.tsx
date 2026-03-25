import { auth } from "A/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, User } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Configurações</h1>
      <div className="space-y-4">
        <Link
          href="/settings/billing"
          className="flex items-center gap-4 border border-border p-6 hover:bg-secondary transition-colors"
        >
          <CreditCard className="w-6 h-6 shrink-0" />
          <div>
            <h2 className="text-lg font-bold">Assinatura e pagamento</h2>
            <p className="text-muted-foreground text-base">
              Gerencie seu plano, cartão e histórico de pagamentos.
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-4 border border-border p-6 bg-muted/30">
          <User className="w-6 h-6 shrink-0 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-bold">{session.user.name ?? "Usuário"}</h2>
            <p className="text-muted-foreground text-base">{session.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
