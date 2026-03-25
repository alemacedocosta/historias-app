import { auth } from "@/lib/auth";
import { db } from "A/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "not auth" }, { status: 401 });

    const convites = await db.convite.findMany({
      where: { emailRecebedor: session.user.email },
      include: { espaco: true },
    });

    return NextResponse.json(convites);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "not auth" }, { status: 401 });

    const { emailRecebedor, espacoId, expirarEm } = await req.json();

    const convite = await db.convite.create({
      data: {
        codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
        emailRecebedor,
        espacoId,
        criadoPor: session.user.id,
        expiraEm,
    },
  });

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/entrar?convite=${convite.codigo}`;
  return NextResponse.json({ codigo: convite.codigo, link, expiraEm });
}
