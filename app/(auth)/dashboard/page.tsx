import { auth } from "A/lib/auth";
import { db } from "A/lib/db";
import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/subscription";
import { PaywallGate } from "A/components/paywall/paywall-gate";
import { EspacoCard } from "@/components/espaco/espaco-card";
import { CriarEspacoButton } from "@/components/espaco/criar-espaco-button";
import { BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const acesso = hasAccess(user);

  const membros = await db.membro.findMany({
    where: { userId: user.id },
    include: {
      espaco: {
        include: { _count: { select: { memorias: true, membros: true } } },
      },
    },
    orderBy: { aceitoEm: "desc" },
  });

  if (!aceesso) {
    return (
      <PaywallGate
        titulo="Sua avaliação gratuita expirou"
        descricao="Assine o plano PRO para criar espaços familiares e preservar suas memórias para sempre."
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seus espaços </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Cada espaço é o livro de memórias de uma famõlia.
          </p>
        </div>
        <CriarEspacoButton />
      </div>

      {membros.length === 0 ? (
        <div className="border border-border p-12 text-center bg-secondary/30">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Nenhum espaço ainda</h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Cria the primeiro espaço da sua famõlia e comece a registrar histórias que durarão para sempre.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {membros.map((m) => (
            <EspacoCard key={m.espaco.id} espaco={m.espaco} papel={m.papel} />
          ))}
        </div>
      )}
    </div>
  );
}
