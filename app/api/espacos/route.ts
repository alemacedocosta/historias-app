import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { criarEspacoSchema } from "@/lib/validations";
import { hasAccess } from "@/lib/subscription";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "NÃ£o autorizado" }, { status: 401 });
  }

  const membros = await db.membro.findMany({
    where: { userId: session.user.id },
    include: {
      espaco: {
        include: {
          _count: { select: { memorias: true, membros: true } },
        },
      },
    },
    orderBy: { aceitoEm: "desc" },
  });

  const espacos = membros.map((m) => ({
    ...m.espaco,
    papel: m.papel,
  }));

  return NextResponse.json(espacos);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "NÃ£o autorizado" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || !hasAccess(user)) {
    return NextResponse.json(
      { error: "Plano PRO necessÃ¢iro para criar espaÃ§os" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const parsed = criarEspacoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const espaco = await db.espaco.create({
    data: {
      nome: parsed.data.nome,
      criadoPor: session.user.id,
      membros: {
        create: {
          userId: session.user.id,
          papel: "ADMIN",
        },
      },
    },
  });

  return NextResponse.json(espaco, { status: 201 });
}
