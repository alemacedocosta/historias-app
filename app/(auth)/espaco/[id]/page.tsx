import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemoriaCard } from "@/components/memoria/memoria-card";
import { NovaMemoriaButton } from "@/components/memoria/nova-memoria-button";
import { BuscaMemoria } from "@/components/memoria/busca-memoria";
import { Images, Users } from "lucide-react";

export default async function EspacoPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const membro = await db.membro.findUnique({
    where: { espacoId_userId: { espacoId: params.id, userId: session.user.id } },
  });
  if (!membro) redirect("/dashboard");

  const espaco = await db.espaco.findUnique({
    where: { id: params.id },
    include: { _count: { select: { memorias: true, membros: true } } },
  });
  if (!espaco) redirect("/dashboard");

  const query = searchParams.q?.trim() || "";

  const memorias = await db.memoria.findMany({
    where: {
      espacoId: params.id,
      ...(query
        ? {
            OR: [
              { titulo: { contains: query, mode: "insensitive" } },
              { descricao: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{espaco.nome}</h1>
          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Images className="w-4 h-4" /> {espaco._count.memorias} memórias
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {espaco._count.membros} membros
            </span>
          </div>
        </div>
        <NovaMemoriaButton espacoId={params.id} papel={membro.papel} />
      </div>

      <BuscaMemoria espacoId={params.id} />

      {memorias.length === 0 ? (
        <div className="border border-border p-12 text-center bg-secondary/30">
          <Images className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">{query ? "Nenhuma memó ria encontrada" : "Nenhuma memó ria ainda"}</h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            {query
              ? `Tente outros termos de busca.`
              : `Comece registrando a primeira memória deste espaço.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memorias.map((m) => (
            <MemoriaCard key={m.id} memoria={m} papel={membro.papel} />
          ))}
        </div>
      )}
    </div>
  );
}
