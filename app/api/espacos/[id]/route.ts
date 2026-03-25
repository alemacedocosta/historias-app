import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function getMembro(espacoId: string, userId: string) {
  return db.membro.findUnique({
    where: { espacoId_userId: { espacoId, userId } },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const membro = await getMembro(params.id, session.user.id);
  if (!membro) {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const espaco = await db.espaco.findUnique({
    where: { id: params.id },
    include: {
      _count: { select: { memorias: true, membros: true } },
      membros: {
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
      },
    },
  });

  if (!espaco) {
    return NextResponse.json({ error: "Espaço não encontrado" }, { status: 404 });
  }

  return NextResponse.json(espaco);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const membro = await getMembro(params.id, session.user.id);
  if (!membro || membro.papel !== "ADMIN") {
    return NextResponse.json({ error: "Apenas admins podem excluir espaços" }, { status: 403 });
  }

  await db.espaco.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
