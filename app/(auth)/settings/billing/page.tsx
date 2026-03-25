import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { hasAccess, isSubscribed, daysLeftInTrial } from "@/lib/subscription";
import { CheckoutButton } from "@/components/billing/checkout-button";
import { PortalButton } from "@/components/billing/portal-button";
import { Check } from "lucide-react";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const subscribed = isSubscribed(user);
  const trialDays = daysLeftInTrial(user);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Assinatura</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Gerencie seu plano e pagamento.
      </p>

      {/* Status atual */}
      <div className="border border-border p-6 bg-card mb-8">
        <h2 className="text-lg font-bold mb-1">Plano atual</h2>
        <p className="text-base text-muted-foreground">
          {subscribed ? (
            <span className="text-green-700 font-medium">PRO Ã¢â¬â Ativo</span>
          ) : user.plan === "TRIAL" ? (
            <span>AvaliaÃÂ§ÃÂ£o gratuita Ã¢â¬â {trialDays} dias restantes</span>
          ) : (
            <span className="text-destructive font-medium">Plano FREE Ã¢â¬â sem acesso a espaÃÂ§os</span>
          )}
        </p>
        {subscribed && user.stripeCurrentPeriodEnd && (
          <p className="text-sm text-muted-foreground mt-2">
            Renova em{" "}
            {new Date(user.stripeCurrentPeriodEnd).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>

      {subscribed ? (
        <div className="space-y-4">
          <p className="text-base text-muted-foreground">
            VocÃÂª tem acesso completo ao plano PRO. Para cancelar ou alterar sua assinatura, use o portal abaixo.
          </p>
          <PortalButton />
        </div>
      ) : (
        <div className="border border-border p-8">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">R$ 19,90</span>
            <span className="text-muted-foreground text-lg">/mÃÂªs</span>
          </div>
          <p className="text-muted-foreground mb-6">
            ou R$ 179/ano (economia de ~25%)
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "EspaÃÂ§os familiares ilimitados",
              "Membros ilimitados por espaÃÂ§o",
              "MemÃÂ³rias ilimitadas",
              "5 GB de armazenamento de fotos por espaÃÂ§o",
              "ExportaÃÂ§ÃÂ£o em PDF",
              "ModeraÃÂ§ÃÂ£o de membros",
              "Suporte prioritÃÂ¡rio",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-base">
                <Check className="w-5 h-5 text-foreground shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <CheckoutButton />
        </div>
      )}
    </div>
  
 "â