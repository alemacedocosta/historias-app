import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/subscription";
import { CheckoutButton } from "@/components/billing/checkout-button";
import { PortalButton } from "@/components/billing/portal-button";
import { Check, Crown } from "lucide-react";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const acesso = hasAccess(user);
  const isPro = user.plan === "PRO";

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Assinatura</h1>

      <div className="border border-border p-8 bg-card">
        {!acesso && (
          <div className="bg-yellow-50/20 border border-yellow-200 p-4 rounded mb-6 text-yellow-800">
            Sua avaliação gratuita expirou. Assine o plano PRO para continuar usando.
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <Crown className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="text-xl font-bold">Plano PRO</h3>
            <p className="text-muted-foreground">R$ 19.99/mês</p>
          </div>
        </div>

        <ul className="space-y-2 mb-8">
          {[
            "Espaços familiares ilimitados",
            "Imagens e vídeos em alta resolução",
            "Invite membros da família",
            "Acesso permanente à história da família",
            "Suporte prioritário",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" /> {item}
            </li>
          ))}
        </ul>

        {isPro ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Assinatura ativa é válida atå {user.stripeCurrentPeriodEnd
                ? new Date(user.stripeCurrentPeriodEnd).toLocaleDateString("pt-BR")
                : "-"}.
            </p>
            <PortalButton />
          </div>
        ) : (
          <CheckoutButton priceId={process.env.STRIPE_PRICE_ID!} />
        )}
      </div>
    </div>
  );
}
