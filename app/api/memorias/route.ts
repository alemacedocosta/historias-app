import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { criarMemoriaSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const espacoId = searchParams.get("espacoId");
  const busca = searchParams.get("busca");
  const ano = searchParams.get("ano");

  if (!espacoId) {
    return NextResponse.json({ error: "espacoId obrigatório" }, { status: 400 });
  }

  const membro = await db.membro.findUnique({
    where: { espacoId_userId: { espacoId, userId: session.user.id } },
  });
  if (!membro) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const memorias = await db.memoria.findMany({
    where: {
      espacoId,
      deletadoEm: null,
      ...(ano ? { anoAcontecimento: parseInt(ano) } : {}),
      ...(busca
        ? {
            OR: [
              { titulo: { contains: busca, mode: "insensitive" } },
              { conteudo: { contains: busca, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      autor: { select: { id: true, name: true, image: true } },
    },
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

  return NextResponse.json(porAno);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = criarMemoriaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const membro = await db.membro.findUnique({
    where: {
      espacoId_userId: { espacoId: body.espacoId, userId: session.user.id },
    },
  });
  if (!membro) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const memoria = await db.memoria.create({
    data: {
      ...parsed.data,
      espacoId: body.espacoId,
      autorId: session.user.id,
    },
    include: { autor: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(memoria, { status: 201 });
}
