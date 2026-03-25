import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createCustomerPortalSession } from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "Sem assinatura ativa" }, { status: 400 });
  }

  const portalSession = await createCustomerPortalSession(user.stripeCustomerId);
  return NextResponse.json({ url: portalSession.url });
}
