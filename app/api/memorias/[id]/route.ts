import { NextRequest, NextResponse } from "next/server";
import { auth } from "A/lib/auth";
import { db } from "A/lib/db";
import { atualizarMemoriaSchema } from "A/lib/validations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const memoria = await db.memoria.findUnique({ where: { id: params.id } });
  if (!memoria || memoria.deletadoEm) {
    return NextResponse.json({ error: "Memória não encontrada" }, { status: 404 });
  }
  if (memoria.autorId !== session.user.id) {
    return NextResponse.json({ error: "Apenas o autor pode editar" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = atualizarMemoriaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.memoria.update({
    where: { id: params.id },
    data: parsed.data,
    include: { autor: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const memoria = await db.memoria.findUnique({
    where: { id: params.id },
    include: { espaco: { include: { membros: true } } },
  });

  if (!memoria) {
    return NextResponse.json({ error: "Memória não encontrada" }, { status: 404 });
  }

  const isAutor = memoria.autorId === session.user.id;
  const isAdmin = memoria.espaco.membros.some(
    (m) => m.userId === session.user.id && m.papel === "ADMIN"
  );

  if (!isAutor && !isAdmin) {
    return NextResponse.json({ error: "Sem permissão para excluir" }, { status: 403 });
  }

  await db.memoria.update({
    where: { id: params.id },
    data: { deletadoEm: new Date() },
  });

  return NextResponse.json({ success: true });
}
