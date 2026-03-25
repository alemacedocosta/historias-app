import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { Timeline } from "@/components/timeline/timeline";
import { NovaMemoriaButton } from "@/components/memoria/nova-memoria-button";
import { BuscaMemoria } from "@/components/memoria/busca-memoria";

export default async function EspacoPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const membro = await db.membro.findUnique({
    where: { espacoId_userId: { espacoId: params.id, userId: session.user.id } },
    include: { espaco: true },
  });

  if (!membro) notFound();

  const memorias = await db.memoria.findMany({
    where: { espacoId: params.id, deletadoEm: null },
    include: { autor: { select: { id: true, name: true, image: true } } },
    orderBy: [{ anoAcontecimento: "desc" }, { criadoEm: "desc" }],
  });

  // Agrupar por ano
  const porAno = memorias.reduce(
    (acc, memoria) => {
      const ano = memoria.anoAcontecimento;
      if (!acc[ano]) acc[ano] = [];
      acc[ano].push(memoria);
      return acc;
    },
    {} as Record<number, typeof memorias>
  );

  const anos = Object.keys(porAno)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      {/* Header fixo */}
      <div className="sticky top-0 z-10 bg-background border-b border-border py-4 mb-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold truncate">{membro.espaco.nome}</h1>
            <p className="text-muted-foreground text-sm">
              {memorias.length} {memorias.length === 1 ? "memÃÂ³ria" : "memÃÂ³rias"}
            </p>
          </div>
          <div className="flex gap-2">
            <BuscaMemoria espacoId={params.id} />
            <NovaMemoriaButton espacoId={params.id} />
          </div>
        </div>
      </div>

      {/* Timeline */}
      {anos.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-xl font-medium mb-2">Nenhuma memÃÂ³ria ainda</p>
          <p className="text-base">
            Seja o primeiro a registrar uma histÃÂ³ria neste espaÃÂ§o.
          </p>
        </div>
      ) : (
        <Timeline anos={anos} memoriasPorAno={porAno} userId={session.user.id} />
      )}
    </div>
  
 "â