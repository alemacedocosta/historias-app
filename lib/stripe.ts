import Stripe from "stripe";

let _stripe: Stripe | null = null;

const stripeProxy = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set");
      }
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-03-31.basil",
      });
    }
    return (_stripe as any)[prop];
  },
});

export const stripe = stripeProxy;

export async function createCheckoutSession({
  userId,
  email,
  priceId,
}: {
  userId: string;
  email: string;
  priceId: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    // Sem trial_period_days — PRO imediato ao pagar
    subscription_data: {
      metadata: { userId },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=1`,
    metadata: { userId },
  });
  return session;
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  });
  return session;
}
