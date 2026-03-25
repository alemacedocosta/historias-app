import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const checkoutSession = await createCheckoutSession({
    userId: session.user.id,
    email: session.user.email,
    priceId: process.env.STRIPE_PRICE_ID_PRO!,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
